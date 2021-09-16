import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Alert } from "..";

export default {
  title: "Components/Alert",
  component: Alert,
  argTypes: {},
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  children: "内容",
  type: "primary",
  showIcon: true,
  showClose: true,
};

Primary.storyName = "基础用法";
