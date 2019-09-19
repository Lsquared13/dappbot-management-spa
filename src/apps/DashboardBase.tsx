import React, { useEffect, useState } from "react";
import { useResource } from "react-request-hook";
import { Router, navigate, RouteComponentProps } from "@reach/router";
import Alert from 'react-s-alert';
import DappbotAPI from '@eximchain/dappbot-api-client';
import Dapp from '@eximchain/dappbot-types/spec/dapp';
import { isSuccessResponse } from "@eximchain/dappbot-types/spec/responses";

import { DashboardContainer, DappDetailsContainer, DeleteDappContainer } from "../pages/dashboard";
import { getErrMsg, sleep } from '../services/util';
import { DeleteDappState } from "../components";
import { NotFound } from "../pages";

export interface Props extends RouteComponentProps {
  API: DappbotAPI
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

export const DashboardBase: React.SFC<Props> = ({ API, ...props }) => {

  ///////////////////////////
  // GET DAPP LIST LOGIC
  ///////////////////////////
  const [listResponse, requestList] = useResource(API.private.listDapps.resource);
  async function makeListRequest() {
    if (API.hasActiveAuth()) {
      requestList();
    } else if (API.hasStaleAuth()) {
      try {
        API.loginViaRefresh();
      } catch (err) {
        console.log('Error refreshing API: ',err);
      }
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
    return listResponse.cancel
  }, [API]);
  useEffect(function handleListResponse() {
    const { isLoading, error } = listResponse;
    if (isLoading) {
      Alert.info("Fetching Dapp List", { timeout: 750 });
      return;
    }
    else if (error) {
      switch (error.code) {
        default: {
          console.error('Error fetching Dapp List: ', error)
          Alert.error(`Error fetching your dapp list: ${getErrMsg(error)}`);
        }
      }
    }
  }, [listResponse]);

  ///////////////////////////
  // DAPP DELETE LOGIC
  ///////////////////////////
  const [deleteResponse, requestDelete] = useResource(API.private.deleteDapp.resource);
  async function makeDeleteRequest(dappName: string) {
    if (API.hasActiveAuth()) {
      requestDelete(dappName);
    } else if (API.hasStaleAuth()) {
      try {
        API.loginViaRefresh();
      } catch (err) {
        console.log('Error refreshing API: ',err);
      }
    }
  }
  useEffect(function handleDeleteResponse() {
    const { isLoading, error, data } = deleteResponse;
    if (isLoading) {
      Alert.info(`Deleting dapp ...`, { timeout: 500 });
      return;
    }
    else if (error) {
      switch (error.code) {
        default: {
          console.error("Error on deleting dapp: ", error);
          Alert.error(`Error deleting your dapp : ${getErrMsg(error)}`);
        }
      }
    }
    else if (data) {
      Alert.success(`Your dapp was successfully deleted!  It should disappear from the list in a moment.`, { timeout: 1500 });
      // Taking a one-second nap here ensures that the DynamoDB
      // records are actually updated by the time our request
      // hits the Lambda.
      sleep(1).then(makeListRequest) 
      navigate(`/home`);
    }
  }, [deleteResponse])

  //EDIT RESPONSE HANDLER
  const [editResponse, sendEditRequest] = useResource(API.private.updateDapp.resource);

  //PROP DRILL: props for DappDetailsContainer && DashboardContainer
  let dappList: Dapp.Item.Api[] = isSuccessResponse(listResponse.data) ? listResponse.data.data.items : [];
  let dappsLoading: boolean = listResponse.isLoading;

  return (
    <div>
      <Router>
        <DashboardContainer
          path="/"
          dapps={dappList}
          dappsLoading={dappsLoading}
          onRefresh={() => {
            makeListRequest()
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
            if (dappName) {
              makeDeleteRequest(dappName);
              navigate(`/home`);
            }
          }}
          onInputChange={inputs => {
            return
          }}
          defaultTab="settings"
          settingOptions={SETTING_OPTIONS}
          onTabChange={(dappName: string) => {
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
          onTabChange={(dappName: string) => {
            navigate(`/home/${dappName}/delete`);
          }}
        />
        <NotFound default />

      </Router>
    </div>
  );
};


export default DashboardBase;