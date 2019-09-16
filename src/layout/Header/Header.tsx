import React, { FC, useState, useEffect } from "react";
import { Box, Icon, Tabs, Text, Dropdown, DropdownItem, DropdownTrigger, DropdownContent, TabChangeData } from "../../components/ui";
import StyledHeader from "./StyledHeader";
import { ReactComponent as AvatarImage } from "../../assets/images/avatar.svg";

import { ReactComponent as Logo } from "../../assets/images/Dapp_Logo.svg";
import { WindowLocation } from "@reach/router";
import User from "@eximchain/dappbot-types/spec/user";

export interface HeaderProps {
  location?: WindowLocation
  user: User.AuthData
  logOut: () => void
  goToSettings: () => void
  goToHome: () => void
}

export interface HeaderState {
  displayEmail: string;
}

export const Header: FC<HeaderProps> = ({
  user, logOut, goToHome, goToSettings, location
}) => {

  // Save email for usage on logout
  const userEmail = user.User.Email;
  const [email, saveEmail] = useState('demo@dapp.bot');
  useEffect(function saveEmailBeforeEmptying() {
    if (userEmail !== '' && userEmail !== email) saveEmail(userEmail);
  }, [userEmail, email, saveEmail])

  // Manage which tab ought to be active
  let path = location && location.pathname;
  let activeIndex = path && path.indexOf('user-settings') !== -1 ?
    1 : 0;

  // Trigger navigation on tab click
  function handleTabClick({ activeTabIndex, event }: TabChangeData) {
    if (activeTabIndex === 0) {
      goToHome()
    } else { 
      goToSettings() 
    }
  }

  return (
    <StyledHeader>
      <Box paddingX={12}>
        <Logo />
      </Box>
      <Box flex="grow">
        <Tabs
          tabs={[
            {
              content: (
                <Text size="sm" smSize="sm" mdSize="sm" lgSize="sm">
                  <Box display="inlineBlock" marginRight={3}>
                    <Icon icon="keyboard-left" />
                    <Icon icon="keyboard-right" />
                  </Box>
                  Dapps
                  </Text>
              ),
              href: "#"
            },
            {
              content: (
                <Text size="sm" smSize="sm" mdSize="sm" lgSize="sm">
                  <Box display="inlineBlock" marginRight={3}>
                    <Icon icon="settings" />
                  </Box>
                  Settings
                  </Text>
              ),
              href: "#"
            }
          ]}
          activeTabIndex={activeIndex}
          onChange={handleTabClick}
        />
      </Box>

      {/* LOGOUT  */}
      <Box display="flex" alignItems="center">
        <Box display="inlineBlock">
          <Box display="inlineBlock" paddingX={5}>
            <Dropdown>
              <DropdownTrigger>
                <AvatarImage />
              </DropdownTrigger>
              <DropdownContent>
                <Text align="center" color="blue" className="pt-2 pb-2 ml-3 mr-3">
                  {email}
                </Text>
                <DropdownItem link="/home/user-settings">
                  Settings
                </DropdownItem>
                <DropdownItem link="https://dappbot.drift.help/category/getting-started/">
                  Support
                </DropdownItem>
                <DropdownItem onClick={logOut} link='/login'>
                  Sign Out
                </DropdownItem>
              </DropdownContent>
            </Dropdown>
          </Box>
        </Box>
      </Box>

    </StyledHeader>
  );
}

export default Header;
