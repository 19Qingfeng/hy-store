import classNames from 'classnames';
import React, { createContext, useState } from 'react';
import { MenuItemProps } from './menu-item';

type MenuMode = 'horizontal' | 'vertical';
type MenuTriggerWay = 'hover' | 'click';
type SelectFn = (index: string) => void;
export interface MenuProps {
  activeIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  trigger?: MenuTriggerWay;
  defaultSubExtend?: string[];
  onSelect?: SelectFn;
}

export interface IMenuContext {
  activeIndex: string;
  trigger: MenuTriggerWay;
  mode: MenuMode;
  defaultSubExtend?: string[];
  onSelect?: SelectFn;
}

const prefix = 'hy';

export const MenuContext = createContext<IMenuContext>({
  activeIndex: '0',
  trigger: 'hover',
  mode: 'horizontal',
});

const Menu: React.FC<MenuProps> = (props) => {
  const {
    className,
    activeIndex,
    trigger,
    mode,
    style,
    children,
    defaultSubExtend,
    onSelect,
  } = props;
  const [active, setActive] = useState(activeIndex);
  const classes = classNames(`${prefix}-menu`, className, {
    [`${prefix}-menu__vertical`]: mode === 'vertical',
    [`${prefix}-menu__horizontal`]: mode === 'horizontal',
  });
  const transmitContext: IMenuContext = {
    activeIndex: active === undefined ? '0' : active,
    trigger: trigger ? trigger : 'hover',
    defaultSubExtend,
    mode: mode ? mode : 'horizontal',
    onSelect: (index) => {
      setActive(index);
      if (onSelect) {
        onSelect(index);
      }
    },
  };
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childrenElement =
        child as React.FunctionComponentElement<MenuItemProps>;
      if (
        childrenElement.type.displayName === 'MenuItem' ||
        childrenElement.type.displayName === 'SubMenu'
      ) {
        // React中元素是不可变的 变化元素只能新建一个元素去替换
        return React.cloneElement(childrenElement, {
          index: childrenElement.props.index
            ? childrenElement.props.index
            : index.toString(),
        });
      } else {
        // nothing
        console.warn(
          'Warning: menu has a child which is not a MenuItem Component.'
        );
      }
    });
  };
  return (
    <ul className={classes} style={style} data-testid="menu">
      <MenuContext.Provider value={transmitContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

export default Menu;

Menu.defaultProps = {
  mode: 'horizontal',
  activeIndex: '0',
  trigger: 'hover',
};
