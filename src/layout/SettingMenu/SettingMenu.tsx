import * as React from "react";
import { Container } from "./../Container";
import { StyledTab } from "./StyledMenu";
import { Box, Divider, Text } from "../../components/ui";


export type SettingMenuTabs = "status" | "settings";

export interface SettingMenuProps {
  dappName: string;
  defaultTab?: SettingMenuTabs;
  settingOptions?: {
    title: React.ReactNode;
    onClick: () => void;
  }[];
  onTabChange?: (dappName:string) => void;
  building:boolean;
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
    let { dappName, onTabChange, settingOptions = [], building } = this.props;
    let { selectedTab } = this.state;
    return (
      <Box>
        <Container>
          <Box
            display="flex"
            justifyContent="between"
            alignItems="center"
          >
            <Box marginBottom={5} marginTop={5}>
              <Text bold size="xl" smSize="xl" mdSize="xl" lgSize="xl">
                {dappName}
              </Text>
            </Box>
            <Box display="flex" alignItems="flexend">
              <StyledTab
                selected={selectedTab === "status"}
                onClick={() => {
                  onTabChange && onTabChange(dappName);
                }}
              >
                Status
              </StyledTab>
              <StyledTab
                selected={selectedTab === "settings"}
                onClick={() => {
                  onTabChange && onTabChange(dappName);
                }}
                hide={building}
              >
                Settings
              </StyledTab>
              {/* TODO IMPLEMENT OTHER DROP DOWN OPTIONS */}
              {/* <Dropdown>
                <DropdownTrigger>
                  <StyledTab selected={selectedTab === "settings"}>
                    Settings
                  </StyledTab>
                </DropdownTrigger>
                <DropdownContent>
                  {settingOptions.map((option, index) => (
                    <DropdownItem key={index} onClick={option.onClick}>
                      <Typo>{option.title}</Typo>
                    </DropdownItem>
                  ))}
                </DropdownContent>
              </Dropdown> */}
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
