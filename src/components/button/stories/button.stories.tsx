import { ComponentStory } from "@storybook/react";
import React from "react";
import Button, { ButtonProps } from "../button";

export default {
  title: "Components/Button",
  component: Button,
};

const Template: ComponentStory<typeof Button> = (args: ButtonProps) => (
  <Button {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  children: "This is a default Button",
};

// export const Primary = () => (
//   <>
//     <div>
//       <Button btnType="default">This is a default button</Button>
//       <Button btnType="primary">This is a primary button</Button>
//       <Button btnType="danger">This is a danger button</Button>
//       <Button btnType="link">This is a link button</Button>
//       <Button btnType="link">This is a link button</Button>
//     </div>
//   </>
// );

// export const Size = () => (
//   <>
//     <Button btnType="primary" size="lg">
//       large button
//     </Button>
//     <Button btnType="primary" size="sm">
//       small button
//     </Button>
//   </>
// );
