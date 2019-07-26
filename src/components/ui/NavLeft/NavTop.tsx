import * as React from 'react';
import classnames from 'classnames';
import './NavTop.css';

export interface Props {
  /**
   * string, custom class prefix for css
   * @default top-navbar
   **/
  customClass?: string;
  /**
   * string, class to apply on component
   **/
  className?: string;
}

export const NavTop: React.SFC<Props> = (props) => {
  const { customClass, children, className } = props;
  const classes = classnames(customClass, className);
  return (
    <div className={classes}>{children ? children : null}</div>
  );
}

NavTop.defaultProps = {
  customClass: 'top-navbar'
}

export default NavTop;

