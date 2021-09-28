import { FC, CSSProperties } from "react";
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
declare const Col: FC<ColProps>;
export { Col };
