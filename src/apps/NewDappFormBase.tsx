import React, { useState, useEffect, useRef } from 'react';
import { useResource } from 'react-request-hook';
import { Router, navigate, RouteComponentProps, NavigateFn } from "@reach/router";
import Alert from 'react-s-alert';
import omit from 'lodash.omit';

import { NotFound } from "../pages/notFound";
import { NewDappContainer, BuildDetailsContainer, ConfigureDappContainer } from "../pages/newDappForm"
import API from '../services/api';
import { ListResponse } from '../services/api/types'

import { DappCreateArgs, DappData, Tiers, emptyUserResponse, UserResponseData } from '../types';
import { CreateDappState, ConfigureDappState, DappDetail, CreateDapp } from "../components";
import { getErrMsg } from '../services/util';


export interface NewDappFormBaseProps extends RouteComponentProps {
  user: UserResponseData
  API: API
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


export const NewDappFormBase: React.SFC<NewDappFormBaseProps> = ({ user, API, ...props }) => {
  const buildingDappDetails = useRef({
    DappName: "Building ... ",
    Web3URL: "Building ... ",
    ContractAddr: "Building ... ",
    DnsName: "Building ... "
  } as DappDetail);
  const [DappName, setDappName] = useState("")

  ///////////////////////////
  // GET DAPP LIST LOGIC
  ///////////////////////////
  const [listResponse, requestList] = useResource(API.private.list());
  const [availableNumOfDapps, markAvailableNumOfDapps] = useState(-1)
  async function makeListRequest() {
    try {
      const refreshedAPI = await API.refreshAuthorization();
      if (refreshedAPI === API) {
        requestList();
      }
    } catch (err) {
      Alert.error(`Error fetching dapp list : ${getErrMsg(err)}`)
    }
  }
  useEffect(function fetchListOnStartAndAPI() {
    // Note that by making this effect depend on the API
    // object, we will automatically refetch whenever the
    // Authorization changes (i.e. produces a new API instance).
    //
    // That is why handleFetchList() doesn't need to do
    // anything when the API is stale; it will get called
    // again once it is fresh.
    makeListRequest()
  }, [API]);
  useEffect(function handleListResponse() {
    const { isLoading, error, data } = listResponse;
    if (isLoading) return;
    if (error) {
      switch (error.code) {
        default: {
          Alert.error(`Error fetching your dapp list : ${getErrMsg(error)}`);
        }
      }
    } else if (data) {
      const { count } = data.data
      const totalAvailableDapps = parseInt(user.User.UserAttributes['custom:standard_limit'])
      markAvailableNumOfDapps(totalAvailableDapps - count)
      Alert.success("Access Granted", { timeout: 750 });
    }
  }, [listResponse]);


  ///////////////////////////
  // DAPP CREATE LOGIC
  ///////////////////////////
  const [createResponse, requestCreate] = useResource(API.private.create());
  async function makeCreateRequest(dappArgs: DappCreateArgs) {
    const dappData: DappData = omit(dappArgs, ['DappName'])
    const refreshedAPI = await API.refreshAuthorization({ userMustRetry : true });
    if (refreshedAPI === API) {
      Alert.info(`Making request...`)
      requestCreate(dappData, dappArgs.DappName)
    }
  }
  useEffect(function handleCreateResponse() {
    const { isLoading, error, data } = createResponse;
    if (isLoading) {
      Alert.info("Creating dapp", { timeout: 750 });
      return;
    } else if (error) {
      switch (error.code) {
        default: {
          Alert.error(`Error creating your dapp: ${getErrMsg(error)}`);
        }
      }
    } else if (data) {
      Alert.success(` Build for: ${DappName} started`);
      navigate(`/home/new/${DappName}/build`);
    }

  }, [createResponse]);


  ///////////////////////////
  // TRANSITION FXNS
  ///////////////////////////

  function completeStep1(e: any, inputs: CreateDappState) {
    if (availableNumOfDapps <= 0) {
      Alert.error(`Please purchase more dapp slots before creating more dapps.`, { timeout: 3000 })
      return
    }
    const { dappName } = inputs
    setDappName(dappName)
    navigate(`/home/new/step-2`);
  }

  function completeStep2(e: any, inputs: ConfigureDappState) {
    let { contractAddress, contractABI, web3URL } = inputs
    if (DappName == "") {
      navigate(`/home/new/step-1`);
      Alert.error("We need you to enter the dapp's name again; please do not refresh the page while creating a dapp.");
    }
    else {
      let args: DappCreateArgs = {
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
      makeCreateRequest(args)
    }
  }

  return (
    <Router>
      <NewDappContainer
        path="/step-1"
        onCancel={(e, inputs: CreateDappState) => {
          navigate(`/home/`);
        }}
        onConfigDapp={completeStep1}
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
        onCreateDapp={completeStep2}
        onInputChange={inputs => {
          if (DappName == "") {
            navigate(`/home/new/step-1`);
            Alert.error("We need you to enter the dapp's name again; please do not refresh the page while creating a dapp.");
          }
        }}
      />
      <BuildDetailsContainer
        path="/:dappName/*"
        building={true}
        dappName={buildingDappDetails.current.DappName}
        dapp={buildingDappDetails.current}
        onStatusCopy={() => { }}
        defaultTab="status"
        settingOptions={SETTING_OPTIONS}
        onTabChange={(dappName: string) => {
          navigate(`/home/new/building/build`);
        }}
        redirect={() => {
          if (DappName == "") {
            navigate(`/home`);
          }
        }}
      />
      <NotFound default />
    </Router>
  );
};
