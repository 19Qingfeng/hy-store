import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Upload } from '../index';
import { Button } from '../../button/button';
import { Icon } from '../../icon';

export default {
  title: 'Components/Upload',
  component: Upload,
  argTypes: {
    onSuccess: {
      action: 'onSuccess',
    },
    onProgress: {
      action: 'onProgress',
    },
    onError: {
      action: 'onError',
    },
  },
} as ComponentMeta<typeof Upload>;

const Template: ComponentStory<typeof Upload> = (args) => (
  <Upload {...args}></Upload>
);

export const Primary = Template.bind({});

Primary.args = {
  action: 'https://jsonplaceholder.typicode.com/posts',
  children: (
    <Button btnType="primary" size="sm">
      <Icon icon="upload" style={{ marginRight: '10px' }}></Icon>
      点击上传
    </Button>
  ),
  headers: {
    'name-W': 'X-wang.haoyu',
  },
  multiple: true,
  data: {
    o: 'test-id',
  },
  defaultFileList: [
    {
      uid: '1111',
      size: 1000,
      name: 'wang.haoyu',
      // status: 'success',
      percentage: 100,
    },
    {
      uid: '1111222',
      size: 1000,
      name: 'wang.haoyu',
      status: 'uploading',
      percentage: 30,
    },
    {
      uid: '111122233',
      size: 1000,
      name: 'wang.haoyu',
      status: 'error',
    },
  ],
  onRemove: (file) => {
    console.log('移除', file);
  },
  onSuccess: (response, file) => {
    console.log('上传成功了', response, file);
  },
  onProgress: (percentage, file) => {
    console.log('上传进度', percentage, file);
  },
  onError: (error, file) => {
    // console.log("出现错误了", error, file);
  },
  onChange: (status, file) => {
    // console.log("文件状态改变:", status);
    // console.log("文件:", file);
  },
  beforeUpload: (file) => {
    // const newFile = new File([file], 'wang.haoyu', {
    //   type: file.type,
    // });
    // return Promise.resolve(newFile);
    return true;
  },
};

Primary.storyName = '基础用法';

export const Drag = Template.bind({});

Drag.args = {
  action: 'https://jsonplaceholder.typicode.com/posts',
  drag: true,
  children: (
    <div
      style={{
        width: '600px',
        height: '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon icon="upload" style={{ marginBottom: '10px' }}></Icon>
      将文件拖拽到此上传
    </div>
  ),
};

Drag.storyName = '拖拽上传';
