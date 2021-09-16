import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Input } from "..";

export default {
  title: "Components/Input",
  component: Input,
  argTypes: {},
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => (
  <Input {...args}></Input>
);

export const Primary = Template.bind({});

Primary.args = {};

Primary.storyName = "基础用法";
