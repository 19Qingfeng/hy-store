import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button, ButtonProps } from "../button";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    btnType: {
      control: "radio",
      options: ["primary", "default", "danger", "link"],
    },
    size: {
      control: "radio",
      options: ["lg", "sm"],
    },
    disabled: {
      control: "boolean",
      options: [false, true],
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  children: "This is a default Button",
  btnType: "primary",
  size: "sm",
  disabled: false,
};

Primary.storyName = "基础用法";
