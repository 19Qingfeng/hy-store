import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Transition } from "../index";

export default {
  title: "Components/Transition",
  component: Transition,
  argTypes: {},
} as ComponentMeta<typeof Transition>;

const Template: ComponentStory<typeof Transition> = (args) => (
  <Transition {...args}></Transition>
);

export const Primary = Template.bind({});

Primary.args = {
  children: <div>动画效果</div>,
  animationName: "zoom-in-right",
};

Primary.storyName = "基础用法";
