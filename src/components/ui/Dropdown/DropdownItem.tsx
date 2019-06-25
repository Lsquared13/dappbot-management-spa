import * as React from "react";
import { StyledDropdownItem } from "./StyledDropdown";

export interface DropdownItemProps {
  /**
   * string, link to navigate on item click
   * @default #
   **/
  link?: string;
  /**
   * func, onClick event
   **/
  onClick?: () => void;

  key?: number;  
}

export const DropdownItem: React.SFC<DropdownItemProps> = props => {
  const { children, link, onClick ,key} = props;

  return (
    <StyledDropdownItem key={key}>
      {link ? (
        <a href={link ? link : ""} onClick={onClick}>
          {children}
        </a>
      ) : (
        <a onClick={onClick}>{children}</a>
      )}
    </StyledDropdownItem>
  );
};

DropdownItem.defaultProps = {};

export default DropdownItem;
