import React from "react";
import classNames from "classnames";
import { CircleProgress } from "./circle-progress";
import { ThemeProps } from "../icon";

// TODO: Progress test case
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
  /**
   * 外层圆颜色,仅在圆形进度条有效
   */
  progressColor?: string;
  /**
   * 内层圆颜色,仅在圆形进度条有效
   */
  baseColor?: string;
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
    progressColor = "#20a0ff",
    baseColor = "#e5e9f2",
  } = props;

  let progressHeight: number = strokeWidth;
  if (strokeWidth && strokeWidth < 12) {
    progressHeight = 12;
    console.warn(
      `The width property of the progress bar must be greater than 12`
    );
  }
  const classes = classNames(
    `${nameSpace}-progress`,
    {
      "el-progress--circle": circle,
    },
    className
  );

  return (
    <div className={classes}>
      {circle ? (
        <CircleProgress
          baseColor={baseColor}
          progressColor={progressColor}
          showText={showText}
          percentage={percentage}
        />
      ) : (
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
      )}
    </div>
  );
};

Progress.defaultProps = {
  circle: false,
  showText: true,
  strokeWidth: 15,
  theme: "primary",
  progressColor: '"#20a0ff"',
  baseColor: "#e5e9fw",
};

export { Progress };
