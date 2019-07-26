import * as React from "react";
import Nav, { NavItem } from "../../Nav";
import Box from "../../Box";
import Text from "../../Text";
import Icon, { IconProps } from "../../Icon";
import AddressSwitcher, { IAddress } from "../../AddressSwitcher";

export interface NavLeftMenuItem {
  /**
   * string, title
   **/
  title: string;
  /**
   * string, icon
   **/
  iconName: IconProps["icon"];
  /**
   * boolean, disabled
   **/
  disabled?: boolean;
  /**
   * boolean, selected
   **/
  selected?: boolean;
  /**
   * function, onClick event
   **/
  onClick?: () => void;
}

export interface NavLeftProps {
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

export const NavLeft: React.SFC<NavLeftProps> = props => {

  let { addresses, addressTitle, menuItems, title } = props;
  let selectedKey;
  menuItems.filter((item, index) => {
    item.selected && (selectedKey = index);
  });
  return (
    <Box
      display="flex"
      direction="column"
      height={"100%"}
      width={250}
      color="lightGray"
      padding={4}
    >
      {/* <Box height={50} width={150} color="darkGray" /> */}
      <Box marginTop={12} marginBottom={8}>
        <Text size="lg" smSize="lg" mdSize="lg" lgSize="lg" bold>
          {title}
        </Text>
      </Box>
      <Nav selectedKey={selectedKey}>
        {menuItems.map((item, index) => {
          return (
            <NavItem
              key={index}
              disabled={item.disabled}
              onClick={item.onClick}
            >
              <Box>
                <Icon icon={item.iconName} />
                <Box display="inlineBlock" marginLeft={2}>
                  <Text textTransform="capitalize" color="inherit" size="sm">
                    {item.title}
                  </Text>
                </Box>
              </Box>
            </NavItem>
          );
        })}
      </Nav>
      <Box
        alignSelf="end"
        width={"100%"}
        dangerouslySetInlineStyle={{
          __style: {
            marginTop: "auto"
          }
        }}
      >
        <AddressSwitcher addresses={addresses} title={addressTitle} />
      </Box>
    </Box>
  );
};

export default NavLeft;
