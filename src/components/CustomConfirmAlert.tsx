import React, { ReactElement } from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Title } from '../layout';
import { Text, Button, Box } from './ui';

interface CustomUIOptions {
  title: string
  message: string
  onClose: () => void
}

type CustomConfirmAlert = (customUiOptions: CustomUIOptions) => React.ReactNode

interface CustomConfirmFactoryArgs {
  title: string
  message: string | string[]
  onConfirm: () => void
}

/**
 * This function is meant to be used in tandem with `react-confirm-alert`.
 * That library has all the logic hooked up, this factory will ensure
 * that confirm alerts also have our styling.  Usage is like:
 * 
 * confirmAlert({
 *   customUI : CustomConfirmFactory({ title, message, onConfirm })
 * })
 * 
 * @param args 
 */
export function CustomConfirmFactory(args: CustomConfirmFactoryArgs) {
  const { title, message, onConfirm } = args;
  const newConfirm: CustomConfirmAlert = ({ onClose }: CustomUIOptions) => {
    let messageElts = [];
    if (Array.isArray(message)) {
      message.forEach((eachMsg, i) => {
        messageElts.push(...[
          <Text key={i * 2}>{eachMsg}</Text>,
          <br key={i * 2 + 1} />
        ])
      })
    } else {
      messageElts.push(...[
        <Text key={0}>{message}</Text>,
        <br key={1} />
      ])
    }
    return (
      <div className='react-confirm-alert-body'>
        <Box display='block'>
          <Text size='xl' 
            smSize='xl'
            mdSize='xl'
            lgSize='xl'
            bold textTransform='capitalize'>{title}</Text>
          <br />
          { messageElts }
        </Box>
        <Box display='flex'>
          <Box flex='grow' display='flex' paddingX={1}>
            <Button
              block
              theme='outlineNeutral'
              onClick={onClose}>
              No
            </Button>
          </Box>
          <Box flex='grow' display='flex' paddingX={1}>
            <Button
              block
              theme='outlineBlue'
              onClick={onConfirm}>
              Yes
            </Button>
          </Box>
        </Box>
      </div>
    )
  };
  return newConfirm;
}

export default CustomConfirmFactory;