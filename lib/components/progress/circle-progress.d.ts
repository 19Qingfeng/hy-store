import React from "react";
import { ProgressProps } from ".";
export interface CircleProps extends Omit<ProgressProps, "className" | "style" | "circle" | "theme"> {
}
declare const CircleProgress: React.FC<CircleProps>;
export { CircleProgress };
