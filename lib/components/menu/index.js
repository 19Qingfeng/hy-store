import { Menu } from './menu';
import { MenuItem } from './menu-item';
import { SubMenuItem } from './sub-menu';
var ExtendMenu = Menu;
ExtendMenu.Item = MenuItem;
ExtendMenu.SubMenuItem = SubMenuItem;
export { ExtendMenu as Menu, MenuItem, SubMenuItem };
