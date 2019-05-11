import React, { FC, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useResource } from 'react-request-hook';
import { DappArgs, DappArgNameStrs } from '../types';
import { DappForm } from '../components';
import ABIClerk from '../services/abiClerk';

//eould have to fetch the list and filter by the path router.

import '../components/froala/bootstrap.min.css';
import '../components/froala/froala_blocks.min.css';

interface DappDetailsProps extends RouteComponentProps {
  user? : any
  id? : string
  setUser: (newUser:any)=>void
}

export const DappDetails:FC<DappDetailsProps> = ({user, id, setUser}) => {

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

  const [createResponse, sendCreateRequest] = useResource(ABIClerk.create(user))
  
  return (
    <div className="container">

      <h3 className="mt-5">Cryptokitty Dapp</h3>
      <div className="card">
        <div className="card-body">

        <div className="row">
          <div className="col-sm-6">
            <h5 className="card-title">Domain</h5>
            <p className="card-text">cryptokitty.dapp.bot</p>
          </div>
          <div className="col-sm-6 text-right">
           <a className="btn btn-outline-primary" href="https://eximchain.com" rel="noopener noreferrer" target="_blank">View Dapp</a>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-sm-12">
            <h5 className="card-title">Abi</h5>
            <textarea className="form-control" readOnly>cryptokitty cryptokitty cryptokitty cryptokitty cryptokitty cryptokitty</textarea> 
          </div>
        </div>

        </div>
      </div>


      <h3 className="mt-5">Edit Dapp</h3>
      <div className="card">
        <div className="card-body">
          <DappForm args={args} 
          setArgVal={setArgVal}
          response={createResponse} 
          formTarget='edit'
          sendRequest={sendCreateRequest} />
        </div>
      </div>

      <h3 className="mt-5">Delete Dapp</h3>
      <div className="card">
        <div className="card-body">
          <p className="card-text">Dapp will be removed from your account and the Dapps's subdomain will be able to access by other users. This can not be undone.</p>
          <button className="btn btn-danger">Delete Dapp</button>
        </div>
      </div>

      
    </div>
  )
}

export default DappDetails;