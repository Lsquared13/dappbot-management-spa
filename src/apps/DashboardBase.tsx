import React, { useEffect, useState } from "react";
import { useResource } from "react-request-hook";
import { Router, navigate, RouteComponentProps, NavigateFn } from "@reach/router";
import Alert from 'react-s-alert';


import  { DashboardContainer, DappDetailsContainer,DeleteDappContainer} from "../pages/dashboard";

import ABIClerk from "../services/abiClerk";

import { DeleteDappState } from "../components";
import { NotFound } from "../pages/notFound";
import { defaultUser, defaultUserResponse, UserResponse } from "../types";

export interface Props extends RouteComponentProps {
  user : UserResponse
  setUser : (user:UserResponse)=>void
}
export interface DappDetail {
  DappName: string;
  DnsName: string;
  ContractAddr: string;
  Web3URL: string;
  Abi: string;
  GuardianURL: string
}
const SETTING_OPTIONS = [
  {
    title: "General Settings",
    onClick: () => {
      navigate(`/home/dapp/settings`);
    }
  },
  {
    title: "Customizations",
    onClick: () => {
      Alert.info("Pro Features Disabled");
    }
  },
  {
    title: "Version Control",
    onClick: () => {
      Alert.info("Pro Features Disabled");
    }
  },
  {
    title: "Team Access",
    onClick: () => {
      Alert.info("Pro Features Disabled");
    }
  },
  {
    title: "Dapp Deletion",
    onClick: () => {
      navigate(`/home/dapp/delete`);
    }
  }
];

export const DashboardBase: React.SFC<Props> = ({user, setUser, ...props}) => {
 
  const [deleteResponse, sendDeleteRequest] = useResource(ABIClerk.delete(user));
  const [listResponse, sendListRequest] = useResource(ABIClerk.list(user),[]);
   
  //----- LIST RESPONSE HANDLER -----
  // AUTH CHECK: Check for valid session, log out if expired
  if (listResponse && listResponse.data && (['The incoming token has expired', 'Unauthorized'].includes((listResponse.data as any).message))){
    let newUser = defaultUserResponse();
    (props.navigate as NavigateFn)('/login');
    setUser(newUser);
  }
  
  //----- DELETE RESPONSE HANDLER ----- 
  const [deleteSent, markDeleteSent] = useState(false);
  const handleDelete = (dappName: string) => {
    markDeleteSent(true);
    sendDeleteRequest(dappName);
  }
  useEffect(() => {
    if (deleteSent) {

      if (deleteResponse.isLoading){
        Alert.info(`Deleting dapp ...`, {timeout: 500 });

      } 
      else if (deleteResponse.error) {
        markDeleteSent(false)
        markFetchListSent(false)

        switch(deleteResponse.error.code){
          case 401: {
            Alert.error("Unauthorized resource, please sign in");
            break;
          }
          default:{
            Alert.error("Error Details:"+deleteResponse.error.message);
          }
        }

      } 
      else if (deleteResponse.data) {
        markDeleteSent(false);
        Alert.success(`Your dapp was successfully deleted!`, {timeout: 500 });

        handleFetchList()
        navigate(`/home`);

      }
    }
  }, [deleteResponse])

  // ----- FETCH LIST HANDLER ----- 
  const [fetchListSent, markFetchListSent] = useState(false);
  const handleFetchList= async() => {
    markFetchListSent(true);
    sendListRequest();
  }
  useEffect(() => {
    if (fetchListSent){
      
      if (listResponse.isLoading){
        Alert.info("Fetching Dapp List", { timeout: 750});
        
      } 
      else if (listResponse.error) {
        markFetchListSent(false)

        switch(listResponse.error.code){
          case 401: {
            Alert.error("Unauthorized resource, please sign in");
            break;
          }
          default:{
            Alert.error("Error Details:"+listResponse.error.message);
          }
        }

      } 
      else if(listResponse.data){
        markFetchListSent(false);
        Alert.success("Access Granted", { timeout: 750 });
        
      }
    }
  }, [listResponse]);

  useEffect(() => {
    handleFetchList()
  }, []);
  
  //EDIT RESPONSE HANDLER
  const [editResponse, sendEditRequest] = useResource(ABIClerk.edit(user));
  
  //PROP DRILL: props for DappDetailsContainer && DashboardContainer
  let dappList:DappDetail[] = [];
  try {
    if (listResponse.data){
      dappList.push(...(listResponse as any).data.data.items)
    }
  } 
  catch (e) {
    console.log('Error when trying to load from listResponse: ',e);
  }
  

    return (
      <div>
        <Router>    
          <DashboardContainer
            path="/"
            dapps={dappList}
            onRefresh={() => {
              handleFetchList()
            }}
            onCreateNewApp={() => {
              navigate(`/home/new/step-1`);
            }}
          />
          <DeleteDappContainer
            path="/:dappName/delete"
            dappName="loading ... "
            building={false}
            onCancel={(e, inputs: DeleteDappState) => {
              navigate(`/home`);
            }}
            onDeleteDappBot={(e, inputs: string) => {
              const dappName = inputs;
              if(dappName){
                handleDelete(dappName);
                navigate(`/home`);
              }
            }}
            onInputChange={inputs => {
              return
            }}
            defaultTab="settings"
            settingOptions={SETTING_OPTIONS}
            onTabChange={(dappName:string) => {
              navigate(`/home/${dappName}`);
            }}
          />
          <NotFound path="/denied" />
          <DappDetailsContainer
            path="/:dappName/*"
            dappName="loading"
            building={false}
            dapps={dappList}
            onStatusCopy={() => {
              Alert.success("Value copied to clipboard");
            }}
            defaultTab="status"
            settingOptions={SETTING_OPTIONS}
            onTabChange={(dappName:string) => {
              navigate(`/home/${dappName}/delete`);
            }}
          />
          <NotFound default />
          
        </Router>
      </div>
    );
  };
  

  export default DashboardBase;