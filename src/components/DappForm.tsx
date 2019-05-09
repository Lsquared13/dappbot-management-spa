import React, { FC, useState } from 'react';
import { DappArgs, DappArgNameStrs } from '../types';
import FormFields from './FormFields';
import { Button, Text } from './ui';

export interface DappFormProps {
  sendRequest : any
  response : any
  args : DappArgs
  setArgVal : (name:DappArgNameStrs,val:string)=>void
  formTarget: string
}

export const DappForm:FC<DappFormProps> = (props) => {
  const { sendRequest, response, args, setArgVal } = props;
  const [sent, markSent] = useState(false);

  const submitForm = ()=>{
    sendRequest(args)
    markSent(true)
  }; 

  let resultStr = '';
  if (sent && response.isLoading){
    resultStr = 'One moment...';
  } else if (sent && !response.isLoading){
    if (response.error){
      resultStr = response.error.message.toString();
    }
    if (response.data){
      resultStr = response.data.toString();
    }
  }

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
      <Button onClick={submitForm} block>Submit</Button>
      <Text>{resultStr}</Text>
    </>
  )
}

export default DappForm;