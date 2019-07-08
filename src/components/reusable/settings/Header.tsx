import React, { FC } from "react";
import { Box, Tabs, Text } from "../ui";
import { Container } from "../dapp";

const Title: FC = props => (
  <Text
    bold
    size="lg"
    smSize="lg"
    mdSize="lg"
    lgSize="lg"
    textTransform="capitalize"
  >
    {props.children}
  </Text>
);

const Content: FC = props => (
  <Text size="sm" smSize="sm" mdSize="sm" lgSize="sm">
    {props.children}
  </Text>
);

export interface HeaderProps {
  activeIndex: number;
  onHandle: ({ activeTabIndex, event }: any) => any;
}

export interface HeaderState {
  activeIndex: number;
}

export class SettingHeader extends React.Component<HeaderProps, HeaderState> {
  state = {
    activeIndex: 0
  };
  render() {
    const { activeIndex, onHandle } = this.props;
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="between"
          alignItems="center"
          paddingX={5}
        >
          <Title>Settings</Title>
          <Box>
            <Tabs
              tabs={[
                {
                  content: <Content>Profile</Content>,
                  href: "#"
                },
                {
                  content: <Content>Password</Content>,
                  href: ""
                },
                {
                  content: <Content>Billing</Content>,
                  href: ""
                }
              ]}
              activeTabIndex={activeIndex}
              onChange={(e: any) => onHandle(e)}
            />
          </Box>
        </Box>
      </Container>
    );
  }
}

export default SettingHeader;
