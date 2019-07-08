import * as React from "react";
import Box from "../Box";

export interface NavTopProps {}

export const NavTop: React.SFC<NavTopProps> = props => {
  const { children } = props;
  return (
    <Box paddingX={5} paddingY={6} width={"100%"}>
      {children ? children : null}
    </Box>
  );
};

export default NavTop;
