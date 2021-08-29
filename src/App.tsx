import './styles/index.scss';
import Button from './components/button/button';
import Menu from './components/menu/menu';
import MenuItem from './components/menu/menu-item';
import SubMenu from './components/menu/sub-menu';
import Icon from './components/icon';

import { useEffect, useRef } from 'react';

export default function App() {
  // button
  const buttonRef = useRef(null);
  useEffect(() => {
    console.log(buttonRef, 'buttonRef');
  });
  return (
    <div>
      <Icon icon="coffee" size="10x" theme="warning" />
      <div>
        <Menu
          activeIndex={'0'}
          onSelect={(index) => alert(index)}
          trigger="click"
        >
          <SubMenu title="顶部">
            <MenuItem>sub 1</MenuItem>
          </SubMenu>
          <MenuItem>第一个MenuItem</MenuItem>
          <MenuItem>第二个MenuItem</MenuItem>
          <MenuItem disabled>第二个MenuItem Disable</MenuItem>
        </Menu>
      </div>
      {/* <div>
        <Button ref={buttonRef} onClick={() => alert('hello')}>
          hello default
        </Button>
        <Button onClick={() => alert('hello')} disabled>
          hello default
        </Button>
        <Button btnType="primary" size="sm">
          hello default
        </Button>
        <Button btnType="danger" size="lg" disabled={true}>
          禁用按钮
        </Button>
        <Button
          btnType="link"
          href="https://baidu.com"
          size="sm"
          target="_blank"
        >
          链接
        </Button>
        <Button btnType="link" href="https://baidu.com" size="sm" disabled>
          链接
        </Button>
      </div> */}
    </div>
  );
}
