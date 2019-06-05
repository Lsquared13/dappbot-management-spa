import React, { useEffect } from "react";
import { Router, navigate, RouteComponentProps, NavigateFn } from "@reach/router";



import  { DashboardContainer, DappDetailsContainer,DeleteDappContainer} from "../pages/dashboard";
import { useResource } from "react-request-hook";
import ABIClerk from "../services/abiClerk";
import { DeleteDappState } from "../components";
// import { DappArgs, DappArgNameStrs, SampleDappArgs } from '../types';

// import DappDetailsContainer from "../pages/dappDetailsContainer";
// import DeleteDappContainer from "../pages/deleteDappContainer";
// import GeneralSettingsDappContainer from "../pages/generalSettingsDappContainer";
// import {
//     DeleteDappState,
//     DappSettingsState
//   } from "../index";
  

// data:{
//   data:{
//       items:{
//           0:{
//               Abi: ""
//               ContractAddr: "0x6D47c9bE6E60744c9A5bD2Ea51a603e80f018ac1"
//               CreationTime: "2019-05-23T04:03:59.051Z"
//               DappName: "enigma-data-marketplace"
//               DnsName: "enigma-data-marketplace.dapp.bot"
//               GuardianURL: "https://guardian.dapp.bot"
//               OwnerEmail: "huertasjuan23@gmail.com"
//               Web3URL: "https://mainnet.infura.io/v3/fc6533b42279480299a402a8059bcc90"
//           }
//       }
//   }
// }

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

export const DashboardBase: React.SFC<Props> = ({user, setUser, ...props}) => {

    const CONTRACT_ABI = [
      {
        constant: true,
        inputs: [{ name: "user", type: "address" }],
        name: "accountLevel",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        type: "function",
        stateMutability: "view"
      }
    ];
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
          alert("Customizations");
        }
      },
      {
        title: "Version Control",
        onClick: () => {
          alert("Version Control");
        }
      },
      {
        title: "Team Access",
        onClick: () => {
          alert("Team Access");
        }
      },
      {
        title: "Dapp Deletion",
        onClick: () => {
          navigate(`/home/dapp/delete`);
        }
      }
    ];
    const [listResponse, sendListRequest] = useResource(ABIClerk.list(user),[]);

    let dappList:DappDetail[] = [];
    //AUTH CHECK: Check for valid session, log out if expired
    if (listResponse && listResponse.data && (['The incoming token has expired', 'Unauthorized'].includes((listResponse.data as any).message))){
      let newUser = Object.assign(user, { signInUserSession : null });
      (props.navigate as NavigateFn)('/login');
      setUser(newUser);
    }
    //PROP DRILL: props for DappDetailsContainer && DashboardContainer
    try {
      if (listResponse.data){
        dappList.push(...(listResponse as any).data.data.items)
      }
    } 
    catch (e) {
      console.log('Error when trying to load from listResponse: ',e);
    }
    //FETCH DATA: fetch dapp list
    useEffect(() => {
      let didCancel = false;
      async function fetchMyAPI() {
        if (!didCancel && user) { // Ignore if we started fetching something else
          await sendListRequest();
          console.log('--- 1 Dashboard App redendered, fetching fresh dapp info ---');
          console.log('====FETCH DAPPS COMPLETED====')
        }
      }  
      fetchMyAPI();
      return () => { didCancel = true;  console.log("Fetch complote:", didCancel)}; // Remember if we start fetching something else
    }, [sendListRequest]);

    return (
      <div>
        <Router>    
          <DashboardContainer
            path="/"
            dapps={dappList}
            onRefresh={() => {
              alert("onRefresh is called");
            }}
            onCreateNewApp={() => {
              navigate(`/home/enigma`);
            }}
          />
          
          {/* <GeneralSettingsDappContainer
            path="/:dappName/settings"
            dappName="crypto-kitty"
            selectedNetwork="eth"
            contractAddress="0x92EB17BE1573e82e6E5DAa17C12Adba00279CEA1"
            contractABI={JSON.stringify(CONTRACT_ABI)}
            providerURL="crypto-kitty.dapp.bot"
            onCancel={(e, inputs: DappSettingsState) => {
              navigate(`/home/new/building/` + "dapp");
            }}
            onSaveChanges={(e, inputs: DappSettingsState) => {
              console.log(inputs);
              navigate(`/home/new/building/` + "dapp");
            }}
            onInputChange={inputs => {
              console.log("GeneralSettingsDappContainer Inputs", inputs);
            }}
            defaultTab="settings"
            settingOptions={SETTING_OPTIONS}
            onTabChange={() => {
              navigate(`/home/new/building/` + "dapp");
            }}
          /> */}
          <DeleteDappContainer
            path="/:dappName/delete"
            dappName="crypto-kitty"
            onCancel={(e, inputs: DeleteDappState) => {
              const dappName = inputs.dappName;
              if(dappName){
                console.log("delete and navigate")
                navigate(`/home/new/building/` + "dapp");
              }
            }}
            onDeleteDappBot={(e, inputs: DeleteDappState) => {
              console.log(inputs);
              navigate(`/home/`);
            }}
            onInputChange={inputs => {
              console.log("DeleteDappContainer Inputs", inputs);
            }}
            defaultTab="settings"
            settingOptions={SETTING_OPTIONS}
            //TODO: EXPOSE DAPP NAME AS A PARAMETER TO THE FUNCTION
            //TODO: Load the Dapp details again
            onTabChange={() => {
              navigate(`/home/new/building/` + "dapp");
            }}
          />
          <DappDetailsContainer
            dappName="loading"
            dapps={dappList}
           
            path="/:dappName/*"
            
            onStatusCopy={() => {
              alert("onStatusCopy is called");
            }}
            defaultTab="status"
            settingOptions={SETTING_OPTIONS}
            onTabChange={() => {
              navigate(`/home/new/building/` + "dapp");
            }}
          />
        </Router>
      </div>
    );
  };
  

  export default DashboardBase;