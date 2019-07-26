import * as React from "react";
import Box from "../Box";
import SearchField from "../SearchField";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem
} from "../Dropdown";

export interface TopPanelProps {
  onToogleLogin: ()=>void;
  onToggleSignup: ()=>void;
}

export const TopPanel: React.SFC<TopPanelProps> = props => {
  return (
    <Box display="flex" width={"100%"} justifyContent="end" alignItems="center">
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box marginLeft={2}>
          <SearchField
            value=""
            placeholder="Search"
            id="search"
            onChange={() => {}}
            accessibilityLabel="search"
          />
        </Box>
        <Box marginLeft={2}>
          <Dropdown>
            <DropdownTrigger>
              <img src="https://image.ibb.co/nrJMWU/notification_bell.png" />
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem link="/profile">Profile</DropdownItem>
              <DropdownItem link="/favorites">Favorites</DropdownItem>
              <DropdownItem link="/logout">Log Out</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </Box>
        <Box marginLeft={2}>
          <Dropdown>
            <DropdownTrigger>
              <img src="https://image.ibb.co/eJqyRK/profile.png" />
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem link="#" onClick={props.onToogleLogin}>Sign In</DropdownItem>
              <DropdownItem link="#" onClick={props.onToggleSignup}>SignUp</DropdownItem>
              <DropdownItem link="/logout">Log Out</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </Box>
      </Box>
    </Box>
  );
};

TopPanel.displayName = "TopPanel";

export default TopPanel;
