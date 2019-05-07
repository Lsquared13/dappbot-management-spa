import React, { FunctionComponent } from 'react';
import validate from 'validator';
import { DappArgs, DappArgNameStrs } from '../types';
import StringField from './fields/StringField';
import AddressField from './fields/AddressField';

interface FormFieldProps extends DappArgs {
  setVal: (name:DappArgNameStrs,val:string)=>void
}

export const FormFields:FunctionComponent<FormFieldProps> = (props)=>{
  const {
    DappName, Abi, Web3URL, GuardianURL, ContractAddr, setVal
  } = props;

  const setValFactory = (...fieldNames:DappArgNameStrs[]) => {
    return fieldNames.map(fieldName => (newVal:string)=>{setVal(fieldName, newVal)})
  };

  const [
    setDappName, setAbi, setWeb3URL, setGuardianURL, setContractAddr
  ] = setValFactory('DappName', 'Abi', 'Web3URL', 'GuardianURL', 'ContractAddr')

  // Spaces to hyphens, eliminate non-alphanumerics
  const cleanDappName = (val:string) => {
    let spaceToHyphen = val.replace(/\s/g, '-');
    return spaceToHyphen.replace(/[^A-Za-z0-9-]/g, '').toLowerCase();
  }

  return (
    <section>
      <StringField 
        value={DappName} 
        displayName={'Dapp URL Subdomain'}
        name={'DappName'} 
        help={'This name will be lower-cased and have spaces replaced with dashes when used in the URL.  Only letters and numbers, please!'}
        clean={cleanDappName}
        onChange={setDappName}/>
      <AddressField 
        value={ContractAddr} 
        name={'ContractAddr'} 
        displayName={'Dapp Contract Deployed Address'}
        onChange={setContractAddr}/>
      <StringField 
        value={Abi} 
        name={'Abi'} 
        displayName={'Dapp Contract ABI'}
        isValid={validate.isJSON}
        errorMsg={"Please enter a valid ABI JSON for your contract."}
        onChange={setAbi}/>
      <StringField 
        value={Web3URL} 
        name={'Web3URL'} 
        displayName={'Web3 URL'}
        isValid={validate.isURL}
        errorMsg={"Please enter a valid URL for a Web3 HTTP Provider on your network."}
        onChange={setWeb3URL}/>
      <StringField 
        value={GuardianURL} 
        name={'GuardianURL'} 
        displayName={'Guardian URL'}
        isValid={validate.isURL}
        errorMsg={"Please enter a valid Guardian URL."}
        onChange={setGuardianURL}/>
    </section>
  )
}

export default FormFields;