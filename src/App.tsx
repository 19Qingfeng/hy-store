import "./styles/index.scss";
// import Button from './components/button/button';
import Menu from "./components/menu/menu";
import MenuItem from "./components/menu/menu-item";
import SubMenu from "./components/menu/sub-menu";
import Icon from "./components/icon";
import Alert from "./components/alert";
import Row from "./components/grid/row";
import Col from "./components/grid/column";
import Input from "./components/input";

import { useEffect, useRef, useState } from "react";

export default function App() {
  // button
  const buttonRef = useRef(null);
  useEffect(() => {
    console.log(buttonRef, "buttonRef");
  });
  const [value, setValue] = useState<string | undefined>();
  console.log(value, "value");
  return (
    <div>
      <div style={{ padding: "10px" }}>
        <Input
          value={value}
          defaultValue={10}
          onChange={(e) => setValue(e.target.value)}
        />
        {value}
      </div>
      <Row gap={20} justify="end">
        <Col span={2} xs={24} sm={12} md={24} lg={12} xl={24}>
          <div style={{ background: "red" }}>第一行</div>
        </Col>
        <Col span={2} offset={10}>
          <div style={{ background: "blue" }}>第二行</div>
        </Col>
        <Col span={6}>
          <div style={{ background: "yellow" }}>第三行</div>
        </Col>
      </Row>
      <div>
        <Alert message="hello world" type="success">
          <div>你好,世界</div>
          <div>Hello,World.</div>
        </Alert>
        {/* <Alert message="hello world" type="info" /> */}
        {/* <Alert message="hello world" type="danger" /> */}
      </div>
      <Icon icon="coffee" size="10x" theme="primary" />
      <div>
        <Menu
          activeIndex={"0"}
          onSelect={(index) => alert(index)}
          trigger="click"
        >
          <SubMenu title="顶部">
            <MenuItem>sub 1</MenuItem>
          </SubMenu>
          submenu
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
