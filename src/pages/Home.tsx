import React, { FC, useState, useEffect } from 'react';
import Alert from 'react-s-alert';
import { RouteComponentProps } from '@reach/router';
import { useResource, UseResourceResult } from 'react-request-hook';
import { DappArgs, DappArgNameStrs, SampleDappArgs } from '../types';
import { Header, DappForm, DappList } from '../components';
import ABIClerk from '../services/abiClerk';
import Navigation from '../components/froala/Navigation';

interface HomeProps extends RouteComponentProps {
  user? : any
  setUser : (user:any)=>void
}

export const Home:FC<HomeProps> = ({user}) => {

  const [formArgs, setArgs] = useState(SampleDappArgs())

  // Note that adding an empty dependency array means this hook
  // will run on mount, then never again (unless called)
  const [listResponse, sendListRequest] = useResource(ABIClerk.list(user));
  let dappList:DappArgs[] = listResponse.data && (listResponse as any).data.data.items || [];
  // dappList.push(...[
  //   {
  //     DappName : 'Weyl',
  //     Abi : `[{"constant":false,"inputs":[{"name":"_withdrawIndex","type":"uint256"}],"name":"finalizeWithdraw","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"registrant","type":"address"}],"name":"hasApplied","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"registrant","type":"address"}],"name":"approveKYC","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"GovernanceCycleDelayCeiling","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"removedOwner","type":"address"}],"name":"removeOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"withdrawHistory","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"registrant","type":"address"}],"name":"isKYCPending","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"registrant","type":"address"}],"name":"registerGoverning","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"registrant","type":"address"}],"name":"isKYCDenied","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"newGovernanceCycle","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_voted_for","type":"address"},{"name":"_election","type":"bool"},{"name":"_inSupport","type":"bool"},{"name":"_votes","type":"uint16"}],"name":"vote","outputs":[{"name":"index","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"maybeOwner","type":"address"}],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_governanceCycleId","type":"uint256"},{"name":"_ballotId","type":"uint256"}],"name":"startWithdraw","outputs":[{"name":"ok","type":"bool"},{"name":"index","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"appealKYC","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"registrant","type":"address"}],"name":"revokeKYC","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"delayInSeconds","type":"uint256"}],"name":"setGovernanceCycleDelay","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newRegistry","type":"address"}],"name":"updatePersonalRegistry","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"nomineeBallots","outputs":[{"name":"governanceCycleId","type":"uint256"},{"name":"election","type":"bool"},{"name":"votes","type":"int24"},{"name":"positiveVotes","type":"uint24"},{"name":"negativeVotes","type":"uint24"},{"name":"totalVoters","type":"uint24"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"registrant","type":"address"}],"name":"revokeGoverning","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"registrant","type":"address"}],"name":"registerNonGoverning","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"registrant","type":"address"}],"name":"approveGoverning","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"registrant","type":"address"}],"name":"canGovern","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"maxNominees","type":"uint16"}],"name":"setMaxNomineesInCycle","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"AverageMonth","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"registrant","type":"address"}],"name":"deleteKYC","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MaxNomineesInCycleCeiling","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"governanceCycleRecords","outputs":[{"name":"totalPayments","type":"uint32"},{"name":"status","type":"uint8"},{"name":"electionVotesElected","type":"int24"},{"name":"evictionVotesEvicted","type":"int24"},{"name":"totalVoters","type":"uint24"},{"name":"elected","type":"address"},{"name":"evicted","type":"address"},{"name":"start","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"findWinners","outputs":[{"name":"","type":"address"},{"name":"","type":"int24"},{"name":"","type":"address"},{"name":"","type":"int24"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"NominationFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"ballotRecords","outputs":[{"name":"governanceCycleId","type":"uint256"},{"name":"voter","type":"address"},{"name":"voted_for","type":"address"},{"name":"withdrawRecordId","type":"uint256"},{"name":"timestamp","type":"uint256"},{"name":"amount","type":"uint32"},{"name":"votes","type":"uint16"},{"name":"election","type":"bool"},{"name":"inSupport","type":"bool"},{"name":"withdrawRecord","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"addOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"nomineesInCycle","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"finalizeGovernanceCycle","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"registrant","type":"address"}],"name":"getRegistration","outputs":[{"name":"","type":"uint8"},{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"delayInSeconds","type":"uint256"}],"name":"setWithdrawDelay","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"currentGovernanceCycle","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"numOwners","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"withdrawRecords","outputs":[{"name":"amount","type":"uint32"},{"name":"status","type":"uint8"},{"name":"governanceCycleId","type":"uint256"},{"name":"beneficiary","type":"address"},{"name":"ballotId","type":"uint256"},{"name":"timestamp","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"ballotHistory","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"WithdrawDelayFloor","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"applyKYC","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"latestGovernanceCycleParticipated","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"NominationFeeCeiling","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"WithdrawDelayCeiling","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MaxNomineesInCycle","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"registrant","type":"address"}],"name":"denyKYC","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"WithdrawDelay","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MaxNomineesInCycleFloor","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"numRegistered","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"feeInEXC","type":"uint256"}],"name":"setNominationFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"ballotIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"nomineeBallotKeys","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"electionNomineesInCycle","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"evictionNomineesInCycle","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"withdrawRecordsIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"GovernanceCycleDelayFloor","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"registrant","type":"address"}],"name":"processKYC","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"registrant","type":"address"}],"name":"isKYCApproved","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"NominationFeeFloor","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"GovernanceCycleDelay","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"approvingOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnerAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"removingOwner","type":"address"},{"indexed":true,"name":"removedOwner","type":"address"}],"name":"OwnerRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"updatingEntry","type":"address"},{"indexed":true,"name":"newRegistry","type":"address"}],"name":"UpdatedPersonalRegistry","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"newEntry","type":"address"}],"name":"AppliedKYC","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"removingOwner","type":"address"},{"indexed":true,"name":"removedEntry","type":"address"},{"indexed":false,"name":"finalKYC","type":"uint8"},{"indexed":false,"name":"finalPersonalRegistry","type":"address"}],"name":"DeletedKYC","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"approvingOwner","type":"address"},{"indexed":true,"name":"pendingEntry","type":"address"}],"name":"ProcessedKYC","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"approvingOwner","type":"address"},{"indexed":true,"name":"approvedEntry","type":"address"}],"name":"ApprovedKYC","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"revertingOwner","type":"address"},{"indexed":true,"name":"entry","type":"address"}],"name":"RevokedKYC","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"denyingOwner","type":"address"},{"indexed":true,"name":"deniedEntry","type":"address"}],"name":"DeniedKYC","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"appealingRegistrant","type":"address"}],"name":"AppealedKYC","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"approvingOwner","type":"address"},{"indexed":true,"name":"voter","type":"address"}],"name":"ApprovedGoverning","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"revokingOwner","type":"address"},{"indexed":true,"name":"nonvoter","type":"address"}],"name":"RevokedGoverning","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"registeringOwner","type":"address"},{"indexed":true,"name":"voter","type":"address"}],"name":"RegisteredGoverning","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"registeringOwner","type":"address"},{"indexed":true,"name":"nonvoter","type":"address"}],"name":"RegisteredNonGoverning","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_delayInSeconds","type":"uint256"}],"name":"GovernanceCycleDelayUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"cycleId","type":"uint256"}],"name":"CycleStarted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"cycleId","type":"uint256"}],"name":"CycleFinalized","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newMaker","type":"address"},{"indexed":false,"name":"cycleId","type":"uint256"}],"name":"AddedBlockMaker","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldMaker","type":"address"},{"indexed":false,"name":"cycleId","type":"uint256"}],"name":"RemovedBlockMaker","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_newFee","type":"uint256"}],"name":"NominationFeeUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_newMaxNominees","type":"uint16"}],"name":"MaxNomineesInCycleUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_voter","type":"address"},{"indexed":false,"name":"_ballotIndex","type":"uint256"},{"indexed":false,"name":"_voted_for","type":"address"},{"indexed":false,"name":"_election","type":"bool"},{"indexed":false,"name":"_inSupport","type":"bool"},{"indexed":false,"name":"_votes","type":"uint16"}],"name":"Voted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_withdrawIndex","type":"uint256"},{"indexed":false,"name":"_voter","type":"address"},{"indexed":false,"name":"_governanceCycleId","type":"uint256"},{"indexed":false,"name":"_ballotId","type":"uint256"}],"name":"WithdrawStartedEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_withdrawIndex","type":"uint256"},{"indexed":false,"name":"_voter","type":"address"},{"indexed":false,"name":"_governanceCycleId","type":"uint256"},{"indexed":false,"name":"_ballotId","type":"uint256"}],"name":"WithdrawFinalizedEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"delayInSeconds","type":"uint256"}],"name":"WithdrawDelayUpdated","type":"event"}]`,
  //     Web3URL : 'https://gamma-tx-executor-us-east.eximchain-dev.com',
  //     GuardianURL : 'https://some-guardian.com',
  //     ContractAddr : '0x00000000000000000000000002A'
  //   },
  //   {
  //     DappName : 'CryptoKitty',
  //     Abi : 'test',
  //     Web3URL : 'https://my-api.infura.com',
  //     GuardianURL : 'dummy',
  //     ContractAddr : '0x02984750980928723084709822A'
  //   }
  // ])
  useEffect(()=>sendListRequest(), []);

  const [formTarget, unsafeSetFormTarget] = useState('create');
  const [formTouched, setFormTouched] = useState(false);
  const setFormTarget = (target:string) => {
    if (formTouched){
      if (!window.confirm("You've modified the form, are you sure you want to leave it?")){
        return false;
      }
    }
    if (target === 'create'){
      setArgs(SampleDappArgs());
    } else {
      let targetRecord = dappList.find(record => record.DappName === target);
      if (targetRecord){
        setArgs(targetRecord)
      } else {
        Alert.error("Could not find the selected dapp to edit.");
      }
    }
    setFormTouched(false);
    unsafeSetFormTarget(target);
  }

  const setArgVal = (name:DappArgNameStrs,val:string) => {
    const newArgs:DappArgs = Object.assign({}, formArgs);
    newArgs[name] = val;
    setFormTouched(true);
    setArgs(newArgs)
  }

  const [createResponse, sendCreateRequest] = useResource(ABIClerk.create(user));
  const [editResponse, sendEditRequest] = useResource(ABIClerk.edit(user));
  const [deleteResponse, sendDeleteRequest] = useResource(ABIClerk.delete(user));
  
  let request = sendCreateRequest;
  let response = createResponse;
  if (formTarget !== 'create') {
    request = sendEditRequest;
    response = editResponse;
  }
  return (
    <div className="container">
      <Navigation hideLogin={true} />

      <h3 className="mt-5">Your Dapps</h3>
      <div className="card">
        <div className="card-body">
          <DappList dappList={dappList} 
          fetchList={sendListRequest}
          setFormTarget={setFormTarget} 
          dappsLoading={listResponse.isLoading}
          dappLoadErr={listResponse.error}
          delete={sendDeleteRequest}
          deleteResponse={deleteResponse}
          user={user}/>
        </div>
      </div>

      <h3 className="mt-5">Create/Edit Dapp</h3>
      <div className="card">
        <div className="card-body">
          <DappForm args={formArgs} 
            setArgVal={setArgVal}
            response={response} 
            formTarget={formTarget}
            sendRequest={request} />
          </div>
        </div>
    </div>
  )
}

export default Home;