import * as React from "react";
import { Avatar, Box, Icon, Tabs,Text, Link } from "../../components/ui";
import StyledHeader from "./StyledHeader";

import { ReactComponent as Logo } from "../../images/Dapp_Logo.svg";
import { ReactComponent as MoreIcon } from "../../images/more.svg";

import { navigate } from "@reach/router";

export interface HeaderProps {
  uri: any;
  user?: any
  setUser: (newUser:any)=>void
}

export interface HeaderState {
  activeIndex: any;
}

export class Header extends React.Component<HeaderProps, HeaderState> {

  constructor(props: any) {
    super(props);

    this.state = {
      activeIndex:
        this.props.uri === "/home/" || this.props.uri === "/home" ? 0 : 1
    };
    

  
  }
  

  // logOut() {
  //   let newUser = Object.assign(this.props.user, { signInUserSession : null })
  //   this.props.setUser(newUser);
  // }
  logOut = () => {
    let newUser = Object.assign(this.props.user, { signInUserSession : null })
    this.props.setUser(newUser);
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
          return navigate(`/home/denied`);
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
        {/* LOGOUT  */}
        <Box display="flex" alignItems="center">
          <Box display="inlineBlock">
            <Box display="inlineBlock" paddingX={5}>
            <Link  onClick={this.logOut} href='/login'>
              <Avatar src="https://img.icons8.com/flat_round/384/shutdown.png" name="Juan" size="md" />
        
            </Link>
              
            </Box>
          </Box>
          
        </Box>
      </StyledHeader>
    );
  }
}

export default Header;
