import classNames from 'classnames';
import React, { createContext, useState } from 'react';

type MenuMode = 'horizontal' | 'vertical';
type SelectFn = (index: number) => void;
export interface MenuProps {
  activeIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectFn;
}

export interface IMenuContext {
  activeIndex: number;
  onSelect?: SelectFn;
}

const prefix = 'hy';

export const MenuContext = createContext<IMenuContext>({
  activeIndex: 0,
});

const Menu: React.FC<MenuProps> = (props) => {
  const { className, activeIndex, mode, style, children, onSelect } = props;
  const [active, setActive] = useState(activeIndex);
  const classes = classNames(`${prefix}-menu`, className, {
    [`${prefix}-menu__vertical`]: mode === 'vertical',
    [`${prefix}-menu__horizontal`]: mode === 'horizontal',
  });
  const transmitContext: IMenuContext = {
    activeIndex: active === undefined ? 0 : active,
    onSelect: (index) => {
      setActive(index);
      if (onSelect) {
        onSelect(index);
      }
    },
  };
  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={transmitContext}>
        {children}
      </MenuContext.Provider>
    </ul>
  );
};

export default Menu;

Menu.defaultProps = {
  mode: 'horizontal',
  activeIndex: 0,
};
