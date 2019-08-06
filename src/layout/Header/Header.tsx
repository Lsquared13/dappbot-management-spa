import * as React from "react";
import { Box, Icon, Tabs,Text, Dropdown, DropdownItem, DropdownTrigger, DropdownContent } from "../../components/ui";
import StyledHeader from "./StyledHeader";
import { ReactComponent as AvatarImage } from "../../assets/images/avatar.svg";

import { ReactComponent as Logo } from "../../assets/images/Dapp_Logo.svg";
import {UserResponseData, defaultUserResponse, UserSetter} from '../../types'
import { navigate } from "@reach/router";

export interface HeaderProps {
  uri: any;
  user?: UserResponseData
  setUser: UserSetter
}

export interface HeaderState {
  activeIndex: any;
  displayEmail: string;
}

export class Header extends React.Component<HeaderProps, HeaderState> {
  placeholderEmail = 'demo@dapp.bot';

  constructor(props: any) {
    super(props);

    let user = this.props.user;
    this.state = {
      displayEmail: user && user.User && user.User.Email ? user.User.Email : this.placeholderEmail,
      activeIndex: ['/home/', '/home'].includes(this.props.uri) ? 0 : 1
    };
    
  }

  logOut = () => {
    const newUser = defaultUserResponse()
    this.props.setUser(newUser)
  }

  handleChange = ({ activeTabIndex, event }: any) => {
    event.preventDefault();
    this.setState(
      {
        activeIndex: activeTabIndex
      },
      () => {
        if (this.state.activeIndex === 0) {
          return navigate(`/home`);
        } else {
          return navigate(`/home/user-settings`);
        }
      }
    );

    // <Link/>
  };

  render() {
    let email = this.state.displayEmail;
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
            activeTabIndex={this.state.activeIndex}
            onChange={this.handleChange}
          />
        </Box>

        {/* LOGOUT  */}
        <Box display="flex" alignItems="center">
          <Box display="inlineBlock">
            <Box display="inlineBlock" paddingX={5}>
              <Dropdown>
                <DropdownTrigger>
                  <AvatarImage/>
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
                  <DropdownItem onClick={this.logOut} link='/login'>
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
}

export default Header;
