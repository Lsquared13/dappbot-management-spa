import React, {useState, useEffect } from 'react';
import { useResource } from 'react-request-hook';
import { Router, navigate, RouteComponentProps, NavigateFn } from "@reach/router";
import Alert from 'react-s-alert';
import omit from 'lodash.omit';

import { NotFound } from "../pages/notFound";
import {NewDappContainer, BuildDetailsContainer, ConfigureDappContainer} from "../pages/newDappForm"
import API from '../services/api';
import {ListResponse} from '../services/api/types'

import { DappCreateArgs,DappData, Tiers, defaultUserResponse, UserResponseData } from '../types';
import { CreateDappState, ConfigureDappState, DappDetail, CreateDapp } from "../components";


export interface NewDappFormBaseProps extends RouteComponentProps {
  user? : UserResponseData
  setUser : (user:UserResponseData)=>void
  API : API
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


export const NewDappFormBase: React.SFC<NewDappFormBaseProps> = ({user, setUser, API, ...props}) => {
    const [DappName, setDappName] = useState("")
    const [createResponse, sendCreateRequest] = useResource(API.private.create());
    const [listResponse, sendListRequest] = useResource(API.private.list(),[]);
    
    if (listResponse && listResponse.data && (['The incoming token has expired', 'Unauthorized'].includes((listResponse.data as any).message))){
      let newUser = defaultUserResponse();
      (props.navigate as NavigateFn)('/login');
      setUser(newUser);
    }
    
    const [availableNumOfDapps, markAvailableNumOfDapps ] = useState(-1)
    const [fetchListSent, markFetchListSent] = useState(false);
    const handleFetchList= async() => {
      markFetchListSent(true);
      sendListRequest();
    }

    useEffect(() => {
      if (fetchListSent){
        // console.log(listResponse)
        
        if (listResponse.isLoading){
          Alert.info("Fetching Dapp List", { timeout: 750});
        } 
        else if (listResponse.error) {
          markFetchListSent(false)
  
          switch(listResponse.error.code){
            case '401': {
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
          const {count} = listResponse.data.data
          if(user){
            const totalAvailableDapps = parseInt(user.User.UserAttributes['custom:standard_limit'])
            markAvailableNumOfDapps(totalAvailableDapps - count)
          }
          Alert.success("Access Granted", { timeout: 750 });
          
        }
      }
    }, [listResponse]);

    useEffect(() => {
      console.log("handleFetchList")
      handleFetchList()
    }, []);


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
    
    const handleStep1 = (e:any, inputs: CreateDappState) => {
      console.log(availableNumOfDapps)
      if (availableNumOfDapps<=0){
        Alert.error(`Cannot create anymore dapps please buy additional dapp slots`, { timeout: 3000})
        return
      }
      const { dappName } = inputs
      setDappName(dappName)
      navigate(`/home/new/step-2`);
    }
    return (
      <Router>
        <NewDappContainer
          path="/step-1"
          onCancel={(e, inputs: CreateDappState) => {
            navigate(`/home/`);
          }}
          onConfigDapp={handleStep1}
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
            building={true}
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
  