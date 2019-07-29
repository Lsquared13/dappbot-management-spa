import * as React from "react";
import {Breadcrumb, Container, DappStatus, SettingMenu, SettingMenuProps} from "../../layout";
import {DeployDapp, DeployDappProps} from "../../components";
import {Box} from "../../components/ui";

import {RouteComponentProps} from "@reach/router";
import {DappTableProps} from "../../layout/DashboardLayout";
import {useEffect, useState} from "react";

export interface DappDetail {
    DappName : string;
    DnsName : string;
    ContractAddr : string;
    Web3URL : string;
    Abi : string;
    GuardianURL : string
}
export interface DappDetailsContainerProps extends RouteComponentProps,
SettingMenuProps {
    onStatusCopy?: () => void;
    dapps: DappTableProps["dapps"];
    building:boolean;
}

let LOADING_DAPP = {
    DappName: "Loading ... ",
    Web3URL: "Loading ... ",
    ContractAddr: "Loading ... ",
    DnsName: "Loading ... "
}as DappDetail
let DAPP_NOT_FOUND = {
    DappName: "Dapp Not Found ... ",
    Web3URL: "Dapp Not Found ... ",
    ContractAddr: "Dapp Not Found ... ",
    DnsName: "Dapp Not Found ... "
}as DappDetail

export const DappDetailsContainer : React.SFC < DappDetailsContainerProps > = props => {
    let [dappNotFound,
        setDappNotFound] = useState(false)
    // SET DEFAULT: set dapp loading state, update it when ever the dapp changes and
    // pass onto render layer
    let [dappDetailProps,
        setDappDetailProps] = useState(LOADING_DAPP)

    // FETCH DAPP DETAIL: currently just using the list api changes, saves anpther
    // fetch, can use this to replace an api call later
    useEffect(() => {
        let didCancel = false;
        async function getDappByName(dappList : DappDetail[], DappName : string) {
            // SET LOADING IF NO DATA IS PASSED THROUGH
            if (dappList.length == 0) {
                setDappDetailProps(LOADING_DAPP// SEARCH FOR OUR DAPP BY NAME ON PASSED THROUGH DATA
                )
            } else {
                let dapps = await dappList.filter((value) => {
                    if (value.DappName == DappName) {
                        return value
                    }
                })
                if (dapps.length == 0) {
                    // IF NO MATCHING DAPP DISPLAY DAPP_NOT_FOUND
                    setDappDetailProps(DAPP_NOT_FOUND)
                    setDappNotFound(true)
                } else {
                    // DISPLAY DAPP DATA
                    setDappDetailProps(dapps.pop()as DappDetail)
                }
            }
        }
        getDappByName(props.dapps, props.dappName);
        return () => {
            didCancel = true
        }; // Remember if we start fetching something else
    }, [props.dapps, props.dappName]);

    let notFound = (
        <Box>
            <Breadcrumb title={"404 - not found"}/>
            <DappStatus onStatusCopy={props.onStatusCopy} status={"404 Access Denied: this demo account has insufficient permissions "}/>
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
            <DappStatus status={"Available"} onStatusCopy={props.onStatusCopy}/>

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
