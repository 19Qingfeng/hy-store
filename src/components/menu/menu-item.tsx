import classNames from 'classnames';
import React from 'react';

interface MenuItemProps {
  index?: number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const prefix = 'hy';

const menu: React.FC<MenuItemProps> = (props) => {
  const { disabled, className, style, children } = props;
  const classes = classNames(`${prefix}-menu-item`, className, {
    'is-disabled': disabled,
  });
  return (
    <li className={classes} style={style}>
      {children}
    </li>
  );
};

export default menu;
