import React, { FunctionComponent } from 'react';
import validate from 'validator';
import { DappCreateArgs, DappArgNameStrs } from '../types';
import StringField from './fields/StringField';
import AddressField from './fields/AddressField';

interface FormFieldProps extends DappCreateArgs {
  setVal: (name:DappArgNameStrs,val:string)=>void
  disabled?: DappArgNameStrs[]
  hidden?: DappArgNameStrs[]
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

  const cleanDappName = (val:string) => {
    return val.toLowerCase()
      .replace(/\s/g, '-') // Convert spaces to hyphens
      .replace(/[^A-Za-z0-9-]/g, '') // Remove non-alphanumerics
  }

  const onlyVisible = (name:DappArgNameStrs, field:React.ReactNode) => {
    if (props.hidden && props.hidden.includes(name)){
      return null;
    }
    return field;
  }

  const isDisabled = (name:DappArgNameStrs) => props.disabled && props.disabled.includes(name);

  const noEdgeHyphens = (val:string) => {
    return val.charAt(0) !== '-' && val.charAt(val.length - 1) !== '-'
  }

  return (
    <section>
      {
        onlyVisible('DappName', 
          <StringField 
            value={DappName} 
            displayName={'Dapp URL Subdomain'}
            name={'DappName'} 
            disabled={isDisabled('DappName')}
            help={'This name will be lower-cased, and must begin and end with a letter or number.  Only letters, numbers, and hyphens please!'}
            clean={cleanDappName}
            isValid={noEdgeHyphens}
            onChange={setDappName}/>
        )
      }
      {
        onlyVisible('ContractAddr', 
          <AddressField 
            value={ContractAddr} 
            name={'ContractAddr'} 
            disabled={isDisabled('ContractAddr')}
            displayName={'Dapp Contract Deployed Address'}
            onChange={setContractAddr}/>
        )
      }
      {
        onlyVisible('Abi', 
          <StringField 
            value={Abi} 
            name={'Abi'} 
            displayName={'Dapp Contract ABI'}
            isValid={validate.isJSON}
            disabled={isDisabled('Abi')}
            errorMsg={"Please enter a valid ABI JSON for your contract."}
            onChange={setAbi}/>
        )
      }
      {
        onlyVisible('Web3URL', 
          <StringField 
            value={Web3URL} 
            name={'Web3URL'} 
            displayName={'Web3 URL'}
            isValid={(val:string)=>{return validate.isURL(val) && val.indexOf('https://') === 0}}
            disabled={isDisabled('Web3URL')}
            help={"This is your dapp's Web3 HTTP Provider URL, determining which network it interacts with.  It must begin with https://."}
            errorMsg={"Please enter a valid URL for a Web3 HTTP Provider on your network.  It must begin with https://"}
            onChange={setWeb3URL}/>
        )
      }
      {
        onlyVisible('GuardianURL', 
          <StringField 
            value={GuardianURL} 
            name={'GuardianURL'} 
            displayName={'Guardian URL'}
            disabled={isDisabled('GuardianURL')}
            isValid={validate.isURL}
            errorMsg={"Please enter a valid Guardian URL."}
            onChange={setGuardianURL}/>   
        )
      }
    </section>
  )
}

export default FormFields;