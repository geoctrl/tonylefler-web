import { FC, ReactNode } from "react";

import { ModalOpts } from "../common/modal/modal";
import { DrawerOpts } from "../common/drawer";

/** TYPES **/
export type OverlayOpts = {
  allowBackdropClose?: boolean;
};

export type OverlayActiveGeneric = {
  id: string;
  component: FC<any>;
  props?: Record<string, any>;
  resolve: (value?: unknown) => void;
};

export type OverlayActiveModal = OverlayActiveGeneric & {
  type: "modal";
  opts: ModalOpts & OverlayOpts;
};

export type OverlayActiveDrawer = OverlayActiveGeneric & {
  type: "drawer";
  opts: DrawerOpts & OverlayOpts;
};

export type OverlayActive = OverlayActiveModal | OverlayActiveDrawer;

export type OverlayCreateAction = {
  name: "create";
  data: OverlayActive;
};

export type OverlayCloseByIdAction = {
  name: "closeById";
  data: { id: string };
};

export type OverlayCloseAllAction = {
  name: "closeAll";
  data?: undefined;
};

export type OverlayModalConfig = {
  component: ReactNode | FC<any>;
  props?: Record<string, any>;
  opts?: ModalOpts & OverlayOpts;
  id?: string;
};

export type OverlayDrawerConfig = {
  component: ReactNode | FC<any>;
  props?: Record<string, any>;
  opts?: DrawerOpts & OverlayOpts;
  id?: string;
};
