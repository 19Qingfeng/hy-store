import { FC } from 'react';
import { Menu, MenuProps } from './menu';
import { MenuItem } from './menu-item';
import { SubMenuItem, SubMenuProps } from './sub-menu';

// interface also can achieve
type IMenu = FC<MenuProps> & {
  Item: typeof MenuItem;
  SubMenuItem: FC<SubMenuProps>;
};

const ExtendMenu: IMenu = Menu as IMenu;

ExtendMenu.Item = MenuItem;
ExtendMenu.SubMenuItem = SubMenuItem;

export { ExtendMenu as Menu };
