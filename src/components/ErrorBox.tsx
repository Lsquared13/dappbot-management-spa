import React, { FC } from 'react';
import { Box, Text } from './ui';

export interface ErrorBoxProps {
  errMsg: string
}

export const ErrorBox:FC<ErrorBoxProps> = ({errMsg}) => {
  return errMsg !== '' ? (
    <Box color='lightGray' shape='pill'>
      <Text>{errMsg}</Text>
    </Box>
  ) : null;
}

export default ErrorBox;