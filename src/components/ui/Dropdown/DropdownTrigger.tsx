import * as React from "react";
import classnames from "classnames";
import Icon from "./../Icon";
import { StyledDropdownTrigger } from "./StyledDropdown";

export interface DropdownTriggerProps {
  disabled?: boolean;
  onClick?: () => void;
  active?: boolean;
}

export const DropdownTrigger: React.SFC<DropdownTriggerProps> = props => {
  const { children, disabled, onClick, active } = props;
  return (
    <StyledDropdownTrigger
      onClick={onClick}
      className={classnames({ disabled, active })}
    >
      {children}
    </StyledDropdownTrigger>
  );
};

export default DropdownTrigger;
