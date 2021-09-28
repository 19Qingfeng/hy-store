import React, { FC } from "react";
/**
 * 响应式渐进式再实现
 * 珊格布局实现原理 通过flex: 0 0 span/24; 去计算
 * 同样 通过传入{ xs: 8, sm: 16, md: 24, lg: 32 } 响应式去计算不同屏幕下的格子间距
 * xs={2} sm={4} md={6} lg={8} xl={10} 响应式去计算不同屏幕下占格子个数
 */
declare type JustifyType = "center" | "start" | "end";
export interface RowProps {
    /**
     * 类名
     */
    className?: string;
    /**
     * 渲染HtmlELEMENTTag类型
     */
    tag?: string;
    /**
     * 横向对其方式
     */
    justify?: JustifyType;
    /**
     * 列与列之间的间隙
     */
    gap?: number;
    /**
     * 样式内容
     */
    style?: React.CSSProperties;
}
export interface RowContextProps {
    gap?: number;
}
export declare const RowContext: React.Context<RowContextProps>;
/**
 * Grid布局系统
 */
declare const Row: FC<RowProps>;
export { Row };
