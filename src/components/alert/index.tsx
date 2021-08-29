import React from 'react';
import classNames from 'classnames';

type AlertType = 'success' | 'info' | 'warning' | 'error';

interface AlertProps {
  /** Content of Alert */
  message: React.ReactNode; // 消息提示内容
  className?: string;
  /** Type of Alert styles, options:`success`, `info`, `warning`, `error` */
  type?: AlertType; // 类型
}

const prefix = 'hy';

const Alert: React.FC<AlertProps> = (props) => {
  const { className, type = 'info' } = props;
  const classes = classNames(
    `${prefix}-alert`,
    {
      [`${prefix}-alert--${type}`]: type,
    },
    className
  );
  return <div className={classes}>{props.message}</div>;
};

export default Alert;
