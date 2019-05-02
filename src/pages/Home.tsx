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

  const [response, sendRequest] = useResource((args:FormArgVals) => {
    return {
      url : `${process.env.REACT_APP_DAPPSMITH_ENDPOINT}/test/create`,
      method : 'POST',
      data : args
    }
  })
  const [sent, markSent] = useState(false);
  const sendArgsToDappsmith = ()=>{
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