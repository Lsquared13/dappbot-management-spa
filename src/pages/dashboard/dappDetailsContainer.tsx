import * as React from "react";
import {
  Breadcrumb,
  Container,
  DappStatus,
  SettingMenu,
  SettingMenuProps
} from "../../layout";
import { DeployDapp, DeployDappProps } from "../../components";
import { Box } from "../../components/ui";

import { RouteComponentProps } from "@reach/router";
import { DappTableProps } from "../../layout/DashboardLayout";
import { useEffect, useState } from "react";

export interface DappDetail {
  DappName: string;
  DnsName: string;
  ContractAddr: string;
  Web3URL: string;
  Abi: string;
  GuardianURL: string
}
export interface DappDetailsContainerProps extends RouteComponentProps, SettingMenuProps{
  onStatusCopy?: () => void;
  dapps: DappTableProps["dapps"];
} 

let DAPP = 
{
  DappName: "Loading ... ",
  Web3URL: "Loading ... ",
  ContractAddr: "Loading ... ",
  DnsName: "Loading ... ",
} as DappDetail


export const DappDetailsContainer: React.SFC<DappDetailsContainerProps> = props => {
  console.log('--- 2 DappDetailsContainer redendered ---');
  console.log(props.dapps)


  // SET DEFAULT: set dapp loading state, update it when ever the dapp changes and pass onto render layer
 let dappDetailProps, setDappDetailProps:any;
  [dappDetailProps, setDappDetailProps] = useState(DAPP)

  // FETCH DAPP DETAIL: currently just using the list api changes, saves anpther fetch, can use this to replace an api call later
  useEffect(() => {
    let didCancel = false;
    async function getDappByName(dappList:DappDetail[], DappName: string) {
      let dapps = [DAPP];
      if (dappList.length ==0){
        setDappDetailProps(dapps.pop())
      }else {
        dapps = await dappList.filter((value)=>{
              if (value.DappName == DappName){
                return value
              }
          })
          setDappDetailProps( dapps.pop())
      }
     
    }
  
    getDappByName(props.dapps, props.dappName);
    return () => { didCancel = true;  console.log("Fetch completed:", !didCancel)}; // Remember if we start fetching something else
  }, [props.dapps, props.dappName]);

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

      <DappStatus onStatusCopy={props.onStatusCopy} />

      <Container>
        <DeployDapp 
          dappDetail={dappDetailProps} 
          onDeployDapp={() => {alert("onDeployDapp is called");}} 
        />
      </Container>
    </Box>
  );
};

export default DappDetailsContainer;
