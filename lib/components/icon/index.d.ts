import React from 'react';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
export * from '@fortawesome/fontawesome-svg-core';
export declare type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';
export interface IconProps extends FontAwesomeIconProps {
    /**
     * fortawesome 图标定义
     */
    icon: IconProp;
    /**
     * 字体主题
     * */
    theme?: ThemeProps;
}
declare const Icon: React.FC<IconProps>;
export { Icon };
