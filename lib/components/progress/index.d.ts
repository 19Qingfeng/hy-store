import React from "react";
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
    /**
     * 外层圆颜色,仅在圆形进度条有效
     */
    progressColor?: string;
    /**
     * 内层圆颜色,仅在圆形进度条有效
     */
    baseColor?: string;
}
declare const Progress: React.FC<ProgressProps>;
export { Progress };
