import React, { useState, useContext } from "react";
import classNames from "classnames";
import { Icon } from "../icon";
import { MenuContext } from "./menu";
import { MenuItemProps } from "./menu-item";
<<<<<<< HEAD
import Transition from "../transition";
=======
import { Transition } from "../transiton";
>>>>>>> 55cb5624091e5c98aa5d52d94767984e2fa5b908

export interface SumMenuProps {
  index?: string;
  title?: string;
  className?: string;
}

const prefix = "hy";

const SubMenuItem: React.FC<SumMenuProps> = (props) => {
  // props
  const { index, title, className, children } = props;
  // provide
  const { trigger, mode, defaultSubExtend } = useContext(MenuContext);
  // data
  const isDefaultExpend = defaultSubExtend?.includes(index!);
  const [menuOpen, setMenuOpen] = useState(isDefaultExpend);
  // 是否是true 如果是true 默认给他一个箭头展开的效果
  const classes = classNames(
    `${prefix}-menu-item`,
    `${prefix}-submenu-item`,
    { "is-open": menuOpen },
    { "is-vertical": mode === "vertical" },
    className
  );
  // methods
  const handleClick = (e: React.MouseEvent) => {
    setMenuOpen(!menuOpen);
    e.preventDefault();
  };

  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setMenuOpen(toggle);
    }, 300);
  };

  const clickEvents =
    trigger === "click"
      ? {
          onClick: handleClick,
        }
      : {};
  const hoverEvents =
    trigger === "hover"
      ? {
          onMouseEnter: (e: React.MouseEvent) => handleMouse(e, true),
          onMouseLeave: (e: React.MouseEvent) => handleMouse(e, false),
        }
      : {};

  const renderChildren = () => {
    const subMenuClasses = classNames(`${prefix}-submenu`, {
      "menu-opened": menuOpen,
    });
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === "MenuItem") {
        return React.cloneElement(childElement, {
          index: childElement.props.index
            ? childElement.props.index
            : `${index}-${i}`,
        });
      } else {
        console.warn(
          "Warning: subMenu has a child which is not a MenuItem Component."
        );
      }
    });
    return <ul className={subMenuClasses}>{childrenComponent}</ul>;
  };
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className={`${prefix}-submenu__title`} {...clickEvents}>
        {title}
        <Icon icon="angle-down" className={`${prefix}-submenu__icon`} />
      </div>
      <Transition animationName="zoom-in-top" timeout={30000} in={menuOpen}>
        {renderChildren()}
      </Transition>
    </li>
  );
};

SubMenuItem.displayName = "SubMenu";

export { SubMenuItem };
