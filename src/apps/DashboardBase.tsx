import React, { useEffect, useState } from "react";
import { useResource } from "react-request-hook";
import { Router, navigate, RouteComponentProps, NavigateFn } from "@reach/router";
import Alert from 'react-s-alert';


import  { DashboardContainer, DappDetailsContainer,DeleteDappContainer} from "../pages/dashboard";

import ABIClerk from "../services/abiClerk";

import { DeleteDappState } from "../components";

export interface Props extends RouteComponentProps {
  user? : any
  setUser : (user:any)=>void
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
      alert("Pro Features Disabled");
    }
  },
  {
    title: "Version Control",
    onClick: () => {
      alert("Pro Features Disabled");
    }
  },
  {
    title: "Team Access",
    onClick: () => {
      alert("Pro Features Disabled");
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
      let newUser = Object.assign(user, { signInUserSession : null });
      (props.navigate as NavigateFn)('/login');
      setUser(newUser);
    }
    // FETCH DATA: fetch dapp list
    useEffect(() => {
      let didCancel = false;
      async function fetchMyAPI() {
        if (!didCancel && user) { // Ignore if we started fetching something else
          await sendListRequest();
          }
      }  
      fetchMyAPI();
      return () => { didCancel = true;  console.log("Fetch complete:", didCancel)}; // Remember if we start fetching something else
    }, [sendListRequest, deleteResponse]);
    
    //----- DELETE RESPONSE HANDLER ----- 
    const [deleteSent, markDeleteSent] = useState(false);
    const handleDelete = (dappName: string) => {
      markDeleteSent(true);
      Alert.info(`Deleting ${dappName} now...`)
      sendDeleteRequest(dappName);
    }
    useEffect(() => {
      if (deleteSent) {
        if (deleteResponse.error) {
          Alert.error(`There was an error deleting your dapp: ${deleteResponse.error.message}`)
        } else if (!deleteResponse.isLoading && deleteResponse.data) {
          Alert.success(`Your dapp was successfully deleted!`);
          markDeleteSent(false);
        }
      }
    }, [deleteSent, deleteResponse])

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
              navigate(`/home`);
            }}
            onCreateNewApp={() => {
              navigate(`/home/new/step-1`);
            }}
          />
          <DeleteDappContainer
            path="/:dappName/delete"
            dappName="loading ... "
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
          <DappDetailsContainer
            path="/:dappName/*"
            dappName="loading"
            dapps={dappList}
            onStatusCopy={() => {
              alert("onStatusCopy is called");
            }}
            defaultTab="status"
            settingOptions={SETTING_OPTIONS}
            onTabChange={(dappName:string) => {
              navigate(`/home/${dappName}/delete`);
            }}
          />
          
        </Router>
      </div>
    );
  };
  

  export default DashboardBase;