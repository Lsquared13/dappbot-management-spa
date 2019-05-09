import React, { FC, useState } from 'react';
import { useResource } from 'react-request-hook';
import {Table, TableColumn, Text, Button, Flyout, Icon } from './ui';
import Alert from 'react-s-alert';
import { DappArgNames, DappArgs } from '../types'; 
import copy from 'copy-to-clipboard';

interface DappListProps {
  user:any
}

export const DappList:FC<DappListProps> = (props) => {

  const [dappListResponse, resendListRequest] = useResource(() => {
    return {
      url : `${process.env.REACT_APP_DAPPSMITH_ENDPOINT}/test/list`,
      method : 'POST',
      // TODO: Figure out how to actually access AuthToken from user
      headers : {"Authorization":props.user && props.user.AuthToken}
    }
    // Note that adding an empty dependency array means this hook
    // will run on mount, then never again (unless called)
  }, [])

  const dappList:DappArgs[] = [
    {
      DappName : 'Weyl',
      Abi : `[{"constant":false,"inputs":[{"name":"_withdrawIndex","type":"uint256"}],"name":"finalizeWithdraw","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"registrant","type":"address"}],"name":"hasApplied","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"registrant","type":"address"}],"name":"approveKYC","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"GovernanceCycleDelayCeiling","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"removedOwner","type":"address"}],"name":"removeOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"withdrawHistory","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"registrant","type":"address"}],"name":"isKYCPending","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"registrant","type":"address"}],"name":"registerGoverning","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"registrant","type":"address"}],"name":"isKYCDenied","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"newGovernanceCycle","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_voted_for","type":"address"},{"name":"_election","type":"bool"},{"name":"_inSupport","type":"bool"},{"name":"_votes","type":"uint16"}],"name":"vote","outputs":[{"name":"index","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"maybeOwner","type":"address"}],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_governanceCycleId","type":"uint256"},{"name":"_ballotId","type":"uint256"}],"name":"startWithdraw","outputs":[{"name":"ok","type":"bool"},{"name":"index","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"appealKYC","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"registrant","type":"address"}],"name":"revokeKYC","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"delayInSeconds","type":"uint256"}],"name":"setGovernanceCycleDelay","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newRegistry","type":"address"}],"name":"updatePersonalRegistry","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"nomineeBallots","outputs":[{"name":"governanceCycleId","type":"uint256"},{"name":"election","type":"bool"},{"name":"votes","type":"int24"},{"name":"positiveVotes","type":"uint24"},{"name":"negativeVotes","type":"uint24"},{"name":"totalVoters","type":"uint24"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"registrant","type":"address"}],"name":"revokeGoverning","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"registrant","type":"address"}],"name":"registerNonGoverning","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"registrant","type":"address"}],"name":"approveGoverning","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"registrant","type":"address"}],"name":"canGovern","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"maxNominees","type":"uint16"}],"name":"setMaxNomineesInCycle","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"AverageMonth","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"registrant","type":"address"}],"name":"deleteKYC","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MaxNomineesInCycleCeiling","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"governanceCycleRecords","outputs":[{"name":"totalPayments","type":"uint32"},{"name":"status","type":"uint8"},{"name":"electionVotesElected","type":"int24"},{"name":"evictionVotesEvicted","type":"int24"},{"name":"totalVoters","type":"uint24"},{"name":"elected","type":"address"},{"name":"evicted","type":"address"},{"name":"start","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"findWinners","outputs":[{"name":"","type":"address"},{"name":"","type":"int24"},{"name":"","type":"address"},{"name":"","type":"int24"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"NominationFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"ballotRecords","outputs":[{"name":"governanceCycleId","type":"uint256"},{"name":"voter","type":"address"},{"name":"voted_for","type":"address"},{"name":"withdrawRecordId","type":"uint256"},{"name":"timestamp","type":"uint256"},{"name":"amount","type":"uint32"},{"name":"votes","type":"uint16"},{"name":"election","type":"bool"},{"name":"inSupport","type":"bool"},{"name":"withdrawRecord","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"addOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"nomineesInCycle","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"finalizeGovernanceCycle","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"registrant","type":"address"}],"name":"getRegistration","outputs":[{"name":"","type":"uint8"},{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"delayInSeconds","type":"uint256"}],"name":"setWithdrawDelay","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"currentGovernanceCycle","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"numOwners","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"withdrawRecords","outputs":[{"name":"amount","type":"uint32"},{"name":"status","type":"uint8"},{"name":"governanceCycleId","type":"uint256"},{"name":"beneficiary","type":"address"},{"name":"ballotId","type":"uint256"},{"name":"timestamp","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"ballotHistory","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"WithdrawDelayFloor","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"applyKYC","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"latestGovernanceCycleParticipated","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"NominationFeeCeiling","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"WithdrawDelayCeiling","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MaxNomineesInCycle","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"registrant","type":"address"}],"name":"denyKYC","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"WithdrawDelay","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MaxNomineesInCycleFloor","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"numRegistered","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"feeInEXC","type":"uint256"}],"name":"setNominationFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"ballotIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"nomineeBallotKeys","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"electionNomineesInCycle","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"evictionNomineesInCycle","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"withdrawRecordsIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"GovernanceCycleDelayFloor","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"registrant","type":"address"}],"name":"processKYC","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"registrant","type":"address"}],"name":"isKYCApproved","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"NominationFeeFloor","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"GovernanceCycleDelay","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"approvingOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnerAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"removingOwner","type":"address"},{"indexed":true,"name":"removedOwner","type":"address"}],"name":"OwnerRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"updatingEntry","type":"address"},{"indexed":true,"name":"newRegistry","type":"address"}],"name":"UpdatedPersonalRegistry","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"newEntry","type":"address"}],"name":"AppliedKYC","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"removingOwner","type":"address"},{"indexed":true,"name":"removedEntry","type":"address"},{"indexed":false,"name":"finalKYC","type":"uint8"},{"indexed":false,"name":"finalPersonalRegistry","type":"address"}],"name":"DeletedKYC","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"approvingOwner","type":"address"},{"indexed":true,"name":"pendingEntry","type":"address"}],"name":"ProcessedKYC","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"approvingOwner","type":"address"},{"indexed":true,"name":"approvedEntry","type":"address"}],"name":"ApprovedKYC","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"revertingOwner","type":"address"},{"indexed":true,"name":"entry","type":"address"}],"name":"RevokedKYC","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"denyingOwner","type":"address"},{"indexed":true,"name":"deniedEntry","type":"address"}],"name":"DeniedKYC","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"appealingRegistrant","type":"address"}],"name":"AppealedKYC","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"approvingOwner","type":"address"},{"indexed":true,"name":"voter","type":"address"}],"name":"ApprovedGoverning","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"revokingOwner","type":"address"},{"indexed":true,"name":"nonvoter","type":"address"}],"name":"RevokedGoverning","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"registeringOwner","type":"address"},{"indexed":true,"name":"voter","type":"address"}],"name":"RegisteredGoverning","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"registeringOwner","type":"address"},{"indexed":true,"name":"nonvoter","type":"address"}],"name":"RegisteredNonGoverning","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_delayInSeconds","type":"uint256"}],"name":"GovernanceCycleDelayUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"cycleId","type":"uint256"}],"name":"CycleStarted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"cycleId","type":"uint256"}],"name":"CycleFinalized","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newMaker","type":"address"},{"indexed":false,"name":"cycleId","type":"uint256"}],"name":"AddedBlockMaker","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldMaker","type":"address"},{"indexed":false,"name":"cycleId","type":"uint256"}],"name":"RemovedBlockMaker","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_newFee","type":"uint256"}],"name":"NominationFeeUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_newMaxNominees","type":"uint16"}],"name":"MaxNomineesInCycleUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_voter","type":"address"},{"indexed":false,"name":"_ballotIndex","type":"uint256"},{"indexed":false,"name":"_voted_for","type":"address"},{"indexed":false,"name":"_election","type":"bool"},{"indexed":false,"name":"_inSupport","type":"bool"},{"indexed":false,"name":"_votes","type":"uint16"}],"name":"Voted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_withdrawIndex","type":"uint256"},{"indexed":false,"name":"_voter","type":"address"},{"indexed":false,"name":"_governanceCycleId","type":"uint256"},{"indexed":false,"name":"_ballotId","type":"uint256"}],"name":"WithdrawStartedEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_withdrawIndex","type":"uint256"},{"indexed":false,"name":"_voter","type":"address"},{"indexed":false,"name":"_governanceCycleId","type":"uint256"},{"indexed":false,"name":"_ballotId","type":"uint256"}],"name":"WithdrawFinalizedEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"delayInSeconds","type":"uint256"}],"name":"WithdrawDelayUpdated","type":"event"}]`,
      Web3URL : 'https://gamma-tx-executor-us-east.eximchain-dev.com',
      GuardianURL : 'https://some-guardian.com',
      ContractAddr : '0x00000000000000000000000002A'
    },
    {
      DappName : 'CryptoKitty',
      Abi : 'test',
      Web3URL : 'https://my-api.infura.com',
      GuardianURL : 'dummy',
      ContractAddr : '0x02984750980928723084709822A'
    }
  ];
  let noDappMessage = '';
  // Disabling parsing of actual call while I test GUI
  // if (dappListResponse.data){
  //   dappList.push(dappListResponse.data);
  // } else if (dappListResponse.isLoading) {
  //   noDappMessage = "Checking for any dapps..."
  // } else if (dappListResponse.error) {
  //   console.log(dappListResponse.error);
  //   noDappMessage = dappListResponse.error.message;
  // }

  if (noDappMessage !== ''){
    return (<Text> { noDappMessage } </Text>);
  } else {
    if (dappList.length === 0){
      return (
        <Text>
          You haven't made any dapps yet.
        </Text>
      )
    }

    const handleCopy = (record:DappArgs) => {
      copy(record.Abi)
      Alert.success("ABI copied to your clipboard!");
    }

    const handleDelete = () => { console.log('Hit the delete button!') }

    const handleEdit = () => { console.log('Hit the edit button!') }

    const renderHeader = (header:TableColumn) => {
      if (header.field === 'Actions') {
        return (
          <Button size='small' 
            style='quietSecondary'
            theme='outlineNeutral'
            onClick={resendListRequest}>
            <Icon icon='cycle' type='thick' />
          </Button>
        )
      } else {
        return <strong>{header.displayName}</strong>
      }
    }

    const renderCell = (record:DappArgs, field:string) => {
      if (field === 'Actions') {
        let abiLabel = `Copy ${record.DappName} ABI to your clipboard`;
        let deleteLabel = `Delete ${record.DappName}`;
        let editLabel = `Edit ${record.DappName}`;
        return (
          <>
            <Flyout label={abiLabel} ariaLabel={abiLabel}>
              <Button size='small' 
                style='quietSecondary'
                theme='outlineNeutral'
                onClick={()=>{ handleCopy(record) }}>
                <Icon icon='copy' type='thick' />
              </Button>
            </Flyout>
            <Flyout label={editLabel} ariaLabel={editLabel}>
              <Button size='small' 
                style='quietSecondary' 
                onClick={handleEdit}
                theme='outlineNeutral'>
                <Icon icon='edit' type='thick' />
              </Button>
            </Flyout>
            <Flyout label={deleteLabel} ariaLabel={deleteLabel}>
            <Button size='small' 
                style='quietSecondary' 
                onClick={handleDelete}
                theme='outlineNeutral'>
                <Icon icon='trash' type='thick' />
              </Button>
            </Flyout>
          </>
        )
      } else if (Object.values(DappArgNames).includes(field)){
        return record[field];
      } else {
        throw new Error(`DappList was asked to render an unexpected field: ${field}`)
      }
    }

    const columns = [
      {field:'DappName', displayName:'Name'},
      {field:'ContractAddr', displayName:'Deployed Address'},
      {field:'Web3URL',displayName:'Web3 URL'},
      {field:'Actions', displayName: ' '}
    ]

    return (
      <>
        <Table records={dappList} 
          renderCell={renderCell}
          renderHeader={renderHeader}
          columns={columns} />
      </>
    )
  }
}

export default DappList;