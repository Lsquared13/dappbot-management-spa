import * as React from "react";
import { Box, Text, TextProps, Link, LinkProps } from "../ui";

export const LayoutContainer: React.SFC = props => (
  <Box
    dangerouslySetInlineStyle={{
      __style: {
        border: "1px solid #E6EAEE"
      }
    }}
    minHeight={475}
    shape="rounded"
    padding={8}
    marginLeft={5}
    marginRight={5}
  >
    {props.children}
  </Box>
);

export const InputGroup: React.SFC = props => (
  <Box marginBottom={11}>{props.children}</Box>
);

export const InputTitle: React.SFC<TextProps> = props => (
  <Text
    bold
    size="sm"
    smSize="sm"
    mdSize="sm"
    lgSize="sm"
    textTransform="capitalize"
    {...props}
  >
    {props.children}
  </Text>
);

export const InputContainer: React.SFC = props => (
  <Box display="flex" wrap={true} marginTop={2} marginBottom={3}>
    {props.children}
  </Box>
);

export const ButtonText: React.SFC = props => (
  <Text color="inherit" inline size="sm" smSize="sm" mdSize="sm" lgSize="sm">
    {props.children}
  </Text>
);

export const Description: React.SFC = props => (
  <Text color="gray" size="xs" smSize="xs" mdSize="xs" lgSize="xs">
    {props.children}
  </Text>
);

export const ReferenceLink: React.SFC<LinkProps> = props => {
  return (
    <Box marginTop={1}>
      <Text color="blue" size="xs" smSize="xs" mdSize="xs" lgSize="xs">
        <Link {...props} />
      </Text>
    </Box>
  );
};
