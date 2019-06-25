import * as React from "react";
import { CreateDapp, CreateDappProps } from "../../components";
import { Breadcrumb, Container, Title } from "../../layout";
import { Box } from "../../components/ui";
import { RouteComponentProps } from "@reach/router";

export interface NewDappContainerProps extends RouteComponentProps, CreateDappProps {

}
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
