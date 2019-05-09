import React, { FC, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useResource } from 'react-request-hook';
import { DappArgs, DappArgNameStrs } from '../types';
import { Header, DappForm, DappList } from '../components';
import ABIClerk from '../services/abiClerk';

interface DappDetailsProps extends RouteComponentProps {
  user? : any
  id?: any
}

//eould have to fetch the list and filter by the path router.
export const DappDetails:FC<DappDetailsProps> = ({user,id}) => {

  const [args, setArgs] = useState({
    DappName: '',
    Abi: '',
    Web3URL: '',
    GuardianURL: '',
    ContractAddr: ''
  })

  const setArgVal = (name:DappArgNameStrs,val:string) => {
    const newArgs:DappArgs = Object.assign({}, args);
    newArgs[name] = val;
    setArgs(newArgs)
  }

  const [createResponse, sendCreateRequest] = useResource(ABIClerk.create(user))
  
  return (
    <div style={{paddingLeft:'10%',paddingRight:'10%',paddingTop:'4%'}}>
      <Header />
      {id}
    </div>
  )
}

export default DappDetails;