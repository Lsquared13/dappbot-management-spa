import React, { FC, useState, useEffect } from 'react';
import { DappArgs, DappArgNameStrs } from '../types';
import FormFields from './FormFields';
import Alert from 'react-s-alert';
import { Button } from './ui';

export interface DappFormProps {
  sendRequest : any
  response : any
  args : DappArgs
  setArgVal : (name:DappArgNameStrs,val:string)=>void
  formTarget: string
}

export const DappForm:FC<DappFormProps> = (props) => {
  const { sendRequest, response, args, setArgVal } = props;

  const [alertId, setAlertId] = useState(0);

  const submitForm = ()=>{
    sendRequest(args)
    Alert.close(alertId);
    setAlertId(Alert.info("One moment, confirming your dapp is being created..."));
  }; 

  // Handle errors appearing
  useEffect(()=>{
    if (response.error){
      Alert.close(alertId);
      setAlertId(Alert.error(`Error: ${response.error.message}`));
    }
  }, [response.error, alertId]);

  // Handle a successful return
  useEffect(()=>{
    if (!response.isLoading && response.data && response.data.data){
      Alert.close(alertId);
      setAlertId(Alert.success(`Success!  ${response.data.data.message}  Your dapp will be available in about five minutes.`));
    }
  }, [response.isLoading, response.data, alertId])

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
      <Button onClick={submitForm} block disabled={response.isLoading}>
        Submit
      </Button>
    </>
  )
}

export default DappForm;