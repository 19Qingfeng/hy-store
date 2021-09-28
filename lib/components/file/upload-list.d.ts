import React from 'react';
import { UploadFile } from '.';
export interface UploadListProps {
    fileList: UploadFile[];
    strokeWidth: number;
    onRemove?: (file: UploadFile) => void;
}
declare const UploadList: React.FC<UploadListProps>;
export { UploadList };
