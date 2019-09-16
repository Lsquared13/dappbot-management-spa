import * as React from "react";
import { RouteComponentProps } from '@reach/router';
import Dapp from '@eximchain/dappbot-types/spec/dapp';
import {
  Breadcrumb,
  Container,
  ButtonText,
} from "../../layout";
import EmptyState from "../../assets/images/SDK.svg";
import { Box, Button,Text,Divider} from "../../components/ui";
import { DappTable } from "../../layout/DashboardLayout";
import { ReactComponent as RefreshIcon } from "../../assets/images/refresh.svg";


export interface DashboardContainerProps extends RouteComponentProps {
  onRefresh?: () => void;
  onCreateNewApp?: () => void;
  dapps: Dapp.Item.Api[];
  dappsLoading: boolean;
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
          marginTop={4}
          marginBottom={4}
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

      {props.dappsLoading ? (
        <Box marginTop={9} marginBottom={12}>
          <Container>
            <div className="mb-5 mt-5 text-center">
              <Text
                bold
                size="lg"
                smSize="lg"
                mdSize="lg"
                lgSize="lg"
                align="center"
                className="mb-3"
                color="blue"
                >
                Loading Dapps...
              </Text>
            </div>
          </Container>
        </Box>
      ) : props.dapps.length ? (
        <Box marginTop={9}>
          <DappTable
            dapps={props.dapps}
          />
        </Box>
      ) : (
        <Box marginTop={9} marginBottom={12}>
          <Container>
            <div className="mb-5 mt-5 text-center">
              <div className="row text-center mb-3">
                <div className="col-sm-6 m-auto col-lg-4">
                  <img alt="Dapp Empty State" className="img-fluid" src={EmptyState} />
                </div>
              </div>
              <Text
                bold
                size="lg"
                smSize="lg"
                mdSize="lg"
                lgSize="lg"
                align="center"
                className="mb-3"
                color="blue"
                >
                No Dapps
              </Text>
              <div className="row text-center">
                <div className="col-sm-6 col-md-6 m-auto">
                  <Text
                  size="sm"
                  smSize="sm"
                  mdSize="sm"
                  lgSize="sm"
                  color="gray"
                  align="center"
                  className="mb-5">
                    Start building on blockchain by clicking on “New Dapp” button above or below. When you create a Dapp it will appear here.
                  </Text>
                </div>
              </div>
              <Button
                size="small"
                theme="cta"
                onClick={props.onCreateNewApp}
                className="mb-5"
              >
                <ButtonText>New Dapp</ButtonText>
              </Button>

            </div>
          </Container>
        </Box>
      )}

      </Container>
    </Box>
  );
};

export default DashboardContainer;