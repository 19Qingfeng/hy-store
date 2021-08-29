import React from 'react';
import classNames from 'classnames';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';

library.add(fas);

export type ThemeProps =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'light'
  | 'dark';

export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps;
}

const prefix = 'hy';

const Icon: React.FC<IconProps> = (props) => {
  const { className, theme, ...rest } = props;
  const classes = classNames(
    {
      [`${prefix}-icon--${theme}`]: theme,
    },
    className
  );
  return <FontAwesomeIcon className={classes} {...rest} />;
};

Icon.defaultProps = {
  theme: 'secondary',
};

export default Icon;
