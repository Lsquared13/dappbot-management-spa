import * as React from "react";
import Box from "../Box";
import { IAddress } from "../AddressSwitcher";
import NavLeft, { NavLeftMenuItem } from "./NavLeft";

export interface LeftSidebarProps {
  /**
   * boolean, disable nav links.
   **/
  addresses: IAddress[];
  /**
   * string, address switcher title.
   **/
  addressTitle: string;
  /**
   * string, show link with particular key selected
   **/
  menuItems: NavLeftMenuItem[];
  /**
   * string, title.
   **/
  title: string;
  children?: any;
}

export const LeftSidebar: React.SFC<LeftSidebarProps> = props => {
  return (
    <Box
      color="lightGray"
      dangerouslySetInlineStyle={{
        __style: {
          height: "100vh"
        }
      }}
      display="flex"
      direction="column"
    >
      <NavLeft {...props} />
    </Box>
  );
};

LeftSidebar.displayName = "LeftSidebar";

export default LeftSidebar;
