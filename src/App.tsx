import React, { useState, FC} from 'react';
// @ts-ignore
import { useResource } from 'react-request-hook';
import logo from './logo.svg';
import './App.css';
import './variable.css';
import './custom.css'
import Header from './components/Header';
import FormFields from './components/FormFields';
import Submission from './components/Submission';
import { FormArgVals, FormArgNameStrs } from './types';
import Box from './components/ui/Box';

const App: FC = () => {

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
    <div className="App body-right">
      <Box alignSelf='center' marginTop={12} marginLeft={12} marginRight={12}>
        <Header />
        <FormFields {...args} setVal={setArgVal} />
        <Submission submit={sendArgsToDappsmith} response={resultStr} />
      </Box>
    </div>
  );
}

export default App;
