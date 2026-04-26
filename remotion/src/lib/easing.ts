import { Easing } from "remotion";

export const softEaseOut = Easing.bezier(0.16, 1, 0.3, 1);
export const softEaseInOut = Easing.bezier(0.65, 0, 0.35, 1);
export const linear = Easing.linear;
