import * as React from "react";
import classnames from "classnames";

import { StyledTabButton } from "./StyledTabButtons";

const noop = () => {};

//Tab button props
export interface TabButtonProps {
  /**
   * func, Event --> called on button click
   **/
  onClick?: (event?: React.MouseEvent<HTMLElement>) => void;
  /**
   * string, class to apply on component
   **/
  className?: string;
  /**
   * boolean, disabled button
   * @default false
   **/
  disabled?: boolean;
  /**
   * boolean, if button is currently selected or not
   * @default false
   **/
  selected?: boolean;
}

//TabButton component
export const TabButton: React.SFC<TabButtonProps> = props => {
  const { onClick, children, className, disabled, selected } = props;
  const classes = classnames("tab-button", { selected }, className);
  return (
    <StyledTabButton
      onClick={disabled ? noop : onClick}
      className={classes}
      disabled={disabled}
    >
      {children}
    </StyledTabButton>
  );
};

export default TabButton;
