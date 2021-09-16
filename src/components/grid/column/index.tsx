import React from "react";
import classNames from "classnames";
import { useContext, FC, CSSProperties } from "react";
import { RowContext } from "../row";

const prefix = "hy";

export interface ColProps {
  /**
   * 占用列个数，一行最大24
   */
  span?: number;
  /**
   * class名
   */
  className?: string;
  /**
   * 样式内容
   */
  style?: CSSProperties;
  /**
   * 左偏移个数，左边留白。 margin百分比实现间距 margin百分之针对于父元素宽度
   */
  offset?: number;
  /**
   * 响应式布局参数，768<px
   */
  xs?: number;
  /**
   * 响应式布局参数，>768px
   */
  sm?: number;
  /**
   * 响应式布局参数，>992px
   */
  md?: number;
  /**
   * 响应式布局参数，>1200px
   */
  lg?: number;
  /**
   * 响应式布局参数，>1920px
   */
  xl?: number;
}

const Col: FC<ColProps> = (props) => {
  const { span, className = "", offset = 0, style = {} } = props;
  const { gap } = useContext(RowContext);

  const allSizes = ["xs", "sm", "md", "lg", "xl"] as const;
  // 响应式相关 使用css相关媒体查询实现对应不同宽度
  let mediaClassList = {} as { [className: string]: number | undefined };
  allSizes.forEach((size) => {
    const count = props[size];
    mediaClassList[`${prefix}-col-${size}-${count}`] = count;
  });

  console.log(mediaClassList, "mediaClassList");

  const mergeStyle: React.CSSProperties = {};
  // 计算元素padding
  if (gap && gap > 0) {
    const singleGap = gap / 2;
    mergeStyle.paddingLeft = `${singleGap}px`;
    mergeStyle.paddingRight = mergeStyle.paddingLeft;
  }

  const classes = classNames(
    `${prefix}-col`,
    {
      [`${prefix}-col-${span}`]: span !== undefined,
      [`${prefix}-col-offset--${offset}`]: offset,
      ...mediaClassList,
    },
    className
  );

  return (
    <span className={classes} style={{ ...mergeStyle, ...style }}>
      {props.children}
    </span>
  );
};

Col.displayName = "Col";

export { Col };
