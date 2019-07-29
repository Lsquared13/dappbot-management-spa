import * as React from "react";

import Box from "../Box";
import Text from "../Text";
import Icon, { IconProps } from "../Icon";
import EXCAddress from "../EXCAddress";

export interface AddressProps {
  /**
   * func, Event --> called on address click
   **/
  onClick?: (e: any, data: any) => void;
  /**
   * string, address text
   **/
  address?: string;
  /**
   * string, lable text
   **/
  label?: string;
  /**
   * String, icon to show
   **/
  icon?: IconProps["icon"];
}

export const Address: React.SFC<AddressProps> = props => {
  let { onClick, address = "", label = "", icon } = props;
  let data = {
    address: address,
    label: label
  };
  return (
    <Box
      onClick={(e: any) => {
        onClick && onClick(e, data);
      }}
    >
      <Box>
        <Text size="xs" inline>
          {icon && <Icon icon={icon} />}
        </Text>
        <Box display="inlineBlock" marginLeft={1}>
          <EXCAddress address={address} size="xs" />
        </Box>
      </Box>
      <Box
        display="inlineBlock"
        color="gray"
        paddingX={2}
        paddingY={1}
        marginTop={1}
        dangerouslySetInlineStyle={{
          __style: {
            borderRadius: "4px"
          }
        }}
      >
        <Text align="left" size="xs" color="white">
          {label}
        </Text>
      </Box>
    </Box>
  );
};

Address.defaultProps = {
  icon: "blockmaker"
};

export default Address;
