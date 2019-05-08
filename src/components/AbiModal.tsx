import React, { FC, useState } from 'react';
import JSONTree from 'react-json-tree';
import Modal from 'react-modal';

export interface AbiModalProps {
  Abi: string,
  DappName: string,
  onClose: ()=>void,
  isOpen: boolean
}

// TODO: Make this behave!
export const AbiModal:FC<AbiModalProps> = ({Abi, DappName, ...props}) => {
  let contents;
  try {
    const ABI = JSON.parse(Abi);
    contents = <JSONTree data={ABI} 
      shouldExpandNode={(key:any,data:any,level:number) => {
        return level <= 2;
      }}
      hideRoot sortObjectKeys />;
  } catch {
    contents = (
      <>
      <p>Your ABI doesn't look like a valid JSON:</p>
      <div>{JSON.stringify(Abi, undefined, 2)}</div>
      </>
    )
  }
  let heading = `${DappName} ABI`
  return (
    <Modal 
      contentLabel={heading}
      onRequestClose={props.onClose}
      isOpen={props.isOpen}
      role='popup'>
      { contents }
    </Modal>
  )
}

export default AbiModal;