import {
  createContext,
  Provider,
  FC,
  Children,
  FunctionComponentElement,
  CSSProperties,
  ReactElement,
} from "react";
import { ColProps } from "../column";
import classNames from "classnames";

export interface RowProps {
  className?: string;
  gap?: number; // 列与列之间的间隙
  style?: CSSProperties;
}

export interface RowContext {
  gap?: number;
}

export const RowContext = createContext<RowContext>({
  gap: 0,
});

const prefix = "hy";

const Row: FC<RowProps> = (props) => {
  const { className, style, gap = 0, children } = props;

  const classes = classNames(`${prefix}-row`, className);

  const provideContext: RowContext = {
    gap,
  };

  const renderChildren = () => {
    return Children.map(children, (child) => {
      const childElement = child as FunctionComponentElement<ColProps>;
      if (
        typeof child === "object" &&
        childElement.type.displayName === "Col"
      ) {
        return children;
      } else {
        console.warn(`Row children must be a ColItem`);
      }
      return childElement;
    });
  };

  return (
    <RowContext.Provider value={provideContext}>
      <div className={classes} style={style}>
        {renderChildren()}
      </div>
    </RowContext.Provider>
  );
};

export default Row;
