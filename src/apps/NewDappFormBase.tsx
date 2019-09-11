import React, { useState, useEffect, useRef } from 'react';
import { useResource } from 'react-request-hook';
import { Router, navigate, RouteComponentProps, NavigateFn } from "@reach/router";
import Alert from 'react-s-alert';

import DappbotAPI from '@eximchain/dappbot-api-client';
import Dapp from '@eximchain/dappbot-types/spec/dapp';
import User from '@eximchain/dappbot-types/spec/user';
import Response from '@eximchain/dappbot-types/spec/responses';
import { CreateDapp as CreateDappTypes } from '@eximchain/dappbot-types/spec/methods/private';

import { NotFound } from '../pages'
import { NewDappContainer, BuildDetailsContainer, ConfigureDappContainer } from "../pages/newDappForm"
import { CreateDappState, ConfigureDappState } from "../components";
import { getErrMsg } from '../services/util';


export interface NewDappFormBaseProps extends RouteComponentProps {
  user: User.AuthData
  API: DappbotAPI
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
  } as Dapp.Item.Api);
  const [DappName, setDappName] = useState("")

  ///////////////////////////
  // GET DAPP LIST LOGIC
  ///////////////////////////
  const [listResponse, requestList] = useResource(API.private.list.resource);
  const [availableNumOfDapps, markAvailableNumOfDapps] = useState(-1)
  async function makeListRequest() {
    if (API.hasActiveAuth()) {
      requestList()
    } else if (API.hasStaleAuth()) {
      API.loginViaRefresh()
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
    } else if (Response.isSuccessResponse(data)) {
      const { count } = data.data
      const totalAvailableDapps = parseInt(user.User.UserAttributes['custom:standard_limit'])
      markAvailableNumOfDapps(totalAvailableDapps - count)
      Alert.success("Access Granted", { timeout: 750 });
    }
  }, [listResponse]);


  ///////////////////////////
  // DAPP CREATE LOGIC
  ///////////////////////////
  const [createResponse, requestCreate] = useResource(API.private.create.resource);
  async function makeCreateRequest(dappName:string, dappArgs: CreateDappTypes.Args) {
    if (API.hasActiveAuth()) {
      requestCreate(dappName, dappArgs);
    } else {
      API.loginViaRefresh();
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
      let args: CreateDappTypes.Args = {
        Abi: contractABI,
        Web3URL: web3URL,
        GuardianURL: "https://guardian.dapp.bot",
        ContractAddr: contractAddress,
        Tier: Dapp.Tiers.Standard
      }
      buildingDappDetails.current.DappName = DappName;
      buildingDappDetails.current.Web3URL = web3URL;
      buildingDappDetails.current.ContractAddr = contractAddress;
      makeCreateRequest(DappName, args)
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
