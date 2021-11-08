import React, { useState } from 'react';
import useMask from './hooks/use-mask';

const prefix = 'hy-guide';

// TODO: 新手引导 先实现基础功能
export interface GuideProps {
  /**
   * 步骤
   */
  step: StepObject[];
  /**
   * 遮罩相关配置
   */
  mask?: boolean;
  maskConfig?: MaskConfig;
}

export type MaskConfig = {
  color?: string;
};

export interface StepObject {
  /**
   * 对应元素ID
   */
  id: string;
  /**
   * 弹窗位置 上/右/下/左
   */
  dialogLocation?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * 额外高亮元素
   */
  hightLightExtend?: string[];
  /**
   * 自定义弹窗元素
   */
  customDialog?: React.ReactNode;
}

const Guide: React.FC<GuideProps> = (props) => {
  const { mask = true, maskConfig, step } = props;

  let maskColor = 'rgba(0,0,0,.7)';
  if (maskConfig && maskConfig.color) {
    maskColor = maskConfig.color;
  }
  // 当前是第几步了
  const [stepIndex] = useState<number>(0);
  // 绘制遮罩层
  const { path, screenSize } = useMask(step[stepIndex], mask);
  // 定位当前步骤信息

  return (
    <>
      {mask && (
        <svg
          width={screenSize?.width}
          height={screenSize?.height}
          fill={maskColor}
          className={`${prefix}__mask`}
        >
          <path d={path}></path>
        </svg>
      )}
    </>
  );
};

Guide.defaultProps = {
  mask: true,
};

export { Guide };
