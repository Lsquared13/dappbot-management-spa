import * as React from "react";
import Box from "../Box";
import Icon, { IconProps } from "../Icon";
import Text, { TextProps } from "../Text";
// import { Box, Icon, Text, TextProps, IconProps } from "./../../components";

export interface CurrencyProps {
  /**
   * number, amount
   **/
  amount: number;
  /**
   * boolean, positive or negative value
   **/
  positive?: boolean;
  /**
   * boolean, show currency symbol
   **/
  showSymbol?: boolean;
  /**
   * boolean, show currency sign - positive/negative
   **/
  showSign?: boolean;
  /**
   * string, size
   * "xs" | "sm" | "md" | "lg" | "xl"
   **/
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export const Currency: React.SFC<CurrencyProps> = props => {
  const { amount, positive, showSymbol, showSign, size } = props;

  let color: TextProps["color"] | IconProps["color"], sign;
  if (positive === undefined) {
    color = "black" as TextProps["color"];
    sign = "";
  } else if (positive === true) {
    color = "green" as IconProps["color"];
    sign = <Icon color={color} icon="add" />;
  } else {
    color = "red" as IconProps["color"];
    sign = <Icon color={color} icon="minus" />;
  }

  return (
    <Text
      inline
      color={color}
      size={size}
      smSize={size}
      mdSize={size}
      lgSize={size}
    >
      {showSign && sign}
      <Box
        display="inlineBlock"
        dangerouslySetInlineStyle={{
          __style: {
            transform: "rotate(30deg)",
            top: "1px",
            positive: "relative",
            paddingLeft: "5px"
          }
        }}
      >
        {showSymbol && <Icon icon="EXC-logo" />}
      </Box>
      {amount}
    </Text>
  );
};

Currency.defaultProps = {
  size: "md",
  showSymbol: true
};

export default Currency;
