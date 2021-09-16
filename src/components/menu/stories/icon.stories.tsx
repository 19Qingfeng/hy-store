import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Menu } from "../menu";
import { MenuItem } from "../menu-item";
import { SubMenuItem } from "../sub-menu";

export default {
  title: "Components/Menu",
  component: Menu,
  argTypes: {},
  subcomponents: {
    MenuItem,
    SubMenuItem,
  },
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => (
  <Menu {...args}>
    <SubMenuItem title="标题1">
      <MenuItem>选项1</MenuItem>
      <MenuItem>选项2</MenuItem>
    </SubMenuItem>
    <MenuItem>标题2</MenuItem>
  </Menu>
);

export const Primary = Template.bind({});

Primary.args = {};

Primary.storyName = "基础用法";
