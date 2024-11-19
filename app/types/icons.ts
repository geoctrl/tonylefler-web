import { IconProps } from "../common/icon/icon";
import { ReactNode } from "react";
import { IconName } from "./icon-gen";

export type Icons = IconName;
export type IconOrElement = Icons | IconProps | ReactNode;
