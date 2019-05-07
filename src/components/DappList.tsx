import React, { FC, useState } from 'react';
// @ts-ignore
import { useResource } from 'react-request-hook';
import {Table, Text } from './ui';

interface DappListProps {
  user:any
}

export const DappList:FC<DappListProps> = (props) => {

  const [dappListResponse, resendListRequest] = useResource(() => {
    return {
      url : `${process.env.REACT_APP_DAPPSMITH_ENDPOINT}/test/list`,
      method : 'POST',
      // TODO: Figure out how to actually access AuthToken from user
      headers : {"Authorization":props.user && props.user.AuthToken}
    }
    // Note that adding an empty dependency array means this hook
    // will run on mount, then never again (unless called)
  }, [])

  const dappList = [];
  let noDappMessage = '';
  if (dappListResponse.data){
    dappList.push(dappListResponse.data);
  } else if (dappListResponse.isLoading) {
    noDappMessage = "Checking for any dapps..."
  } else if (dappListResponse.error) {
    noDappMessage = dappListResponse.error.toString();
  }

  if (noDappMessage !== ''){
    return (<Text> { noDappMessage } </Text>);
  } else {
    if (dappList.length === 0){
      return (
        <Text>
          You haven't made any dapps yet.
        </Text>
      )
    }

    return (
      <Table records={dappList} />
    )
  }
}

export default DappList;