import React, { FC, useState, Fragment } from 'react';
import Flyout from '../Flyout';
import Icon from '../Icon';
import Box from '../Box';
import Text from '../Text';

export interface HelpIconProps {
  helpTxt: string,

}

export const HelpIcon:FC<HelpIconProps> = (props) => {

  const [icon, setIcon] = useState(null);
  const setIconFreeType = (newIcon:any)=>{setIcon(newIcon)}
  
  const [isOpen, setOpen] = useState(false);
  const open = ()=>{ setOpen(true); }
  const close = () => { setOpen(false) }

  const flyoutHelp = (
    <Flyout onDismiss={close} 
      size="sm"
      shouldFocus={false}
      idealDirection={'up'}
      positionRelativeToAnchor
      // @ts-ignore Tell TS not to worry about the icon initially 
      // being null before we pass the ref over.
      anchor={icon}>
      <Box padding={3}>
        <Text bold color="white">
          <span>{props.helpTxt}</span>
        </Text>
      </Box>
    </Flyout>
  )

  return (
    <Fragment>
      <Icon icon='help' innerRef={(iconRef)=>setIconFreeType(iconRef)} onMouseOver={open} />  
      {isOpen && flyoutHelp}
    </Fragment>
  )
}

export default HelpIcon;