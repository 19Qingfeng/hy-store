import React from 'react';
import { Icon, ThemeProps } from '../icon';
import { UploadFile } from '.';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const prefix = 'hy';
export interface UploadListProps {
  fileList: UploadFile[];
  onRemove?: (file: UploadFile) => void;
}

const UploadList: React.FC<UploadListProps> = (props) => {
  const { fileList, onRemove } = props;

  const getFileStatusIcon = (
    file: UploadFile
  ): { icon: IconProp; theme: ThemeProps } => {
    const { status } = file;
    const maps = [
      { icon: 'spinner', theme: 'primary', status: 'uploading' },
      { icon: 'check-circle', theme: 'success', status: 'success' },
      { icon: 'times-circle', theme: 'danger', status: 'error' },
    ];
    const result = maps.find((i) => i.status === status);
    return {
      icon: result!.icon as IconProp,
      theme: result!.theme as ThemeProps,
    };
  };

  return (
    <ul className={`${prefix}-upload__list`}>
      {fileList.map((file) => {
        const { icon, theme } = getFileStatusIcon(file);
        return (
          <li className={`${prefix}-upload__li`} key={file.uid}>
            <span
              className={`${prefix}-file--${file.status} ${prefix}-file__name `}
            >
              <Icon
                className={`${prefix}-file__icon`}
                theme="secondary"
                icon="file-alt"
              />
              {file.name}
            </span>
            <span className={`${prefix}-file__status`}>
              {/* hover时变成X  */}
              <Icon
                className={`${prefix}-file__ri`}
                spin={file.status === 'uploading'}
                theme={theme}
                icon={icon}
              ></Icon>
              <Icon
                className={`${prefix}-file__ri--hover`}
                icon="times"
                onClick={() => onRemove && onRemove(file)}
              ></Icon>
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export { UploadList };
