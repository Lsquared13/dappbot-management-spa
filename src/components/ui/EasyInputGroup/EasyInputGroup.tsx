import React, { FC, ReactElement } from 'react';
import { InputGroup, InputTitle, InputContainer } from '../../../layout';
import { Box } from '../../ui';


export interface EasyInputGroupProps {
    title: string
    children: ReactElement
}

export const EasyInputGroup: FC<EasyInputGroupProps> = ({ title, children }) => (
    <InputGroup>
      <InputTitle color="gray">{title}</InputTitle>
      <InputContainer>
        <Box column={12} mdColumn={12} width='100%'>
          {children}
        </Box>
      </InputContainer>
    </InputGroup>
)

export default EasyInputGroup;