import React, { FunctionComponent } from 'react';
import { FormArgVals, FormArgNameStrs } from '../types';
import StringField from './fields/StringField';
import AddressField from './fields/AddressField';
const isEmail = require('isemail');

interface FormFieldProps extends FormArgVals {
  setVal: (name:FormArgNameStrs,val:string)=>void
}

export const FormFields:FunctionComponent<FormFieldProps> = (props)=>{
  const {
    DappName, Owner, Abi, Web3URL, GuardianURL, ContractAddr, setVal
  } = props;

  const setValFactory = (...fieldNames:FormArgNameStrs[]) => {
    return fieldNames.map(fieldName => (newVal:string)=>{setVal(fieldName, newVal)})
  };

  const [
    setDappName, setOwner, setAbi, setWeb3URL, setGuardianURL, setContractAddr
  ] = setValFactory('DappName', 'Owner', 'Abi', 'Web3URL', 'GuardianURL', 'ContractAddr')

  const isValidJSON = (str:string) => {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
  }

  const isValidEmail = (val:string) => {
    return isEmail.validate(val, {errorLevel:false}) as boolean;
  }

  const isValidURL = (val:string) => {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(val);
  }

  // Spaces to hyphens, eliminate non-alphanumerics
  const cleanDappName = (val:string) => {
    let spaceToHyphen = val.replace(/\s/g, '-');
    return spaceToHyphen.replace(/[^A-Za-z0-9-]/g, '').toLowerCase();
  }

  return (
    <section>
      <StringField 
        value={Owner} 
        name={'Owner'} 
        displayName={'Dapp Owner Email'}
        isValid={isValidEmail}
        errorMsg={"Please enter a valid email to own this Dapp."}
        onChange={setOwner}/>
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
        isValid={isValidJSON}
        errorMsg={"Please enter a valid ABI JSON for your contract."}
        onChange={setAbi}/>
      <StringField 
        value={Web3URL} 
        name={'Web3URL'} 
        displayName={'Web3 URL'}
        isValid={isValidURL}
        errorMsg={"Please enter a valid URL for a Web3 HTTP Provider on your network."}
        onChange={setWeb3URL}/>
      <StringField 
        value={GuardianURL} 
        name={'GuardianURL'} 
        displayName={'Guardian URL'}
        isValid={isValidURL}
        errorMsg={"Please enter a valid Guardian URL."}
        onChange={setGuardianURL}/>
    </section>
  )
}

export default FormFields;