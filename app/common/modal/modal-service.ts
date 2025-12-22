"use client";

import { ComponentType, ReactNode, useEffect, useRef, useState } from "react";
import { ulid } from "ulid";

import { EventBus } from "../../utils/event-bus";
import { useModal } from "./use-modal";

type ModalEventOpen = {
  action: "modal_open";
  data: {
    id: string;
    component: ComponentType<any>;
    props: any;
    opts: ModalOpts;
    resolve: (result: any) => void;
    updateProps: (newProps: any) => void;
  };
};

type ModalEventClose = {
  action: "modal_close";
  data: {
    id: string;
  };
};

type ModalEventUpdate = {
  action: "modal_update";
  data: {
    id: string;
    props: any;
  };
};

export type ModalOpts = {
  id?: string;
  size?: "sm" | "md" | "lg";
  expandHeight?: boolean;
  position?: "center" | "top";
  disableBackdropClick?: boolean;
  modalType?: "modal" | "drawer";
};

class ModalService {
  public eventBus = new EventBus<
    ModalEventOpen | ModalEventClose | ModalEventUpdate
  >();
  private modalStack: Map<string, { resolve: (result: any) => void }> =
    new Map();

  async setup<T>(ModalComponent: ComponentType<T>, options: ModalOpts = {}) {
    return (props?: T) => this.open(ModalComponent, props, options);
  }

  async open<T>(
    ModalComponent: ComponentType<T>,
    props?: T,
    options: ModalOpts = {},
  ): Promise<any> {
    const { id = ulid(), ...opts } = options;
    return new Promise((resolve) => {
      this.modalStack.set(id, { resolve });
      const updateProps = (newProps: Partial<T>) => {
        this.eventBus.emit({
          action: "modal_update",
          data: { id, props: newProps },
        });
      };

      this.eventBus.emit({
        action: "modal_open",
        data: {
          id,
          component: ModalComponent,
          opts,
          props,
          resolve,
          updateProps,
        },
      });
    });
  }

  close(id: string, result: unknown = null): void {
    const modal = this.modalStack.get(id);
    if (modal) {
      modal.resolve(result);
      this.modalStack.delete(id);
    }

    this.eventBus.emit({
      action: "modal_close",
      data: { id },
    });
  }

  create<T>(Component: ComponentType<T>, opts: ModalOpts = {}) {
    const id = opts.id ?? ulid();
    return {
      id,
      hook: () => useModal(Component, opts),
      open: (props?: T) => this.open(Component, props, opts),
      update: (props?: T) => this.updateProps(id, props),
      close: (result?: any) => this.close(id, result),
    };
  }

  updateProps(id: string, props: any): void {
    this.eventBus.emit({
      action: "modal_update",
      data: { id, props },
    });
  }
}

export const modalService = new ModalService();

export function Modal(
  props: {
    show: boolean;
    onClose: () => void;
    children?: ReactNode;
  } & Omit<ModalOpts, "id">,
) {
  const { show, children, onClose, ...modalOpts } = props;
  const modalIdRef = useRef(ulid());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modal = useModal(() => children, {
    ...modalOpts,
    id: modalIdRef.current,
  });

  useEffect(() => {
    if (show && !isModalOpen) {
      modal(props).then(() => {
        onClose?.();
        setIsModalOpen(false);
      });
      setIsModalOpen(true);
    }
    if (!show && isModalOpen) {
      modalService.close(modalIdRef.current);
      setIsModalOpen(false);
    }
  }, [
    show,
    props.size,
    props.expandHeight,
    props.position,
    props.disableBackdropClick,
  ]);

  return null;
}
