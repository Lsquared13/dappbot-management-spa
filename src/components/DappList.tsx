import React, { FC, useState } from 'react';
import { useResource } from 'react-request-hook';
import {Table, TableColumn, Text, Button } from './ui';
import { DappArgNames, DappArgs } from '../types'; 

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

  const dappList:DappArgs[] = [
    {
      DappName : 'Weyl',
      Abi : 'test',
      Web3URL : 'https://gamma-tx-executor-us-east.eximchain-dev.com',
      GuardianURL : 'dummy',
      ContractAddr : '0x00000000000000000000000002A'
    },
    {
      DappName : 'CryptoKitty',
      Abi : 'test',
      Web3URL : 'https://my-api.infura.com',
      GuardianURL : 'dummy',
      ContractAddr : '0x02984750980928723084709822A'
    }
  ];
  let noDappMessage = '';
  // Disabling parsing of actual call while I test GUI
  // if (dappListResponse.data){
  //   dappList.push(dappListResponse.data);
  // } else if (dappListResponse.isLoading) {
  //   noDappMessage = "Checking for any dapps..."
  // } else if (dappListResponse.error) {
  //   console.log(dappListResponse.error);
  //   noDappMessage = dappListResponse.error.message;
  // }

  if (noDappMessage !== ''){
    console.log('Returning following noDappMsg: ',noDappMessage);
    return (<Text> { noDappMessage } </Text>);
  } else {
    if (dappList.length === 0){
      return (
        <Text>
          You haven't made any dapps yet.
        </Text>
      )
    }

    console.log('Trying to return a Table');

    const renderHeader = (header:TableColumn) => {
      if (header.field === 'Actions') {
        return <Button onClick={resendListRequest}>Check Again</Button>
      } else {
        return <strong>{header.displayName}</strong>
      }
    }

    const renderCell = (record:DappArgs, field:string) => {
      if (Object.values(DappArgNames).includes(field)){
        return record[field];
      } else if (field === 'Actions') {
        return (
          <Button>Delete</Button>
        )
      } else {
        throw new Error(`DappList was asked to render an unexpected field: ${field}`)
      }
    }

    const columns = [
      {field:'DappName', displayName:'Name'},
      {field:'ContractAddr', displayName:'Deployed Address'},
      {field:'Web3URL',displayName:'Web3 URL'},
      {field:'Actions', displayName: ' '}
    ]

    return (
      <Table records={dappList} 
        renderCell={renderCell}
        renderHeader={renderHeader}
        columns={columns} />
    )
  }
}

export default DappList;