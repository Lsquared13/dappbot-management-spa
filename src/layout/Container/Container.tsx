import * as React from "react";
import { Box, BoxProps } from "../../components/ui";
import StyledContainer from "./StyledContainer"
import classnames from "classnames"
export interface ContainerProps {
  color?: BoxProps["color"];
  padding?: String;
}

export const Container: React.SFC<ContainerProps> = props => {
  return (
    <Box
      color={props.color}
      // dangerouslySetInlineStyle={{
      //   __style: {
      //     padding: `0px  ${props.padding}`
      //   }
      // }}
    >
      <StyledContainer className={classnames('center-align')}>
      {props.children}
      </StyledContainer>
   
    </Box>
  );
};

Container.defaultProps = {
  color: "white",
  padding: "18%"
};

Container.displayName = "Container";

export default Container;
