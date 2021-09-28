import { FC } from 'react';
import { MenuProps } from './menu';
import { MenuItem } from './menu-item';
import { SubMenuItem, SubMenuProps } from './sub-menu';
declare type IMenu = FC<MenuProps> & {
    Item: typeof MenuItem;
    SubMenuItem: FC<SubMenuProps>;
};
declare const ExtendMenu: IMenu;
export { ExtendMenu as Menu, MenuItem, SubMenuItem };
