import React, {useState, useEffect } from 'react';
import { useResource } from 'react-request-hook';
import { Router, navigate, RouteComponentProps } from "@reach/router";
import Alert from 'react-s-alert';
import omit from 'lodash.omit';

import { NotFound } from "../pages/notFound";
import {NewDappContainer, BuildDetailsContainer, ConfigureDappContainer} from "../pages/newDappForm"

import ABIClerk from '../services/abiClerk';

import { DappCreateArgs,DappData, Tiers } from '../types';
import { CreateDappState, ConfigureDappState, DappDetail } from "../components";


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
const LOADING_DAPP = {
  DappName: "Loading ... ",
  Web3URL: "Loading ... ",
  ContractAddr: "Loading ... ",
  DnsName: "Loading ... "
} as DappDetail


export const NewDappFormBase: React.SFC<NewDappFormBaseProps> = ({user, setUser, ...props}) => {
    const [DappName, setDappName] = useState("")
    const [createResponse, sendCreateRequest] = useResource(ABIClerk.create(user));
    
    // ----- CREATE RESPONSE HANDLER ----- 
    const [createSent, markCreateSent] = useState(false);
    const handleCreate = (dappArgs: DappCreateArgs) => {

      const dappData:DappData = omit(dappArgs, ['DappName'])
      markCreateSent(true);
      Alert.info(`Starting build...`)
      sendCreateRequest(dappData,dappArgs.DappName)
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
            navigate(`/home/`);
          }}
          onConfigDapp={(e, inputs: CreateDappState) => {
            const { dappName } = inputs
            setDappName(dappName)
            navigate(`/home/new/step-2`);
          }}
          onGithubLink={(e, inputs: CreateDappState) => {
            alert("Enteprise Features Disabled");
          }}
          onNoneLink={(e, inputs: CreateDappState) => {
            alert("Enteprise Features Disabled");
          }}
          onInputChange={inputs => {
          }}
        />
        <ConfigureDappContainer
          path="/step-2"
          onCancel={(e, inputs: ConfigureDappState) => {
            navigate(`/home/`);
          }}
          onCreateDapp={(e, inputs: ConfigureDappState) => {
            let {contractAddress, contractABI,web3URL} = inputs
            if ( DappName == "" ){ 
              navigate(`/home/new/step-1`);
              Alert.error("dapp name required, do not refresh the page when creating a new dapp");
            }
            else{
              let args:DappCreateArgs = {
                DappName: DappName,
                Abi: contractABI,
                Web3URL: web3URL,
                GuardianURL: "https://guardian.dapp.bot",
                ContractAddr: contractAddress,
                Tier: Tiers.Standard
              }
              handleCreate(args)
            }
          }}
          onInputChange={inputs => {
            if(DappName==""){ 
              navigate(`/home/new/step-1`);
              Alert.error("dapp name required, do not refresh the page when creating a new dapp");
            }
          }}
        />
         <BuildDetailsContainer
            path="/:dappName/*"
            dappName="loading"
            dapp={LOADING_DAPP}
            onStatusCopy={() => {}}
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
  