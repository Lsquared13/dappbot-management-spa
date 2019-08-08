import * as React from "react";
import { Link } from '@reach/router';
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
  let itemBody = <a onClick={onClick}>{children}</a>;
  if (link) {
    // If this is a local link within our site, then we want
    // to use a proper Link element to prevent a page reload.
    itemBody = link.charAt(0) === '/' ? (
      <Link to={link} onClick={onClick}>{children}</Link>
    ) : (
      <a href={link} onClick={onClick}>{children}</a>
    )
  }
  return (
    <StyledDropdownItem key={key}>
      {itemBody}
    </StyledDropdownItem>
  );
};

DropdownItem.defaultProps = {};

export default DropdownItem;
