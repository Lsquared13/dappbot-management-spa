import * as React from "react";
import { RouteComponentProps } from "@reach/router";
import { CreateDapp, CreateDappProps } from "../../components";
import { Breadcrumb, Container, Title } from "../../layout";
import { Box } from "../../components/ui";

export interface NewDappContainerProps extends RouteComponentProps, CreateDappProps {}


export const NewDappContainer: React.SFC<NewDappContainerProps> = props => (
  <Box>
    {/* BREADCRUMBS */}
    <Breadcrumb title="disable" />
    {/* NEW DAPP HEADER */}
    <Title title="create dapp" />
    {/* DAPP STATUS */}
    <Container>
      <CreateDapp {...props} />
    </Container>
  </Box>
);

NewDappContainer.displayName = "NewDappContainer";

export default NewDappContainer;
