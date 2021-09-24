import React, { MouseEventHandler } from 'react';
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
  createEvent,
} from '@testing-library/react';
import { Upload, UploadProps } from '..';
import axios from 'axios';

let wrapper: RenderResult,
  fileInput: HTMLInputElement,
  uploadArea: HTMLElement | null;

function renderUpload(props: UploadProps) {
  return <Upload {...props}>Click to Upload</Upload>;
}

// mock Icon模块
jest.mock('../../icon', () => {
  return {
    Icon: ({
      icon,
      onClick,
    }: {
      icon: string;
      onClick: MouseEventHandler<HTMLElement>;
    }) => {
      return <span onClick={onClick}>{icon}</span>;
    },
  };
});

jest.mock('axios');

const mockAxios = axios as jest.Mocked<typeof axios>;

const defaultProps: UploadProps = {
  action: 'http://hycoding.com',
  onSuccess: jest.fn(),
  onProgress: jest.fn(),
  onRemove: jest.fn(),
};

const dragProps: UploadProps = {
  action: 'http://hycoding.com',
  drag: true,
  beforeUpload: jest.fn(),
  onSuccess: jest.fn(),
  onProgress: jest.fn(),
};

describe('Test Upload File Component', () => {
  beforeEach(() => {
    wrapper = render(renderUpload(defaultProps));
    fileInput = wrapper.container.querySelector('input') as HTMLInputElement;
    uploadArea = wrapper.queryByText('Click to Upload');
  });

  test('upload file should be workd fine', async () => {
    expect(fileInput).toBeInTheDocument();
    const testFile = new File(['Test text'], 'wang.png', { type: 'image/png' });
    // 模拟axios实现
    mockAxios.post.mockImplementation(() => {
      return Promise.resolve({ data: 'success' });
    });
    // 上传之前没有出现完成图标
    expect(wrapper.queryByText('check-circle')).not.toBeInTheDocument();
    // fireEvent 内部会被act包裹
    fireEvent.change(fileInput, {
      target: {
        files: [testFile],
      },
    });
    // 期待加载图标出现
    expect(wrapper.getByText('spinner')).toBeInTheDocument();
    // 期待上传成功  wang.png 文件出现在页面上
    await waitFor(() => {
      expect(wrapper.queryByText('wang.png')).toBeInTheDocument();
    });
    // 期待上传结束成功图标出现
    expect(wrapper.queryByText('check-circle')).toBeInTheDocument();
    expect(wrapper.queryByText('times')).toBeInTheDocument();
    // 点击删除
    fireEvent.click(wrapper.queryByText('times')!);
    // 期待文件不出现
    expect(wrapper.queryByText('wang.png')).not.toBeInTheDocument();
    /**
     * see: https://jestjs.io/docs/expect#expectobjectcontainingobject
     * For example, let's say that we expect an onPress function to be called with an Event object, and all we need to verify is that the event has event.x and event.y properties. We can do that with:

      test('onPress gets called with the right thing', () => {
        const onPress = jest.fn();
        simulatePresses(onPress);
        expect(onPress).toBeCalledWith(
          expect.objectContaining({
            x: expect.any(Number),
            y: expect.any(Number),
          }),
        );
      });
     */
    expect(defaultProps.onRemove).toBeCalledWith(
      expect.objectContaining({
        name: 'wang.png',
        status: 'success',
        // percentage: 0, 这里模拟了axios 所有percentage为0
        raw: testFile,
      })
    );
  });

  test('drag upload Component', async () => {
    cleanup();
    mockAxios.post.mockResolvedValue({ data: 'success' });
    const wrapper = render(renderUpload(dragProps)),
      uploadArea = wrapper.getByText('Click to Upload'),
      testFile = new File(['Test text'], 'drag.png', { type: 'image/png' });
    (dragProps.beforeUpload as jest.Mock).mockReturnValue(true);
    // 当拖拽一个文件放置时候
    // dataTransfer JSDOM不支持
    // see: https://github.com/testing-library/react-testing-library/issues/339
    // 返回的是event对象
    const dropEvent = createEvent.drop(uploadArea);
    Object.defineProperty(dropEvent, 'dataTransfer', {
      value: {
        files: [testFile],
      },
    });
    // 我仅仅是触发～并没有绑定 相当于触发drop 但是传入的是我的参数～
    // dom上的同名事件drop会被触发 但是传入的是我自定义的事件对象
    // 而非用户触发行为的事件对象
    fireEvent(uploadArea, dropEvent);
    expect(dragProps.beforeUpload).toBeCalled();
    await waitFor(() => {
      expect(wrapper.queryByText('drag.png')).toBeInTheDocument();
    });
    expect(dragProps.onSuccess).toBeCalledWith(
      'success',
      testFile
    );
  });
});
