import React, { createContext, FC, FunctionComponentElement } from "react";
import { ColProps } from "../column";
import classNames from "classnames";

/**
 * 响应式渐进式再实现
 * 珊格布局实现原理 通过flex: 0 0 span/24; 去计算
 * 同样 通过传入{ xs: 8, sm: 16, md: 24, lg: 32 } 响应式去计算不同屏幕下的格子间距
 * xs={2} sm={4} md={6} lg={8} xl={10} 响应式去计算不同屏幕下占格子个数
 */

type JustifyType = "center" | "start" | "end";

export interface RowProps {
  className?: string;
  tag?: string;
  justify?: JustifyType;
  gap?: number; // 列与列之间的间隙
  style?: React.CSSProperties;
}

export interface RowContext {
  gap?: number;
}

export const RowContext = createContext<RowContext>({
  gap: 0,
});

const prefix = "hy";

const Row: FC<RowProps> = (props) => {
  const { className, style, gap = 0, tag = "div", justify, children } = props;

  const classes = classNames(
    `${prefix}-row`,
    {
      [`is-${justify}`]: justify,
    },
    className
  );

  const provideContext: RowContext = {
    gap,
  };

  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      const childElement = child as FunctionComponentElement<ColProps>;
      if (
        typeof child === "object" &&
        childElement.type.displayName === "Col"
      ) {
        return child;
      } else {
        console.warn(`Row children must be a ColItem`);
        return null;
      }
    });
  };

  const mergeStyle: React.CSSProperties = {};
  if (gap && gap > 0) {
    mergeStyle.marginLeft = `${0 - gap / 2}px`;
    mergeStyle.marginRight = mergeStyle.marginLeft;
  }

  return (
    <RowContext.Provider value={provideContext}>
      {React.createElement(
        tag,
        {
          className: classes,
          style: { ...mergeStyle, ...style },
        },
        renderChildren()
      )}
    </RowContext.Provider>
  );
};

export default Row;
