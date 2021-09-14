import React from "react";
import classNames from "classnames";
import { ThemeProps } from "../icon";

export interface ProgressProps {
  /**
   * 进度条百分比
   */
  percentage: number;
  /**
   * 主题
   */
  theme?: ThemeProps;
  /**
   * 进度条高度
   */
  strokeWidth?: number;
  /**
   * 是否展示圆形进度条
   */
  circle?: boolean;
  /**
   * 是否显示百分比文字
   */
  showText?: boolean;
  /**
   * 类名
   */
  className?: string;
  /**
   * css属性
   */
  style?: React.CSSProperties;
}

const nameSpace = "hy";

const Progress: React.FC<ProgressProps> = (props) => {
  const {
    percentage,
    theme,
    strokeWidth = 15,
    circle,
    showText,
    className,
    style,
  } = props;

  let progressHeight: number = strokeWidth;
  if (strokeWidth && strokeWidth < 12) {
    progressHeight = 12;
    console.warn(
      `The width property of the progress bar must be greater than 12`
    );
  }
  const classes = classNames(`${nameSpace}-progress`, className);

  return (
    <div className={classes}>
      <div
        className={`${nameSpace}-progress__wrapper`}
        style={{ height: progressHeight + "px", ...style }}
      >
        <div
          className={`${nameSpace}-progress__inner ${nameSpace}-progress__inner--${theme}`}
          style={{ width: percentage + "%", height: strokeWidth + "px" }}
        >
          <span className={`${nameSpace}-progress__text`}>
            {" "}
            {showText && `${percentage}%`}
          </span>
        </div>
      </div>
    </div>
  );
};

Progress.defaultProps = {
  circle: false,
  showText: false,
  strokeWidth: 15,
  theme: "primary",
};

export { Progress };
