import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Icon } from "../index";

export default {
  title: "Components/Icon",
  component: Icon,
  argTypes: {},
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  icon: "coffee",
};

Primary.storyName = "基础用法";
