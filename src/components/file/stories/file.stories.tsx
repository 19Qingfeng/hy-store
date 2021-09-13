import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Upload } from "../index";

export default {
  title: "Components/Upload",
  component: Upload,
  argTypes: {
    onSuccess: {
      action: "onSuccess",
    },
    onProgress: {
      action: "onProgress",
    },
    onError: {
      action: "onError",
    },
  },
} as ComponentMeta<typeof Upload>;

const Template: ComponentStory<typeof Upload> = (args) => (
  <Upload {...args}></Upload>
);

export const Primary = Template.bind({});

Primary.args = {
  action: "https://jsonplaceholder.typicode.com/posts",
  onSuccess: (response, file) => {
    // console.log("上传成功了", response, file);
  },
  onProgress: (percentage, file) => {
    // console.log("上传进度", percentage, file);
  },
  onError: (error, file) => {
    // console.log("出现错误了", error, file);
  },
  onChange: (status, file) => {
    // console.log("文件状态改变:", status);
    // console.log("文件:", file);
  },
  beforeUpload: (file) => {
    const newFile = new File([file], "wang.haoyu", {
      type: file.type,
    });
    return Promise.resolve(newFile);
  },
};

Primary.storyName = "基础用法";
