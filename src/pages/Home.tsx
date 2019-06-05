import React, { FC, useState, useEffect } from 'react';
import Alert from 'react-s-alert';
import { RouteComponentProps, NavigateFn } from '@reach/router';
import { useResource } from 'react-request-hook';
import { DappArgs, DappArgNameStrs, SampleDappArgs } from '../types';

import ABIClerk from '../services/abiClerk';
import { DappList, DappForm } from '../components';

interface HomeProps extends RouteComponentProps {
  user? : any
  setUser : (user:any)=>void
}
// data:{
//   data:{
//       items:{
//           0:{
//               Abi: ""
//               ContractAddr: "0x6D47c9bE6E60744c9A5bD2Ea51a603e80f018ac1"
//               CreationTime: "2019-05-23T04:03:59.051Z"
//               DappName: "enigma-data-marketplace"
//               DnsName: "enigma-data-marketplace.dapp.bot"
//               GuardianURL: "https://guardian.dapp.bot"
//               OwnerEmail: "huertasjuan23@gmail.com"
//               Web3URL: "https://mainnet.infura.io/v3/fc6533b42279480299a402a8059bcc90"
//           }
//       }
//   }
// }

export const Home:FC<HomeProps> = ({user, setUser, ...props}) => {

  const [formArgs, setArgs] = useState(SampleDappArgs())

  // Note that adding an empty dependency array means this hook
  // will run on mount, then never again (unless called)
  const [listResponse, sendListRequest] = useResource(ABIClerk.list(user));
  let dappList:DappArgs[] = [];
  if (listResponse && listResponse.data && (['The incoming token has expired', 'Unauthorized'].includes((listResponse.data as any).message))){
    let newUser = Object.assign(user, { signInUserSession : null });
    (props.navigate as NavigateFn)('/login');
    setUser(newUser);
  }
  try {
    if (listResponse.data){
      dappList.push(...(listResponse as any).data.data.items)
    }
    console.log(listResponse)
  } catch (e) {
    console.log('Error when trying to load from listResponse: ',e);
  }
  useEffect(()=>sendListRequest(), [sendListRequest]);

  const [formTarget, unsafeSetFormTarget] = useState('create');
  const [formTouched, setFormTouched] = useState(false);
  const setFormTarget = (target:string) => {
    if (formTouched){
      if (!window.confirm("You've modified the form, are you sure you want to leave it?")){
        return false;
      }
    }
    if (target === 'create'){
      setArgs(SampleDappArgs());
    } else {
      let targetRecord = dappList.find(record => record.DappName === target);
      if (targetRecord){
        setArgs(targetRecord)
      } else {
        Alert.error("Could not find the selected dapp to edit.");
      }
    }
    setFormTouched(false);
    unsafeSetFormTarget(target);
  }

  const setArgVal = (name:DappArgNameStrs,val:string) => {
    const newArgs:DappArgs = Object.assign({}, formArgs);
    newArgs[name] = val;
    setFormTouched(true);
    setArgs(newArgs)
  }

  const [createResponse, sendCreateRequest] = useResource(ABIClerk.create(user));
  const [editResponse, sendEditRequest] = useResource(ABIClerk.edit(user));
  const [deleteResponse, sendDeleteRequest] = useResource(ABIClerk.delete(user));
  
  let request = sendCreateRequest;
  let response = createResponse;
  if (formTarget !== 'create') {
    request = sendEditRequest;
    response = editResponse;
  }
  return (
    <div className="container">

      <h3 className="mt-5">Your Dapps</h3>
      <div className="card">
        <div className="card-body">
          <DappList dappList={dappList} 
          fetchList={sendListRequest}
          setFormTarget={setFormTarget} 
          dappsLoading={listResponse.isLoading}
          dappLoadErr={listResponse.error}
          delete={sendDeleteRequest}
          deleteResponse={deleteResponse}
          user={user}/>
        </div>
      </div>

      <h3 className="mt-5">Create/Edit Dapp</h3>
      <div className="card">
        <div className="card-body">
          <DappForm args={formArgs} 
            setArgVal={setArgVal}
            response={response} 
            formTarget={formTarget}
            sendRequest={request} />
          </div>
        </div>
    </div>
  )
}

export default Home;