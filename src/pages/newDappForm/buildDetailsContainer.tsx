import * as React from "react";
import Alert from 'react-s-alert';
import {Breadcrumb, Container, DappStatus, SettingMenu, SettingMenuProps} from "../../layout";
import {DeployDapp, DeployDappProps} from "../../components";
import {Box} from "../../components/ui";

import {RouteComponentProps, navigate} from "@reach/router";
import {useEffect, useState} from "react";
import BuildDapp from "../../components/BuildDapp";

export interface DappDetail {
    DappName : string;
    DnsName : string;
    ContractAddr : string;
    Web3URL : string;
    Abi : string;
    GuardianURL : string
}
export interface buildDetailsContainerProps extends RouteComponentProps,
SettingMenuProps {
    onStatusCopy?: () => void;
    dapp: DappDetail;
    redirect: ()=>void;
}

let LOADING_DAPP = {
    DappName: "Building ... ",
    Web3URL: "Building ... ",
    ContractAddr: "Building ... ",
    DnsName: "Building ... "
}as DappDetail


export const BuildDetailsContainer : React.SFC < buildDetailsContainerProps > = props => {
    
    let [dappDetailProps,
        setDappDetailProps] = useState(LOADING_DAPP)
    let dapp = (
        <Box>
            <Breadcrumb title={props.dappName}/>

            <SettingMenu
                dappName={props.dappName}
                defaultTab={props.defaultTab}
                settingOptions={props.settingOptions}
                onTabChange={props.onTabChange}/>
            <DappStatus status={"Building"} onStatusCopy={props.onStatusCopy}/>

            <Container>
                <BuildDapp
                    dappDetail={dappDetailProps}
                    onBuildDapp={() => {
                    alert("onBuildDapp is called");
                }}/>
            </Container>
        </Box>
    )
    setTimeout(function() {
        Alert.success("Build complete!")
        navigate(`/home`);
        
    }, 1000*11);
      
    
    return dapp;
};

export default BuildDetailsContainer;
