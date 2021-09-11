import React, { useRef } from "react";
import { Button } from "../button/button";
import classNames from "classnames";
import { http } from "./ajax";

interface UploadProps {
  className: string;
  /**
   * 上传框提交地址
   */
  action: string;
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
  // TODO: error应该是自定义的error 而非Error
  onError: (error: any, file: File) => void;
}

const namespace = "hy";

/**
 * 文件上传组件
 */
const Upload: React.FC<UploadProps> = (props) => {
  const { className, action, onProgress, onSuccess, onError } = props;
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
      uploadFile(file);
    });
  };

  const uploadFile = async (file: File) => {
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
    } catch (e) {
      onError && onError(e, file);
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
