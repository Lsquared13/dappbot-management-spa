import * as React from "react";
import {
  Breadcrumb,
  Container,
  Title,
  SettingMenu,
  SettingMenuProps
} from "../../layout";
import { Box } from "../../components/ui";
import { DeleteDapp, DeleteDappProps } from "../../components";
import { RouteComponentProps } from "@reach/router";


export interface DeleteDappContainerProps extends RouteComponentProps,DeleteDappProps, SettingMenuProps {
  dappName: string;
}


export const DeleteDappContainer: React.FC<
DeleteDappContainerProps
> = props => {
  
  return (
    <Box>
      {/* BREADCRUMBS */}
      <Breadcrumb title={props.dappName} />

      <SettingMenu
        dappName={props.dappName}
        defaultTab={props.defaultTab}
        settingOptions={props.settingOptions}
        onTabChange={props.onTabChange}
      />

      <Title title="Dapp Deletion" />

      <Container>
        <DeleteDapp {...props} />
      </Container>
    </Box>
  );
};

DeleteDappContainer.displayName = "DappDetailsContainer";

export default DeleteDappContainer;
