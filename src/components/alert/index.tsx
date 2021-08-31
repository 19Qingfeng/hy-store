import React, { forwardRef, useState } from "react";
import classNames from "classnames";
import Icon, { IconProp } from "../icon";
import { isValidValue } from "../../utils";

type AlertType = "primary" | "success" | "info" | "warning" | "danger";

export interface AlertProps {
  message: React.ReactNode; // 消息提示内容
  className?: string;
  showClose?: boolean;
  showIcon?: boolean; // 是否需要图标
  type?: AlertType; // 类型
  children?: React.ReactNode;
}

const iconMaps = {
  primary: "exclamation-circle",
  success: "check-circle",
  info: "info-circle",
  warning: "exclamation-triangle",
  danger: "radiation-alt",
};

const prefix = "hy";

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  const {
    className,
    type = "info",
    showIcon = false,
    showClose = false,
    children,
  } = props;
  const [isShow, setShow] = useState(true);
  const hasChildren = isValidValue(children);
  const classes = classNames(
    `${prefix}-alert`,
    {
      [`${prefix}-alert--${type}`]: type,
    },
    className
  );

  const handleClose = () => {
    setShow(false);
  };

  const renderIcon = () => {
    const currentIcon = iconMaps[type] as IconProp;
    const classes = classNames(`${prefix}-alert__icon`, {
      "is-scale": hasChildren,
    });
    return (
      <div className={classes} data-testid="icon">
        <Icon className={`${prefix}-alert__svg`} icon={currentIcon}></Icon>
      </div>
    );
  };

  const renderClose = () => {
    return (
      <Icon
        className={`${prefix}-alert__close`}
        onClick={handleClose}
        icon="times-circle"
      ></Icon>
    );
  };

  const renderTitle = () => {
    const classes = classNames(`${prefix}-alert__title`, {
      "is-bold": hasChildren,
    });
    return (
      <>
        <div className={classes}>{props.message}</div>
        {hasChildren ? renderDescription() : null}
      </>
    );
  };

  const renderDescription = () => {
    const childrenElement = children as React.ReactElement;
    return React.Children.map(childrenElement, (child, index) => {
      if (!React.isValidElement(child)) {
        return child;
      } else {
        // 这里直接非React元素 比如string/number 并不会经过babel转译 cloneElement会报错丢失type
        return React.cloneElement(child, {
          key: index,
        });
      }
    });
  };

  return !isShow ? null : (
    <div data-testid="alert" className={classes} ref={ref}>
      {showIcon && renderIcon()}

      <div className={`${prefix}-alert__content`}>{renderTitle()}</div>

      {showClose ? (
        <div className={`${prefix}-alert__description`}>{renderClose()}</div>
      ) : null}
    </div>
  );
});

export default Alert;
