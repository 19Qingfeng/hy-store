import { FC, CSSProperties } from "react";

export interface ColProps {
  span?: number;
  className?: string;
  style?: CSSProperties;
}

const Col: FC<ColProps> = (props) => {
  const { span, className = "", style = {} } = props;
  return <span>{props.children}</span>;
};

Col.displayName = "Col";

export default Col;
