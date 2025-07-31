import React from "react";
import { ulid } from "ulid";

import { EventBus } from "../../utils/event-bus";

type ModalEventOpen = {
  action: "modal_open";
  data: {
    id: string;
    component: React.FC<any>;
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
};

class ModalService {
  public eventBus = new EventBus<
    ModalEventOpen | ModalEventClose | ModalEventUpdate
  >();
  private modalStack: Map<string, { resolve: (result: any) => void }> =
    new Map();

  async open<T>(
    ModalComponent: React.FC<T>,
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

  updateProps(id: string, props: any): void {
    this.eventBus.emit({
      action: "modal_update",
      data: { id, props },
    });
  }
}

export const modalService = new ModalService();
