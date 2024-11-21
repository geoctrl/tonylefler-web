import React from "react";
import { ulid } from "ulid";

import { EventBus } from "../../tools/event-bus";

type DialogEventOpen = {
  action: "dialog_open";
  data: {
    id: string;
    component: React.FC<any>;
    props: any;
    resolve: (result: any) => void;
    updateProps: (newProps: any) => void;
  };
};

type DialogEventClose = {
  action: "dialog_close";
  data: {
    id: string;
  };
};

type DialogEventUpdate = {
  action: "dialog_update";
  data: {
    id: string;
    props: any;
  };
};

class DialogService {
  public eventBus = new EventBus<
    DialogEventOpen | DialogEventClose | DialogEventUpdate
  >("dialog");
  private dialogStack: Map<string, { resolve: (result: any) => void }> =
    new Map();

  async render<T>(
    DialogComponent: React.FC<T>,
    props?: T,
    options: { id?: string } = {},
  ): Promise<any> {
    const id = options.id || ulid();

    return new Promise((resolve) => {
      this.dialogStack.set(id, { resolve });
      const updateProps = (newProps: Partial<T>) => {
        this.eventBus.emit({
          action: "dialog_update",
          data: { id, props: newProps },
        });
      };

      this.eventBus.emit({
        action: "dialog_open",
        data: {
          id,
          component: DialogComponent,
          props,
          resolve,
          updateProps,
        },
      });
    });
  }

  close(id: string, result: any = null): void {
    const dialog = this.dialogStack.get(id);
    if (dialog) {
      dialog.resolve(result);
      this.dialogStack.delete(id);
    }

    this.eventBus.emit({
      action: "dialog_close",
      data: { id },
    });
  }

  updateProps(id: string, props: any): void {
    this.eventBus.emit({
      action: "dialog_update",
      data: { id, props },
    });
  }
}

export const dialogService = new DialogService();
