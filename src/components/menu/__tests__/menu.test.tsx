import {
  fireEvent,
  render,
  cleanup,
  RenderResult,
  act,
} from '@testing-library/react';

import Menu, { MenuProps } from '../menu';
import MenuItem from '../menu-item';
import SubMenu from '../sub-menu';

jest.useFakeTimers();

const testProps: MenuProps = {
  activeIndex: '0',
  onSelect: jest.fn(),
  className: 'wang.haoyu',
};

const verticalProps: MenuProps = {
  activeIndex: '0',
  className: 'wang.haoyu',
  mode: 'vertical',
  onSelect: jest.fn(),
};

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active Menu</MenuItem>
      <MenuItem>Menu Item</MenuItem>
      <MenuItem disabled>disable Menu</MenuItem>
      <SubMenu title="wang.haoyu">
        <MenuItem>item</MenuItem>
      </SubMenu>
    </Menu>
  );
};

const createStyleFile = () => {
  const cssFile: string = `
    .hy-submenu {
      display:none;
    }
    .menu-opened {
      display: block;
    }
  `;
  const style = document.createElement('style');
  style.innerHTML = cssFile;
  return style;
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
    // 将style节点直接传入wrapper中 页面中可以直接使用<style></style>中的样式
    wrapper.container.append(createStyleFile());
  });
  test(`should render correct MenuItem's number in Menu`, () => {
    expect(menuElement).toBeInTheDocument();
    // expect(menuElement.getElementsByTagName('li').length).toEqual(3);
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4);
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
    expect(testProps.onSelect).toHaveBeenCalledWith('1');
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).not.toHaveBeenCalledWith('2');
  });
  test('should render vertical mode when mode is set vertical', () => {
    // https://testing-library.com/docs/svelte-testing-library/api/#cleanup  cleanup 默认每次测试完成 beforeAfter完成
    cleanup();
    const wrapper = render(generateMenu(verticalProps));
    const menuElement = wrapper.getByTestId('menu');
    expect(menuElement).toHaveClass('hy-menu__vertical');
  });
  test('should show dropdown items when hover on subMenu', () => {
    jest.useFakeTimers();
    const dropdownElement = wrapper.queryByText('item');
    expect(dropdownElement).not.toBeVisible();
    fireEvent.mouseEnter(wrapper.getByText('wang.haoyu'));
    // act可以理解为vue中的nextTick
    act(() => {
      jest.runAllTimers();
    });
    expect(dropdownElement).toBeVisible();
    fireEvent.mouseLeave(wrapper.getByText('wang.haoyu'));
    act(() => {
      jest.runAllTimers();
    });
    expect(dropdownElement).not.toBeVisible();
  });
});
