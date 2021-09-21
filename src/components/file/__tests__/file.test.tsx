import React from 'react';
import {
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import { Upload, UploadProps } from '..';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

let wrapper: RenderResult,
  fileInput: HTMLInputElement,
  uploadArea: HTMLElement | null;

function renderUpload(props: UploadProps) {
  return <Upload {...props}>Click to Upload</Upload>;
}

// mock Icon模块
jest.mock('../../icon', () => {
  return {
    Icon: ({ icon }: { icon: string }) => {
      return <span>{icon}</span>;
    },
  };
});

jest.mock('axios');

const mockAxios = axios as jest.Mocked<typeof axios>;

const defaultProps: UploadProps = {
  action: 'http://hycoding.com',
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
    // 创建文件对象
    const testFile = new File(['Test text'], 'test.png', { type: 'image/png' });
    // 模拟axios实现
    mockAxios.post.mockImplementation(() => {
      return Promise.resolve({ data: 'success' });
    });
    act(() => {
      fireEvent.change(fileInput, {
        target: {
          files: [testFile],
        },
      });
    });
    // 期待加载图标出现
    expect(wrapper.getByText('spinner')).toBeInTheDocument();
    // // 期待上传
    // await waitFor(() => {
    //   expect(wrapper.queryByText('wang.txt')).toBeInTheDocument();
    // });
    // // 期待上传结束成功图标出现
    // expect(wrapper.queryByText('wang.txt')).toBeInTheDocument();
  });
});
