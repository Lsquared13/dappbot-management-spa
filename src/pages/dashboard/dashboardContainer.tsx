import * as React from "react";
import {
  Breadcrumb,
  Container,
  ButtonText,
} from "../../layout";
import {  Box, Button,Text,Divider} from "../../components/ui";
import { DappTable, DappTableProps } from "../../layout/DashboardLayout";
import { ReactComponent as RefreshIcon } from "../../images/refresh.svg";
import { RouteComponentProps } from '@reach/router';


export interface DashboardContainerProps extends RouteComponentProps {
  onRefresh?: () => void;
  onCreateNewApp?: () => void;
  dapps: DappTableProps["dapps"];
};

export const DashboardContainer: React.SFC<DashboardContainerProps> = props => {
  return (
    <Box>
      {/* BREADCRUMBS */}
      <Breadcrumb title="none" />
      {/* NEW DAPP HEADER */}
      <Container>
        <Box
          display="flex"
          justifyContent="between"
          alignItems="center"
          padding={5}
        >
          <Text
            bold
            size="xl"
            smSize="xl"
            mdSize="xl"
            lgSize="xl"
            textTransform="uppercase"
          >
            DAPPS
          </Text>
          <Box>
            <Button size="small" theme="outlineBlue" onClick={props.onRefresh}>
              <RefreshIcon />
            </Button>
            <Box display="inlineBlock" marginLeft={2}>
              <Button
                size="small"
                theme="outlineBlue"
                onClick={props.onCreateNewApp}
              >
                <ButtonText>New Dapp</ButtonText>
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
      <Divider type="secondary" />
      <Container>
        <Box marginTop={9}>
          <DappTable dapps={props.dapps} />
        </Box>
      </Container>
    </Box>
  );
};

export default DashboardContainer;
