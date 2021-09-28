import React from "react";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";
declare type AnimationNameProps = "zoom-in-top" | "zoom-in-bottom" | "zoom-in-left" | "zoom-in-right";
declare type TransitionProps = CSSTransitionProps & {
    animationName?: AnimationNameProps;
};
/**
 * 内置过度动画组件
 */
declare const Transition: React.FC<TransitionProps>;
export { Transition };
