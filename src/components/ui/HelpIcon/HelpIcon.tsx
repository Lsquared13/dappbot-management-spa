import React, { FC, useState } from 'react';
import Flyout from '../Flyout';
import Icon from '../Icon';
import Box from '../Box';
import Text from '../Text';

export interface HelpIconProps {
  helpTxt: string,

}

export const HelpIcon:FC<HelpIconProps> = (props) => {
  return (
    <Flyout 
      size="sm"
      shouldFocus={false}
      idealDirection={'up'}
      positionRelativeToAnchor
      label={props.helpTxt}
      ariaLabel={props.helpTxt}>
      <Icon icon='help' />
    </Flyout>
  )
}

export default HelpIcon;