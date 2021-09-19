import React from 'react';
import { Icon, ThemeProps } from '../icon';
import { UploadFile } from '.';
import { Progress } from '../progress';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const prefix = 'hy';
export interface UploadListProps {
  fileList: UploadFile[];
  strokeWidth: number;
  onRemove?: (file: UploadFile) => void;
}

const UploadList: React.FC<UploadListProps> = (props) => {
  const { fileList, strokeWidth, onRemove } = props;

  const getFileStatusIcon = (
    file: UploadFile
  ): { icon: IconProp; theme: ThemeProps } => {
    const { status = 'success' } = file;
    const maps = [
      { icon: 'spinner', theme: 'primary', status: 'ready' },
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
        const { status = 'success', percentage = 0, uid, name } = file;
        const { icon, theme } = getFileStatusIcon(file);
        return (
          <li className={`${prefix}-upload__li`} key={uid}>
            <div className={`${prefix}-upload__lin`}>
              <span
                className={`${prefix}-file--${status} ${prefix}-file__name `}
              >
                <Icon
                  className={`${prefix}-file__icon`}
                  theme="secondary"
                  icon="file-alt"
                />
                {name}
              </span>
              <span className={`${prefix}-file__status`}>
                <Icon
                  className={`${prefix}-file__ri`}
                  spin={status === 'uploading'}
                  theme={theme}
                  icon={icon}
                ></Icon>
                <Icon
                  className={`${prefix}-file__ri--hover`}
                  icon="times"
                  onClick={() => onRemove && onRemove(file)}
                ></Icon>
              </span>
            </div>
            {status === 'uploading' && (
              <Progress
                className={`${prefix}-upload__progress`}
                percentage={percentage}
                showText={false}
                strokeWidth={strokeWidth}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export { UploadList };
