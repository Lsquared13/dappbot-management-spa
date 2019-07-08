import * as React from "react";
import { Box, BoxProps } from "../../ui";

export interface ContainerProps {
  color?: BoxProps["color"];
  padding?: String;
}

export const Container: React.SFC<ContainerProps> = props => {
  return (
    <Box
      color={props.color}
      dangerouslySetInlineStyle={{
        __style: {
          padding: `0px  ${props.padding}`
        }
      }}
    >
      {props.children}
    </Box>
  );
};

Container.defaultProps = {
  color: "white",
  padding: "18%"
};

Container.displayName = "Container";

export default Container;
