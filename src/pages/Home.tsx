import React, { FC, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
// @ts-ignore
import { useResource } from 'react-request-hook';
import { FormArgVals, FormArgNameStrs } from '../types';
import { Button, Text } from '../components/ui';
import Header from '../components/Header';
import FormFields from '../components/FormFields';

interface HomeProps extends RouteComponentProps {
  user? : any
}

export const Home:FC<HomeProps> = (props) => {

  const [args, setArgs] = useState({
    DappName: '',
    Owner: '',
    Abi: '',
    Web3URL: '',
    GuardianURL: '',
    ContractAddr: ''
  })

  const setArgVal = (name:FormArgNameStrs,val:string) => {
    const newArgs:FormArgVals = Object.assign({}, args);
    newArgs[name] = val;
    setArgs(newArgs)
  }

  const [createResponse, sendCreateRequest] = useResource((args:FormArgVals) => {
    return {
      url : `${process.env.REACT_APP_DAPPSMITH_ENDPOINT}/test/create`,
      method : 'POST',
      data : args,
      // TODO: Figure out how to actually access AuthToken from user
      headers : {"Authorization":props.user && props.user.AuthToken}
    }
  })
  const [sent, markSent] = useState(false);
  const sendArgsToDappsmith = ()=>{
    sendCreateRequest(args)
    markSent(true)
  }; 

  let resultStr = '';
  if (sent && createResponse.isLoading){
    resultStr = 'One moment...';
  } else if (sent && !createResponse.isLoading){
    if (createResponse.error){
      resultStr = createResponse.error.message.toString();
    }
    if (createResponse.data){
      resultStr = createResponse.data.toString();
    }
  }
  
  return (
    <>
      <Header />
      <FormFields {...args} setVal={setArgVal} />
      <Button onClick={sendArgsToDappsmith} block>Submit</Button>
      <Text>{resultStr}</Text>
    </>
  )
}

export default Home;