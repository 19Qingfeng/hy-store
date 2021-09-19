import React, { useRef, useState } from 'react';
import { UploadList } from './upload-list';
import { DragArea } from './drag-area';
import classNames from 'classnames';
import { http } from './ajax';

type FileStatus = 'ready' | 'rejected' | 'uploading' | 'error' | 'success';

// TODO: 抽离颜色样式
// TODO: transition过度动画列表增加
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: FileStatus;
  percentage?: number;
  raw?: File;
  responseData?: any;
  error?: any;
}

// TODO: 上传应该XHR替换axios
// TODO: error应该是自定义的error 而非Error
// TODO: 替换全部File为UploadFile对象
interface UploadProps {
  className: string;
  /**
   * 上传框提交地址
   */
  action: string;
  /**
   * 默认上传的文件数组
   */
  defaultFileList?: UploadFile[];
  /**
   * 内置上传进度条高度
   */
  strokeWidth?: number;
  /**
   * 自定义上传请求头
   */
  headers?: { [name: string]: any };
  /**
   * 自定义上传文件名称
   */
  name?: string;
  /**
   * 是否显示文件列表
   */
  showFileList: boolean;
  /**
   * 是否开启拖拽上传
   */
  drag?: boolean;
  /**
   * 源生Input属性 支持上传的文件列表
   */
  accept?: string;
  /**
   * 是否支持多选
   */
  multiple?: boolean;
  /**
   * 自定义上传额外携带数据
   */
  data?: { [name: string]: any };
  /**
   * 跨域上传请求是否支持携带cookie
   */
  withCredentials?: boolean;
  /**
   * 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。(传入Promise resolve(new File)则会将新的文件替代旧的文件进行上传)
   */
  beforeUpload?: (file: File) => boolean | Promise<File | void>;
  /**
   * 上传中钩子
   */
  onChange?: (status: FileStatus, file: File) => void;
  /**
   * 上传中钩子
   */
  onRemove?: (file: UploadFile) => void;
  /**
   * 上传中钩子
   */
  onProgress?: (percentage: number, file: UploadFile) => void;
  /**
   * 上传成功钩子
   */
  onSuccess?: (responseData: any, file: File) => void;
  /**
   * 上传失败钩子
   */
  onError: (error: any, file: File) => void;
}

const namespace = 'hy';

/**
 * 文件上传组件
 */
const Upload: React.FC<UploadProps> = (props) => {
  const {
    children,
    drag = false,
    showFileList = true,
    accept,
    multiple,
    defaultFileList = [],
    onRemove,
    className,
    action,
    strokeWidth = 6,
    name,
    headers,
    data,
    withCredentials,
    beforeUpload,
    onChange,
    onProgress,
    onSuccess,
    onError,
  } = props;
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList);

  const classes = classNames(`${namespace}-upload`, className);

  const updateFileList = (
    updateFile: UploadFile,
    updateObject: Partial<UploadFile>
  ) => {
    setFileList((preList) => {
      return preList.map((file) => {
        if (file.uid === updateFile.uid) {
          return {
            ...file,
            ...updateObject,
          };
        }
        return file;
      });
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      uploadFiles(files);
      fileRef.current!.value = '';
    }
  };

  const uploadFiles = (files: FileList) => {
    const fileArr = Array.from(files);
    fileArr.forEach((file) => {
      if (!beforeUpload) {
        uploadFile(file);
      } else {
        const result = beforeUpload(file);
        if (result instanceof Promise) {
          result
            .then((nFile) => {
              const newFile = nFile ? nFile : file;
              uploadFile(newFile);
            })
            .catch(() => {
              onChange && onChange('rejected', file);
            });
        } else {
          result ? uploadFile(file) : onChange && onChange('rejected', file);
        }
      }
    });
  };

  const generateFormData = (file: UploadFile): FormData => {
    const formData = new FormData();
    const fileName = name || file.name;
    formData.append(fileName, file.raw!);
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }
    return formData;
  };

  const fetchFile = async (file: UploadFile, data: FormData) => {
    return await http.post(action, data, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data',
      },
      withCredentials,
      onUploadProgress: (e: ProgressEvent) => {
        const percentage = Math.round((e.loaded / e.total) * 100);
        // 谨记每次渲染state和prop都是相互独立的
        // 每次state/props改变都会重新执行渲染函数 而每一次渲染函数的作用域中state/props都是独立的 固定的常量！！！
        // FC中每次渲染(函数运行时)的state都是互相独立的
        // state中的值改变的时候 这个FC函数组件会重新运行(带着新的state)
        // 而旧的因为这里的闭包原因 拿到的是自己内部独立的fileList 所以是[]
        // setFileList([...])
        updateFileList(file, {
          percentage,
          status: 'uploading',
        });
        onProgress && onProgress(percentage, file);
      },
    });
  };

  const uploadFile = async (file: File) => {
    const _file: UploadFile = {
      uid: Date.now() + 'hy-file',
      status: 'ready',
      size: file.size,
      name: name || file.name,
      raw: file,
      percentage: 0,
    };
    // 这里有问题
    // setFileList([...fileList, _file]);
    setFileList((preLists) => [...preLists, _file]);
    onChange && onChange('uploading', file);
    // 生成formData数据
    const formData = generateFormData(_file);
    // 真实发送请求
    try {
      const responseData = await fetchFile(_file, formData);
      updateFileList(_file, {
        status: 'success',
        responseData: responseData.data,
      });
      onSuccess && onSuccess(responseData.data, file);
      onChange && onChange('success', file);
    } catch (e) {
      updateFileList(_file, {
        status: 'error',
        error: e,
      });
      onError && onError(e, file);
      onChange && onChange('error', file);
    }
  };

  const handleRemove = (file: UploadFile) => {
    setFileList((preLists) => {
      return preLists.filter((i) => i.uid !== file.uid);
    });
    onRemove && onRemove(file);
  };

  const handleUpload = () => {
    const inputElement = fileRef.current;
    inputElement?.click();
  };

  return (
    <div className={classes}>
      {/* click事件冒泡处理就可以了 */}
      <div onClick={handleUpload}>
        {drag ? (
          <DragArea
            onFile={(fileList) => uploadFiles(fileList)}
          >
            {children}
          </DragArea>
        ) : (
          children
        )}
        <input
          ref={fileRef}
          type="file"
          multiple={multiple}
          accept={accept}
          className={`${namespace}-upload__input`}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
      {fileList.length !== 0 && showFileList && (
        <UploadList
          fileList={fileList}
          strokeWidth={strokeWidth}
          onRemove={handleRemove}
        ></UploadList>
      )}
    </div>
  );
};

export { Upload };
