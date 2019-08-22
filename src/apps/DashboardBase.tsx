import React, { useEffect, useState } from "react";
import { useResource } from "react-request-hook";
import { Router, navigate, RouteComponentProps } from "@reach/router";
import Alert from 'react-s-alert';
import { DashboardContainer, DappDetailsContainer, DeleteDappContainer } from "../pages/dashboard";
import API from '../services/api';
import { getErrMsg } from '../services/util';
import { DeleteDappState } from "../components";
import { NotFound } from "../pages/notFound";
import { UserResponseData } from "../types";

export interface Props extends RouteComponentProps {
  setUser: (user: UserResponseData) => void
  API: API
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

export const DashboardBase: React.SFC<Props> = ({ setUser, API, ...props }) => {

  ///////////////////////////
  // GET DAPP LIST LOGIC
  ///////////////////////////
  const [listResponse, requestList] = useResource(API.private.list());
  async function makeListRequest() {
    try {
      const refreshedAPI = await API.refreshAuthorization();
      if (refreshedAPI === API) {
        requestList();
      }
    } catch (err) {
      Alert.error(`Error refreshing your session : ${getErrMsg(err)}`)
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
  const [deleteResponse, requestDelete] = useResource(API.private.delete());
  async function makeDeleteRequest(dappName: string) {
    try {
      const refreshedAPI = await API.refreshAuthorization({ userMustRetry : true });
      if (refreshedAPI === API) {
        requestDelete(dappName);
      }
    } catch (err) {
      Alert.error(`Error sending delete : ${getErrMsg(err)}`)
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
      Alert.success(`Your dapp was successfully deleted!`, { timeout: 500 });
      makeListRequest()
      navigate(`/home`);
    }
  }, [deleteResponse])

  //EDIT RESPONSE HANDLER
  const [editResponse, sendEditRequest] = useResource(API.private.edit());

  //PROP DRILL: props for DappDetailsContainer && DashboardContainer
  let dappList: DappDetail[] = [];
  let dappsLoading: boolean = true;
  try {
    if (listResponse.data) {
      dappList.push(...(listResponse as any).data.data.items)
      dappsLoading = false;
    }
  }
  catch (e) {
    console.log('Error when trying to load from listResponse: ', e);
    dappsLoading = false;
  }

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