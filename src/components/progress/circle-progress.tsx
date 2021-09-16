import React from "react";
import { ProgressProps } from ".";

const prefix = "hy";

export interface CircleProps
  extends Omit<ProgressProps, "className" | "style" | "circle" | "theme"> {}

const CircleProgress: React.FC<CircleProps> = (props) => {
  const {
    percentage,
    progressColor = "#20a0ff",
    baseColor = "#e5e9f2",
    strokeWidth = 2,
    showText,
  } = props;
  // 使用svg 的 dasharray和dashoffset
  const circlePerimeter = Math.PI * 2 * 30;
  const dashArray = `${circlePerimeter}`;
  const dashOffset = `${((100 - percentage) / 100) * circlePerimeter}`;

  return (
    <div className={`${prefix}-progress-circle`}>
      <span className={`${prefix}-progress-circle__text`}>
        {showText && `${percentage}%`}
      </span>
      <svg viewBox="0 0 100 100" className={`${prefix}-progress-circle__svg`}>
        <circle
          cx="50"
          cy="50"
          r="30"
          strokeWidth={strokeWidth}
          stroke={baseColor}
          className={`${prefix}-progress-circle__path`}
        ></circle>
        <circle
          cx="50"
          cy="50"
          r="30"
          strokeWidth={strokeWidth}
          stroke={progressColor}
          strokeDasharray={dashArray}
          strokeLinecap="round"
          strokeDashoffset={dashOffset}
          className={`${prefix}-progress-circle__track`}
        ></circle>
      </svg>
    </div>
  );
};

export { CircleProgress };

CircleProgress.defaultProps = {
  progressColor: '"#20a0ff"',
  baseColor: "#e5e9fw",
};
