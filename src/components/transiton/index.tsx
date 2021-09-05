import React from "react";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

type AnimationNameProps =
  | "zoom-in-top"
  | "zoom-in-bottom"
  | "zoom-in-left"
  | "zoom-in-right";

type TransitionProps = CSSTransitionProps & {
  animationName?: AnimationNameProps;
};

/**
 * 内置过度动画组件
 */
const Transition: React.FC<TransitionProps> = (props) => {
  const { children, animationName, classNames, wrapper, ...rest } = props;
  return (
    <CSSTransition
      classNames={classNames ? classNames : animationName}
      {...rest}
    >
      {children}
    </CSSTransition>
  );
};

export { Transition };

Transition.defaultProps = {
  appear: true,
  mountOnEnter: true,
  unmountOnExit: true,
};
