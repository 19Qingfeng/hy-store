import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Progress } from "..";

export default {
  title: "Components/progress",
  component: Progress,
} as ComponentMeta<typeof Progress>;

const Template: ComponentStory<typeof Progress> = (args) => (
  <>
    <div style={{ marginBottom: "20px", fontSize: "12px" }}>基础进度条: </div>
    <Progress {...args}></Progress>
  </>
);

export const Primary = Template.bind({});

Primary.args = {
  percentage: 50,
  showText: true,
};

Primary.storyName = "基础用法";
