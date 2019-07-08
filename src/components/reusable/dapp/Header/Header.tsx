import * as React from "react";
import { Avatar, Box, Icon, Tabs, Text, Link } from "../../ui";
import StyledHeader from "./StyledHeader";

import { ReactComponent as Logo } from "./../../../../images/Dapp_Logo.svg";
import { ReactComponent as MoreIcon } from "./../../../../images/more.svg";

import { navigate } from "@reach/router";
export interface HeaderProps {
  uri: any;
}

export interface HeaderState {
  activeIndex: any;
}

export class Header extends React.Component<HeaderProps, HeaderState> {
  state: HeaderState = {
    activeIndex:
      this.props.uri === "/home/" || this.props.uri === "/home" ? 0 : 1
  };

  handleChange = ({ activeTabIndex, event }: any) => {
    event.preventDefault();
    console.log(this.state.activeIndex);
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
        <Box display="flex" alignItems="center">
          <Box display="inlineBlock">
            <Avatar name="Juan" size="sm" />
          </Box>
          <Box display="inlineBlock" paddingX={4}>
            {/* <Icon icon="more" /> */}
            <MoreIcon />
          </Box>
        </Box>
      </StyledHeader>
    );
  }
}

export default Header;
