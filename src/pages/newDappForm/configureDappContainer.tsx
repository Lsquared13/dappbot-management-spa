import * as React from "react";
import { ConfigureDapp, ConfigureDappProps } from "../../components";
import { Breadcrumb, Container, Title } from "../../layout";
import { Box } from "../../components/ui";
import { RouteComponentProps } from "@reach/router";

export interface Props extends RouteComponentProps, ConfigureDappProps {

}
export const ConfigureDappContainer: React.SFC<Props> = props => (
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
