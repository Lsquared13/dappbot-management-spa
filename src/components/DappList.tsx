import React, { FC, useState, useEffect } from 'react';
import { Table, TableColumn, Text, Button, Flyout, Icon } from './ui';
import copy from 'copy-to-clipboard';
import Alert from 'react-s-alert';
import { DappArgNames, DappArgs } from '../types';

interface DappListProps {
  user: any
  dappsLoading?: boolean
  dappLoadErr?: any
  dappList: DappArgs[]
  fetchList: () => any
  setFormTarget: (dappName: string) => void
  delete: (dappName: string) => void
  deleteResponse: any
}

export const DappList: FC<DappListProps> = ({ dappList, fetchList, ...props }) => {
  const { deleteResponse } = props;
  let refreshLabel = "Refresh your list of dapps"
  const refreshButton = (
    <Flyout label={refreshLabel} ariaLabel={refreshLabel}>
      <Button size='small'
        style='quietSecondary'
        theme='outlineNeutral'
        onClick={fetchList}>
        <Icon icon='cycle' type='thick' />
      </Button>
    </Flyout>
  )

  const handleCopy = (val: string) => {
    copy(val)
    Alert.success("Successfully copied to your clipboard!");
  }

  const [deleteSent, markDeleteSent] = useState(false);
  const handleDelete = (dappName: string) => {
    markDeleteSent(true);
    Alert.info(`Deleting ${dappName} now...`)
    props.delete(dappName);
  }

  useEffect(() => {
    if (deleteSent) {
      if (deleteResponse.error) {
        Alert.error(`There was an error deleting your dapp: ${deleteResponse.error.message}`)
      } else if (!deleteResponse.isLoading && deleteResponse.data) {
        Alert.success(`Your dapp was successfully deleted!`);
        fetchList()
        markDeleteSent(false);
      }
    }
  }, [deleteSent, deleteResponse, fetchList])

  const renderHeader = (header: TableColumn) => {
    if (header.field === 'Actions') {
      let createLabel = "Create a new dapp"
      return (
        <span style={{float:'right'}}>
          {refreshButton}
          <Flyout label={createLabel} ariaLabel={createLabel}>
            <Button size='small'
              style='quietSecondary'
              theme='outlineNeutral'
              onClick={() => props.setFormTarget('create')}>
              <Icon icon='add' type='thick' />
            </Button>
          </Flyout>
        </span>
      )
    } else {
      return <strong>{header.displayName}</strong>
    }
  }

  const renderCell = (record: DappArgs, field: string) => {
    if (field === 'Actions') {
      let abiLabel = `Copy ${record.DappName} ABI to your clipboard`;
      let deleteLabel = `Delete ${record.DappName}`;
      let editLabel = `Edit ${record.DappName}`;
      let viewLabel = `Go to ${record.DappName}`;
      let baseDomain = (process.env.REACT_APP_DAPPSMITH_ENDPOINT as string).split('https://')[1]
      if (baseDomain.split('.').length > 2){
        let pieces = baseDomain.split('.');
        baseDomain = pieces.slice(pieces.length - 2, pieces.length).join('.')
      }
      return (
        <span style={{float:'right'}}>
          <Flyout label={viewLabel} ariaLabel={viewLabel}>
            <a target='_blank' rel="noopener noreferrer" href={`https://${record.DappName}.${baseDomain}`}>
              <Button size='small'
                style='quietSecondary'
                theme='outlineNeutral'>
                <Icon icon='world' type='thick' />
              </Button>
            </a>
          </Flyout>
          <Flyout label={abiLabel} ariaLabel={abiLabel}>
            <Button size='small'
              style='quietSecondary'
              theme='outlineNeutral'
              onClick={() => { handleCopy(record.Abi) }}>
              <Icon icon='copy' type='thick' />
            </Button>
          </Flyout>
          <Flyout label={editLabel} ariaLabel={editLabel}>
            <Button size='small'
              style='quietSecondary'
              onClick={() => { props.setFormTarget(record.DappName) }}
              theme='outlineNeutral'>
              <Icon icon='edit' type='thick' />
            </Button>
          </Flyout>
          <Flyout label={deleteLabel} ariaLabel={deleteLabel}>
            <Button size='small'
              style='quietSecondary'
              onClick={() => { handleDelete(record.DappName) }}
              theme='outlineNeutral'>
              <Icon icon='trash' type='thick' />
            </Button>
          </Flyout>
        </span>
      )
    } else if (Object.values(DappArgNames).includes(field)) {
      let val = record[field];
      let truncated = val.length > 32 ? `${val.slice(0,29)}...` : val;
      let tooltipMsg = `(Click to Copy)${truncated !== val ? ' '+val : ''}`;
      return (
        <Flyout label={tooltipMsg} ariaLabel={tooltipMsg}>
          <span onClick={()=> { handleCopy(val) }}>{ truncated }</span>
        </Flyout>
      )
    } else {
      throw new Error(`DappList was asked to render an unexpected field: ${field}`)
    }
  }

  const columns = [
    { field: 'DappName', displayName: 'Name' },
    { field: 'ContractAddr', displayName: 'Deployed Address' },
    { field: 'Web3URL', displayName: 'Web3 URL' },
    { field: 'Actions', displayName: ' ' }
  ]

  let noDappMessage = '';
  if (props.dappsLoading) {
    noDappMessage = "Checking for any dapps..."
  } else if (dappList.length === 0) {
    noDappMessage = "You haven't made any dapps yet."
  }

  if (noDappMessage !== '') {
    return (<Text> {noDappMessage} {refreshButton} </Text>);
  }

  return (
    <>
      <Table records={dappList}
        renderCell={renderCell}
        renderHeader={renderHeader}
        columns={columns} />
    </>
  )
}

export default DappList;