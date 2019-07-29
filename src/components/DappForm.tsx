import React, { FC, useState, useEffect } from 'react';
import { DappCreateArgs, DappArgNameStrs } from '../types';
import FormFields from './FormFields';
import Alert from 'react-s-alert';
import { Button } from './ui';

export interface DappFormProps {
  sendRequest : any
  response : any
  args : DappCreateArgs
  setArgVal : (name:DappArgNameStrs,val:string)=>void
  formTarget: string
}

export const DappForm:FC<DappFormProps> = (props) => {
  const { sendRequest, response, args, setArgVal } = props;
  const { isLoading, data, error } = response;

  const submitForm = ()=>{
    sendRequest(args)
    Alert.info("One moment, confirming your dapp is being created...")
  }; 

  // Handle errors appearing
  useEffect(()=>{
    if (error){
      Alert.error(`Error: ${error.message}`)
    }
  }, [error]);

  // Handle a successful return
  useEffect(()=>{
    if (!isLoading && data && data.data){
      Alert.success(`Success!  ${data.data.message}  Your dapp will be available in about five minutes.`);
    }
  }, [isLoading, data])

  const formSettings = {
    disabled : [] as DappArgNameStrs[],
    hidden : ['GuardianURL'] as DappArgNameStrs[]
  };
  const isCreate = props.formTarget === 'create';
  if (!isCreate){
    formSettings.disabled.push('DappName');
  }
  let title = isCreate ? 'Create a Dapp' : `Edit ${args.DappName}`;

  return (
    <>
      <h3>{ title }</h3>
      <FormFields {...args} {...formSettings}
        setVal={setArgVal} />
      <Button onClick={submitForm} block disabled={isLoading}>
        Submit
      </Button>
    </>
  )
}

export default DappForm;