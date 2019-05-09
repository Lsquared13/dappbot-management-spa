import React, { FC, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useResource } from 'react-request-hook';
import { DappArgs, DappArgNameStrs } from '../types';
import { Header, DappForm, DappList } from '../components';
import { Box } from '../components/ui';

interface HomeProps extends RouteComponentProps {
  user? : any
}

export const Home:FC<HomeProps> = ({user}) => {

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

  const [createResponse, sendCreateRequest] = useResource((args:DappArgs) => {
    return {
      url : `${process.env.REACT_APP_DAPPSMITH_ENDPOINT}/test/create`,
      method : 'POST',
      data : args,
      // TODO: Figure out how to actually access AuthToken from user
      // DONE: Correct syntax is user.signInUserSession.accessToken
      headers : {"Authorization":user && user.signInUserSession.accessToken}
    }
  })
  

  
  
  return (
    <div style={{paddingLeft:'10%',paddingRight:'10%',paddingTop:'4%'}}>
      <Header />
      <DappList user={user}/>
      <DappForm args={args} 
        setArgVal={setArgVal}
        response={createResponse} 
        sendRequest={sendCreateRequest} />
    </div>
  )
}

export default Home;