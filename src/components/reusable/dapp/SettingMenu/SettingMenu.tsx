import * as React from "react";
import { Container } from "../Container";
import { StyledTab } from "./StyledMenu";
import {
  Box,
  Divider,
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  Text,
  TextProps
} from "../../ui";

const Typo: React.SFC<TextProps> = props => (
  <Text inline size="sm" smSize="sm" mdSize="sm" lgSize="sm" {...props}>
    {props.children}
  </Text>
);

export type SettingMenuTabs = "status" | "settings";

export interface SettingMenuProps {
  dappName: string;
  defaultTab?: SettingMenuTabs;
  settingOptions?: {
    title: React.ReactNode;
    onClick: () => void;
  }[];
  onTabChange?: (tab: SettingMenuTabs) => void;
}

export interface SettingMenuState {
  selectedTab: SettingMenuTabs;
}

export class SettingMenu extends React.Component<
  SettingMenuProps,
  SettingMenuState
> {
  state = {
    selectedTab: this.props.defaultTab ? this.props.defaultTab : "status"
  };
  _onTabChange = () => {};
  render() {
    let { dappName, onTabChange, settingOptions = [] } = this.props;
    let { selectedTab } = this.state;
    console.log(settingOptions);
    return (
      <Box>
        <Container>
          <Box
            display="flex"
            justifyContent="between"
            alignItems="center"
            padding={5}
          >
            <Text bold size="xl" smSize="xl" mdSize="xl" lgSize="xl">
              {dappName}
            </Text>
            <Box>
              <StyledTab
                selected={selectedTab === "status"}
                onClick={() => {
                  onTabChange && onTabChange("status");
                }}
              >
                Status
              </StyledTab>
              <Dropdown>
                <DropdownTrigger>
                  <StyledTab selected={selectedTab === "settings"}>
                    Settings
                  </StyledTab>
                </DropdownTrigger>
                <DropdownContent>
                  {settingOptions.map(option => (
                    <DropdownItem onClick={option.onClick}>
                      <Typo>{option.title}</Typo>
                    </DropdownItem>
                  ))}
                </DropdownContent>
              </Dropdown>
            </Box>
          </Box>
        </Container>
        <Divider type="secondary" />
      </Box>
    );
  }
}

// export const SettingMenu: React.SFC<SettingMenuProps> = props => (
// <Box>
//   <Container>
//     <Box
//       display="flex"
//       justifyContent="between"
//       alignItems="center"
//       padding={5}
//     >
//       <Text bold size="xl" smSize="xl" mdSize="xl" lgSize="xl">
//         {props.dappName}
//       </Text>
//       <Box>
//         <Dropdown>
//           <DropdownTrigger>Status</DropdownTrigger>
//           <DropdownContent>
//             <DropdownItem>
//               <Typo>General Settings</Typo>
//             </DropdownItem>
//             <DropdownItem>
//               <Typo>Customizations</Typo>
//             </DropdownItem>
//             <DropdownItem>
//               <Typo>Version Control</Typo>
//             </DropdownItem>
//             <DropdownItem>
//               <Typo>Team Access</Typo>
//             </DropdownItem>
//             <DropdownItem>
//               <Typo>Dapp Deletion</Typo>
//             </DropdownItem>
//           </DropdownContent>
//         </Dropdown>
//         <Dropdown>
//           <DropdownTrigger>Settings</DropdownTrigger>
//           <DropdownContent>
//             <DropdownItem>
//               <Typo>General Settings</Typo>
//             </DropdownItem>
//             <DropdownItem>
//               <Typo>Customizations</Typo>
//             </DropdownItem>
//             <DropdownItem>
//               <Typo>Version Control</Typo>
//             </DropdownItem>
//             <DropdownItem>
//               <Typo>Team Access</Typo>
//             </DropdownItem>
//             <DropdownItem>
//               <Typo>Dapp Deletion</Typo>
//             </DropdownItem>
//           </DropdownContent>
//         </Dropdown>
//       </Box>
//     </Box>
//   </Container>
//   <Divider type="secondary" />
// </Box>
// );
export default SettingMenu;
