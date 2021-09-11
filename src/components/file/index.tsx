import React, { useRef } from "react";
import { Button } from "../button/button";
import classNames from "classnames";
import { http } from "./ajax";

type FileStatus = "rejected" | "uploading" | "error" | "success";

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

  const classes = classNames(`${namespace}-upload`, className);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    // 先考虑单个文件上传
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
          onProgress && onProgress(percentage, file);
        },
      });
      onSuccess && onSuccess(responseData.data, file);
      onChange && onChange("success", file);
    } catch (e) {
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
