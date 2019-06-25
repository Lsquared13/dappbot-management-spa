import * as React from "react";

import Box from "./../Box";
import Text, { TextProps } from "./../Text";

export interface EXCAddressProps {
  /**
   * string, address
   **/
  address: string;
  /**
   * string, text color
   **/
  color?: TextProps["color"];
  /**
   * boolean, truncated address
   **/
  short?: boolean;
  /**
   * string, text size
   **/
  size?: TextProps["size"];
  /**
   * function, onClick event
   **/
  onClick?: any
}

export const EXCAddress: React.SFC<EXCAddressProps> = (
  props: EXCAddressProps
) => {
  const { address, onClick, short, size, color } = props;

  const content =
    address && short
      ? [
          ...address.split("").slice(0, 10),
          "...",
          ...address.split("").slice(42 - 10)
        ].join("")
      : address;

  if (onClick) {
    return (
      <div onClick={onClick}>
        <Box
          display="inlineBlock"
          
          dangerouslySetInlineStyle={{
            __style: {
              cursor: "pointer"
            }
          }}
        >
          <Text
            size={size}
            smSize={size}
            mdSize={size}
            lgSize={size}
            color={color}
          >
            {content}
          </Text>
        </Box>
      </div>
      
    );
  }

  return (
    <Text
      inline
      size={size}
      smSize={size}
      mdSize={size}
      lgSize={size}
      color={color}
    >
      {content}
    </Text>
  );
};

EXCAddress.defaultProps = {
  short: false,
  size: "md"
};

EXCAddress.displayName = "EXCAddress";

export default EXCAddress;
