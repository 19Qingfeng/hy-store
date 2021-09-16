import classNames from "classnames";
import React, { useContext } from "react";
import { MenuContext } from "./menu";

export interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const prefix = "hy";

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props;
  const { activeIndex, onSelect } = useContext(MenuContext);
  const classes = classNames(`${prefix}-menu-item`, className, {
    "is-disabled": disabled,
    "is-active": activeIndex === index,
  });
  const handleClick = () => {
    if (onSelect && !disabled && typeof index === "string") {
      onSelect(index);
    }
  };
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  );
};

MenuItem.displayName = "MenuItem";

export { MenuItem };
