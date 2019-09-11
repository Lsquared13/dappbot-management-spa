import * as React from "react";
import { RouteComponentProps } from "@reach/router";
import { ConfigureDapp, ConfigureDappProps } from "../../components";
import { Breadcrumb, Container, Title } from "../../layout";
import { Box } from "../../components/ui";

export interface ConfigureDappContainerProps extends RouteComponentProps, ConfigureDappProps {}

export const ConfigureDappContainer: React.SFC<ConfigureDappContainerProps> = props => (
  <Box>
    {/* BREADCRUMBS */}
    <Breadcrumb title="DAPPS / CONFIGURE DAPP" />
    {/* NEW DAPP HEADER */}
    <Title title="Configure Dapp" />
    {/* DAPP STATUS */}
    <Container>
      <ConfigureDapp {...props} />
    </Container>
  </Box>
);

ConfigureDappContainer.displayName = "ConfigureDappContainer";

export default ConfigureDappContainer;
