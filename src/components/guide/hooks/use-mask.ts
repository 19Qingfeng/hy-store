import { useLayoutEffect, useState } from 'react';
import { StepObject } from '../guide';

// TODO: 做刷新时候window.onload的Css加载hack
function useMask(step: StepObject, mask?: boolean) {
  const [path, setPath] = useState<string>('');
  const [screenSize, setScreenSize] = useState({
    height: 0,
    width: 0,
  });

  // 保证hooks运行规则
  useLayoutEffect(() => {
    strokeSvgPath();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mask) {
    return {
      path,
    };
  }
  const $$ = document.getElementById.bind(document);
  const { id, hightLightExtend } = step;

  // 绘制svg path
  function strokeSvgPath() {
    if (!mask) {
      return;
    }
    const element = $$(id);
    if (!element) {
      throw new Error(`${id} not Find, please checked id named ${id} element!`);
    }
    // 绘制页面遮罩
    strokeMask();
    // 反向绘制target元素
    strokeTarget();
    // 绘制额外的展开元素
    strokeExtendNode();
  }

  // 绘制当前元素
  function strokeTarget() {
    const targetPath = getPathById(id);
    setPath((path) => {
      return path + `\n${targetPath}`;
    });
  }

  // 绘制额外的元素
  function strokeExtendNode() {
    hightLightExtend?.forEach((id) => {
      const extendPath = getPathById(id);
      setPath((path) => {
        return `${path}\n${extendPath}`;
      });
    });
  }

  // 绘制页面遮罩
  function strokeMask() {
    const height = document.body.clientHeight;
    const width = document.body.clientWidth;
    setScreenSize({
      height,
      width,
    });
    setPath(`M0 0 L${width} 0 L${width} ${height} L0 ${height} Z`);
  }

  // 通过元素ID获得元素svg的path
  function getPathById(id: string) {
    const element = $$(id);
    if (element) {
      // TODO:这里计算了一次 看看可以优 fixed也计算了一次 看看可以优化嘛
      const position = element.getBoundingClientRect();
      return getPathByPosition(position);
    }
    return '';
  }

  // 通过元素位置绘制反向路径
  function getPathByPosition(position: DOMRect) {
    const { width, height, top, left } = position;
    const path = `
      M ${left} ${top}
      L ${left} ${top + height}
      L ${left + width} ${top + height}
      L ${left + width} ${top}
      Z
    `;
    return path;
  }

  return {
    screenSize,
    path,
  };
}

export default useMask;
