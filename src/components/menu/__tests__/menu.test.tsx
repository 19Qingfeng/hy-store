import {
  fireEvent,
  render,
  cleanup,
  RenderResult,
} from '@testing-library/react';

import Menu, { MenuProps } from '../menu';
import MenuItem from '../menu-item';

const testProps: MenuProps = {
  activeIndex: 0,
  onSelect: jest.fn(),
  className: 'wang.haoyu',
};

const verticalProps: MenuProps = {
  activeIndex: 0,
  className: 'wang.haoyu',
  mode: 'vertical',
  onSelect: jest.fn(),
};

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index={0}>active Menu</MenuItem>
      <MenuItem index={1}>Menu Item</MenuItem>
      <MenuItem index={2} disabled>
        disable Menu
      </MenuItem>
    </Menu>
  );
};

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;

describe('test Menu and MenuItem Component', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    // wrapper.container会给render元素外层包裹一层div 这样就可以通过操作DOM的方式进行操作了
    // menuElement = wrapper.container
    // 当然使用data-testid更加高效
    menuElement = wrapper.getByTestId('menu');
    activeElement = wrapper.getByText('active Menu');
    disabledElement = wrapper.getByText('disable Menu');
  });
  test(`should render correct MenuItem's number in Menu`, () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement.getElementsByTagName('li').length).toEqual(3);
  });
  test('should render correct Menu and MenuItem base on default props', () => {
    expect(menuElement).toHaveClass('hy-menu wang.haoyu');
    expect(activeElement).toHaveClass('is-active');
    expect(disabledElement).toHaveClass('is-disabled');
  });
  test('when click item should change active and call the right callback', () => {
    const defaultItem = wrapper.getByText('Menu Item');
    fireEvent.click(defaultItem);
    expect(activeElement).not.toHaveClass('is-active');
    expect(defaultItem).toHaveClass('is-active');
    // toHaveBeenCalledWith 传入的是参数
    expect(testProps.onSelect).toHaveBeenCalledWith(1);
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).not.toHaveBeenCalledWith(2);
  });
  test('should render vertical mode when mode is set vertical', () => {
    // https://testing-library.com/docs/svelte-testing-library/api/#cleanup  cleanup 默认每次测试完成 beforeAfter完成
    cleanup();
    const wrapper = render(generateMenu(verticalProps));
    const menuElement = wrapper.getByTestId('menu');
    expect(menuElement).toHaveClass('hy-menu__vertical');
  });
});
