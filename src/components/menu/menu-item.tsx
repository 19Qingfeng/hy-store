import classNames from 'classnames';
import React, { useContext } from 'react';
import { MenuContext } from './menu';

interface MenuItemProps {
  index: number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const prefix = 'hy';

const Menu: React.FC<MenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props;
  const { activeIndex, onSelect } = useContext(MenuContext);
  const classes = classNames(`${prefix}-menu-item`, className, {
    'is-disabled': disabled,
    'is-active': activeIndex === index,
  });
  const handleClick = () => {
    if (onSelect && !disabled) {
      onSelect(index);
    }
  };
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  );
};

export default Menu;
