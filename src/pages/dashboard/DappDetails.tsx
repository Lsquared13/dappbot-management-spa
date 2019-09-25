import React, { useEffect, useState } from "react";
import Alert from 'react-s-alert';
import { RouteComponentProps } from "@reach/router";
import Dapp from '@eximchain/dappbot-types/spec/dapp';

import { Breadcrumb, Container, DappStatus, SettingMenu, SettingMenuProps, copyAndAlert } from "../../layout";
import { DeployDapp } from "../../components";
import { Box } from "../../components/ui";
import { DappTableProps } from "../../layout/DashboardLayout";

export interface DappDetailsContainerProps extends RouteComponentProps, SettingMenuProps {
    dapps: Dapp.Item.Api[];
    building:boolean;
}

let LOADING_DAPP = {
    DappName: "Loading ... ",
    Web3URL: "Loading ... ",
    ContractAddr: "Loading ... ",
    DnsName: "Loading ... "
} as Dapp.Item.Api

let DAPP_NOT_FOUND = {
    DappName: "Dapp Not Found ... ",
    Web3URL: "Dapp Not Found ... ",
    ContractAddr: "Dapp Not Found ... ",
    DnsName: "Dapp Not Found ... "
} as Dapp.Item.Api

export const DappDetailsContainer : React.SFC < DappDetailsContainerProps > = props => {
    let [dappNotFound, setDappNotFound] = useState(false)
    let [abi, setAbi] = useState('');
    // SET DEFAULT: set dapp loading state, update it when ever the dapp changes and
    // pass onto render layer
    let [dappDetailProps, setDappDetailProps] = useState(LOADING_DAPP)

    // FETCH DAPP DETAIL: currently just using the list api changes, saves anpther
    // fetch, can use this to replace an api call later
    useEffect(() => {
        async function getDappByName(dappList : Dapp.Item.Api[], DappName : string) {
            // SET LOADING IF NO DATA IS PASSED THROUGH
            if (dappList.length == 0) {
                // SEARCH FOR OUR DAPP BY NAME ON PASSED THROUGH DATA
                setDappDetailProps(LOADING_DAPP)
            } else {
                let dapp = await dappList.find(value => value.DappName === DappName)
                if (dapp) {
                    // DISPLAY DAPP DATA
                    setAbi(dapp.Abi)
                    setDappDetailProps(dapp)
                } else {
                    // IF NO MATCHING DAPP DISPLAY DAPP_NOT_FOUND
                    setDappDetailProps(DAPP_NOT_FOUND)
                    setDappNotFound(true)
                }
            }
        }
        getDappByName(props.dapps, props.dappName);
    }, [props.dapps, props.dappName]);

    let onAbiCopy = abi ? () => { copyAndAlert(abi) } : () => { Alert.error("No ABI found to copy") };

    let notFound = (
        <Box>
            <Breadcrumb title={"404 - not found"}/>
            <DappStatus onAbiCopy={onAbiCopy} buildStatus={"404 Access Denied: this demo account has insufficient permissions "}/>
        </Box>
    )
    let foundDapp = (
        <Box>
            <Breadcrumb title={props.dappName}/>

            <SettingMenu
                building ={props.building}
                dappName={props.dappName}
                defaultTab={props.defaultTab}
                settingOptions={props.settingOptions}
                onTabChange={props.onTabChange}/>
            <DappStatus buildStatus={"Available"} onAbiCopy={onAbiCopy}/>

            <Container>
                <DeployDapp
                    dappDetail={dappDetailProps}
                    onDeployDapp={() => {
                    alert("onDeployDapp is called");
                }}/>
            </Container>
        </Box>
    )
    const display = dappNotFound
        ? notFound
        : foundDapp
    return (display);
};

export default DappDetailsContainer;