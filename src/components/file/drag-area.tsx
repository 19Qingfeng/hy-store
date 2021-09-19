import classNames from 'classnames';
import React, { useState } from 'react';

interface DragAreaProps {
  onFile: (lists: FileList) => void;
}

const prefix = 'hy';

const DragArea: React.FC<DragAreaProps> = (props) => {
  const { onFile, children } = props;

  const [status, setStatus] = useState(false);

  const classes = classNames(`${prefix}-upload__drag`, {
    'is-dragover': status,
  });
  // 进入区域
  const handleDragEnter = (e: React.DragEvent<HTMLElement>) => {
    setStatus(true);
    e.preventDefault();
  };
  // 区域移动
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  // 离开区域
  const handleDragLeave = (e: React.DragEvent<HTMLElement>) => {
    setStatus(false);
    e.preventDefault();
  };
  // 放置区域
  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    setStatus(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onFile(files);
    }
    e.preventDefault();
  };

  return (
    <div
      className={classes}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};
export { DragArea };
