import React, {useState, useEffect } from 'react';
import { Router, navigate, RouteComponentProps } from "@reach/router";
import Alert from 'react-s-alert';

import { NotFound } from "../pages/notFound";
import NewDappContainer from "../pages/newDappForm/newDappContainer";
import DappDetailsContainer from "../pages/dashboard/dappDetailsContainer";
import ConfigureDappContainer from "../pages/newDappForm/configureDappContainer";

import { CreateDappState, ConfigureDappState, DappDetail } from "../components";
import { useResource } from 'react-request-hook';
import ABIClerk from '../services/abiClerk';
import { DappArgs } from '../types';
import ConfigureDapp from '../components/ConfigureDapp';
import BuildDetailsContainer from '../pages/newDappForm/buildDetailsContainer';


const dappList:DappDetail[] = [];
export interface NewDappFormBaseProps extends RouteComponentProps {
  user? : any
  setUser : (user:any)=>void
}

export interface DappArgs {
  DappName: string
  Abi: string
  Web3URL: string
  GuardianURL: string
  ContractAddr: string
}
let LOADING_DAPP = {
  DappName: "Loading ... ",
  Web3URL: "Loading ... ",
  ContractAddr: "Loading ... ",
  DnsName: "Loading ... "
}as DappDetail
export const NewDappFormBase: React.SFC<NewDappFormBaseProps> = ({user, setUser, ...props}) => {
    const [DappName, setDappName] = useState("")
    const [email, setEmail] = useState("");
    console.log("DAPP STATE LOG:"+DappName)
    const SETTING_OPTIONS = [
      {
        title: "Building ...",
        onClick: () => {
          return 
        }
      },
      {
        title: "Home",
        onClick: () => {
          navigate(`/home`);
        }
      },

    ];

    //CREATE HANDLER
    const [createResponse, sendCreateRequest] = useResource(ABIClerk.create(user));
    const [createSent, markCreateSent] = useState(false);
    const handleCreate = (dappArgs: DappArgs) => {
      markCreateSent(true);
      Alert.info(`Starting build...`)
      sendCreateRequest(dappArgs);
    }
    useEffect(() => {
      if (createSent) {
        if (createResponse.error) {
          Alert.error(`There was an error building your dapp: ${createResponse.error.message}`)
        } else if (!createResponse.isLoading && createResponse.data) {
          Alert.success(` Build for: ${DappName} started`);
          markCreateSent(false);
          navigate(`/home/new/${DappName}/build`);
        }
      }
    }, [createSent, createResponse])
  
    return (
      <Router>
        <NewDappContainer
          path="/step-1"
          onCancel={(e, inputs: CreateDappState) => {
            console.log(inputs);
            navigate(`/home/`);
          }}
          onConfigDapp={(e, inputs: CreateDappState) => {
            const { dappName } = inputs
            setDappName(dappName)
            navigate(`/home/new/step-2`);
          }}
          onGithubLink={(e, inputs: CreateDappState) => {
            console.log(inputs);
            alert("Enteprise Features Disabled");
          }}
          onNoneLink={(e, inputs: CreateDappState) => {
            console.log(inputs);
            alert("Enteprise Features Disabled");
          }}
          onInputChange={inputs => {

            console.log("NewDappContainer Inputs", inputs);
          }}
        />
        <ConfigureDappContainer
          path="/step-2"
          onCancel={(e, inputs: ConfigureDappState) => {
            console.log(inputs);
            // alert("onCancel is called");
            navigate(`/home/`);
          }}
          onCreateDapp={(e, inputs: ConfigureDappState) => {
            let {selectedNetwork, contractAddress, contractABI,web3URL} = inputs
            console.log("ONCREATEDAPPCALLED",DappName);
            if ( DappName == "" ){ 
              navigate(`/home/new/step-1`);
              Alert.error("dapp name required, do not refresh the page when creating a new dapp");
            }
            else{
              let args:DappArgs = {
                DappName: DappName,
                Abi: contractABI,
                Web3URL: web3URL,
                GuardianURL: "https://guardian.dapp.bot",
                ContractAddr: contractAddress
              }
              handleCreate(args)
              
              console.log(args);
              
            }
            
            //alert("onCreateDapp is called");
          }}
          onInputChange={inputs => {
            if(DappName==""){ 
              navigate(`/home/new/step-1`);
              Alert.error("dapp name required, do not refresh the page when creating a new dapp");
            
            }
            console.log("ConfigureDappContainer Inputs", inputs);
          }}
        />
         <BuildDetailsContainer
            dappName="loading"
            dapp={LOADING_DAPP}
           
            path="/:dappName/*"
            
            onStatusCopy={() => {
              alert("onStatusCopy is called");
            }}
            defaultTab="status"
            settingOptions={SETTING_OPTIONS}
            onTabChange={(dappName:string) => {
              navigate(`/home/new/building/build`);
            }}
            redirect={() => {
              if(DappName==""){ 
                navigate(`/home`);
                
              }
            }}
        />
        <NotFound default />
      </Router>
    );
  };
  