import * as React from "react";
import { StyledDropdownContent } from "./StyledDropdown";

export interface DropdownContentProps {}

export const DropdownContent: React.SFC<DropdownContentProps> = props => {
  const { children } = props;

  return (
    <StyledDropdownContent>
      <ul>{children}</ul>
    </StyledDropdownContent>
  );
};

export default DropdownContent;
