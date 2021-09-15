import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Progress } from "..";

export default {
  title: "Components/progress",
  component: Progress,
} as ComponentMeta<typeof Progress>;

const Template: ComponentStory<typeof Progress> = (args) => (
  <>
    <div style={{ marginBottom: "20px", fontSize: "12px" }}>
      {args.circle ? "圆形" : "基础"}进度条:{" "}
    </div>
    <Progress {...args}></Progress>
  </>
);

export const Primary = Template.bind({});

Primary.args = {
  percentage: 50,
  showText: true,
};

Primary.storyName = "基础用法";

export const Circle = Template.bind({});

Circle.args = {
  percentage: 20,
  circle: true,
  showText: true,
};

Circle.storyName = "圆形进度条";
