import * as React from "react";
import { RouteComponentProps } from "@reach/router";
import {
  Breadcrumb,
  Container,
  Title,
  SettingMenu,
  SettingMenuProps
} from "../../layout";
import { Box } from "../../components/ui";
import { DeleteDapp, DeleteDappProps } from "../../components";


export interface DeleteDappContainerProps extends RouteComponentProps, DeleteDappProps, SettingMenuProps {
  dappName: string;
}

export const DeleteDappContainer: React.FC<DeleteDappContainerProps> = props => {
  
  return (
    <Box>
      {/* BREADCRUMBS */}
      <Breadcrumb title={props.dappName} />
      <SettingMenu
        building = {props.building}
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
