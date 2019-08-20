import React, {useState, useEffect, useRef } from 'react';
import { useResource } from 'react-request-hook';
import { Router, navigate, RouteComponentProps, NavigateFn } from "@reach/router";
import Alert from 'react-s-alert';
import omit from 'lodash.omit';

import { NotFound } from "../pages/notFound";
import {NewDappContainer, BuildDetailsContainer, ConfigureDappContainer} from "../pages/newDappForm"
import API from '../services/api';
import {ListResponse} from '../services/api/types'

import { DappCreateArgs,DappData, Tiers, emptyUserResponse, UserResponseData } from '../types';
import { CreateDappState, ConfigureDappState, DappDetail, CreateDapp } from "../components";


export interface NewDappFormBaseProps extends RouteComponentProps {
  user : UserResponseData
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


export const NewDappFormBase: React.SFC<NewDappFormBaseProps> = ({user, setUser, API, ...props}) => {
    const buildingDappDetails = useRef({
      DappName: "Building ... ",
      Web3URL: "Building ... ",
      ContractAddr: "Building ... ",
      DnsName: "Building ... "
    } as DappDetail);
    const [DappName, setDappName] = useState("")
    const [createResponse, sendCreateRequest] = useResource(API.private.create());
    const [listResponse, sendListRequest] = useResource(API.private.list(),[]);
    
    const [availableNumOfDapps, markAvailableNumOfDapps ] = useState(-1)
    const [fetchListSent, markFetchListSent] = useState(false);
    
    const handleFetchList= async() => { 
      markFetchListSent(true);
      try {
        await API.refreshAuthorization();
        sendListRequest();
      } catch (err) {
        Alert.error(`Error fetching dapp list : ${err.message || err.toString()}`)
      }
    }

    useEffect(() => {
      handleFetchList()
    }, []);

    useEffect(() => {
      if (!fetchListSent){
        return
      }

      if (listResponse.isLoading){
        
      } else if (listResponse.error) {
        markFetchListSent(false)
        switch (listResponse.error.code) {
          default: {
            Alert.error(listResponse.error.data.message);
          }
        }
      } else if(listResponse.data){
        markFetchListSent(false);
        const {count} = listResponse.data.data
        const totalAvailableDapps = parseInt(user.User.UserAttributes['custom:standard_limit'])
        markAvailableNumOfDapps(totalAvailableDapps - count)
        Alert.success("Access Granted", { timeout: 750 });      
      }
      
    }, [listResponse]);

    


    // ----- CREATE RESPONSE HANDLER ----- 
    const [createSent, markCreateSent] = useState(false);
    const handleCreate = (dappArgs: DappCreateArgs) => {
      
      const dappData:DappData = omit(dappArgs, ['DappName'])
      markCreateSent(true);
      Alert.info(`Making request...`)
      sendCreateRequest(dappData,dappArgs.DappName)
    }
    useEffect(() => {
      if (!createSent){
        return
      }

      if (createResponse.isLoading){
        Alert.info("Creating dapp", { timeout: 750});
      } else if (createResponse.error) {
        markCreateSent(false)
        switch (createResponse.error.code) {
          default: {
            Alert.error(createResponse.error.data.message);
          }
        }
      } else if(createResponse.data){
        markCreateSent(false);
        Alert.success(` Build for: ${DappName} started`);
        navigate(`/home/new/${DappName}/build`);    
      }
      
    }, [createResponse]);

    
    const handleStep1 = (e:any, inputs: CreateDappState) => {
      if (availableNumOfDapps<=0){
        Alert.error(`Please purchase more dapp slots before creating more dapps.`, { timeout: 3000})
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
              buildingDappDetails.current.DappName = DappName;
              buildingDappDetails.current.Web3URL = web3URL;
              buildingDappDetails.current.ContractAddr = contractAddress;
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
            dappName={buildingDappDetails.current.DappName}
            dapp={buildingDappDetails.current}
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
  