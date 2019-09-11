import React, { useState } from "react";
import {RouteComponentProps, navigate} from "@reach/router";
import Alert from 'react-s-alert';

import {Breadcrumb, Container, DappStatus, SettingMenu, SettingMenuProps} from "../../layout";
import {Box} from "../../components/ui";
import BuildDapp from "../../components/BuildDapp";
import Dapp from "@eximchain/dappbot-types/spec/dapp";

export interface BuildDetailsContainerProps extends RouteComponentProps,
SettingMenuProps {
    onStatusCopy?: () => void;
    dapp: Dapp.Item.Api;
    redirect: ()=>void;
}

export const BuildDetailsContainer : React.SFC <BuildDetailsContainerProps> = props => {
    
    let dapp = (
        <Box>
            <Breadcrumb title={props.dappName}/>

            <SettingMenu
                building={props.building}
                dappName={props.dappName}
                defaultTab={props.defaultTab}
                settingOptions={props.settingOptions}
                onTabChange={props.onTabChange}/>
            <DappStatus buildStatus={"Building"} onStatusCopy={props.onStatusCopy}/>

            <Container>
                <BuildDapp
                    dappDetail={props.dapp}
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
