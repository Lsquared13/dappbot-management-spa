import React, { FC, useState, useEffect } from 'react';
import Alert from 'react-s-alert';
import { RouteComponentProps, NavigateFn } from '@reach/router';
import { useResource } from 'react-request-hook';
import { DappCreateArgs, DappArgNameStrs, SampleDappArgs, UserResponse, defaultUserResponse } from '../types';

import ABIClerk from '../services/abiClerk';
import { DappList, DappForm } from '../components';

interface HomeProps extends RouteComponentProps {
  user : UserResponse
  setUser : (user:UserResponse)=>void
}

export const Home:FC<HomeProps> = ({user, setUser, ...props}) => {

  const [formArgs, setArgs] = useState(SampleDappArgs())

  // Note that adding an empty dependency array means this hook
  // will run on mount, then never again (unless called)
  const [listResponse, sendListRequest] = useResource(ABIClerk.list(user));
  let dappList:DappCreateArgs[] = [];
  if (listResponse && listResponse.data && (['The incoming token has expired', 'Unauthorized'].includes((listResponse.data as any).message))){
    let newUser = defaultUserResponse();
    (props.navigate as NavigateFn)('/login');
    setUser(newUser);
  }
  try {
    if (listResponse.data){
      dappList.push(...(listResponse as any).data.data.items)
    }
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
    const newArgs:DappCreateArgs = Object.assign({}, formArgs);
    newArgs[name] = val;
    setFormTouched(true);
    setArgs(newArgs)
  }

  const [createResponse, sendCreateRequest] = useResource(ABIClerk.create(user));
  const [editResponse, sendEditRequest] = useResource(ABIClerk.edit(user));
  const [deleteResponse, sendDeleteRequest] = useResource(ABIClerk.delete(user));
  
  const isCreateForm = formTarget === 'create';
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
            response={isCreateForm ? createResponse : editResponse}
            formTarget={formTarget}
            sendRequest={isCreateForm ? sendCreateRequest : sendEditRequest} />
          </div>
        </div>
    </div>
  )
}

export default Home;