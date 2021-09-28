import React from 'react';
declare type FileStatus = 'ready' | 'rejected' | 'uploading' | 'error' | 'success';
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
export interface UploadProps {
    className?: string;
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
    headers?: {
        [name: string]: any;
    };
    /**
     * 自定义上传文件名称
     */
    name?: string;
    /**
     * 是否显示文件列表
     */
    showFileList?: boolean;
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
    data?: {
        [name: string]: any;
    };
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
    onError?: (error: any, file: File) => void;
}
/**
 * 文件上传组件
 */
declare const Upload: React.FC<UploadProps>;
export { Upload };
