import classNames from 'classnames';
import React from 'react';

type MenuMode = 'horizontal' | 'vertical';

export interface MenuProps {
  activeIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: (index: number) => void;
}

const prefix = 'hy';

const menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, children } = props;
  const classes = classNames(`${prefix}-menu`, className, {
    [`${prefix}-menu__vertical`]: mode === 'vertical',
    [`${prefix}-menu__horizontal`]: mode === 'horizontal',
  });
  return (
    <ul className={classes} style={style}>
      {children}
    </ul>
  );
};

export default menu;

menu.defaultProps = {
  mode: 'horizontal',
  activeIndex: 0,
};
