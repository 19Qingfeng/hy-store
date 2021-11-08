import React, { useState } from 'react';
import useFixed from './hooks/use-fixed';

// TODO: 新手引导 先实现基础功能

export interface GuideProps {
  /**
   * 步骤
   */
  step: StepObject[];
  /**
   * 是否需要遮罩
   */
  mask?: boolean;
}

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
  const { mask = true, step } = props;

  // 当前是第几步了
  const [stepIndex, setStepIndex] = useState<number>(0);
  // 定位当前步骤信息
  useFixed(step[stepIndex]);

  return <>{mask && <svg>{/* 这里有一个镂空的path */}</svg>}</>;
};

Guide.defaultProps = {
  mask: true,
};

export { Guide };
