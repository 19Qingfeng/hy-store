import React, { useRef, useState } from "react";
import { Button } from "../button/button";
import classNames from "classnames";
import { http } from "./ajax";

type FileStatus = "ready" | "rejected" | "uploading" | "error" | "success";

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
interface UploadProps {
  className: string;
  /**
   * 上传框提交地址
   */
  action: string;
  /**
   * 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。(传入Promise resolve(new File)则会将新的文件替代旧的文件进行上传)
   */
  beforeUpload: (file: File) => boolean | Promise<File | void>;
  /**
   * 上传中钩子
   */
  onChange: (status: FileStatus, file: File) => void;
  /**
   * 上传中钩子
   */
  onProgress?: (percentage: number, file: File) => void;
  /**
   * 上传成功钩子
   */
  onSuccess?: (responseData: any, file: File) => void;
  /**
   * 上传失败钩子
   */
  onError: (error: any, file: File) => void;
}

const namespace = "hy";

/**
 * 文件上传组件
 */
const Upload: React.FC<UploadProps> = (props) => {
  const {
    className,
    action,
    beforeUpload,
    onChange,
    onProgress,
    onSuccess,
    onError,
  } = props;
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

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
      fileRef.current!.value = "";
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
              onChange && onChange("rejected", file);
            });
        } else {
          result ? uploadFile(file) : onChange && onChange("rejected", file);
        }
      }
    });
  };

  const uploadFile = async (file: File) => {
    const _file: UploadFile = {
      uid: Date.now() + "hy-file",
      status: "ready",
      size: file.size,
      name: file.name,
      raw: file,
      percentage: 0,
    };
    setFileList([...fileList, _file]);
    onChange && onChange("uploading", file);
    const formData = new FormData();
    formData.append(file.name, file);
    try {
      const responseData = await http.post(action, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (e: ProgressEvent) => {
          const percentage = Math.round((e.loaded / e.total) * 100);
          // 谨记每次渲染state和prop都是相互独立的
          // 每次state/props改变都会重新执行渲染函数 而每一次渲染函数的作用域中state/props都是独立的 固定的常量！！！
          // FC中每次渲染(函数运行时)的state都是互相独立的
          // state中的值改变的时候 这个FC函数组件会重新运行(带着新的state)
          // 而旧的因为这里的闭包原因 拿到的是自己内部独立的fileList 所以是[]
          // setFileList([...])
          updateFileList(_file, {
            percentage,
            status: "uploading",
          });
          onProgress && onProgress(percentage, file);
        },
      });
      updateFileList(_file, {
        status: "success",
        responseData: responseData.data,
      });
      onSuccess && onSuccess(responseData.data, file);
      onChange && onChange("success", file);
    } catch (e) {
      updateFileList(_file, {
        status: "error",
        error: e,
      });
      onError && onError(e, file);
      onChange && onChange("error", file);
    }
  };

  const handleUpload = () => {
    const inputElement = fileRef.current;
    inputElement?.click();
  };

  return (
    <div className={classes}>
      <ul>
        <li>{fileList?.[0]?.percentage}</li>
      </ul>
      <Button onClick={handleUpload} btnType="primary" size="sm">
        点击上传
      </Button>
      <input
        ref={fileRef}
        type="file"
        className={`${namespace}-upload__input`}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export { Upload };
