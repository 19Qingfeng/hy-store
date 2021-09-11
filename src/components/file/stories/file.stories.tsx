import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Upload } from "../index";

export default {
  title: "Components/Upload",
  component: Upload,
  argTypes: {},
} as ComponentMeta<typeof Upload>;

const Template: ComponentStory<typeof Upload> = (args) => (
  <Upload {...args}></Upload>
);

export const Primary = Template.bind({});

Primary.args = {
  action: "https://jsonplaceholder.typicode.com/posts",
  onSuccess: (response, file) => {
    console.log("上传成功了", response, file);
  },
  onProgress: (percentage, file) => {
    console.log("上传进度", percentage, file);
  },
  onError: (error, file) => {
    console.log("出现错误了", error, file);
  },
};

Primary.storyName = "基础用法";
