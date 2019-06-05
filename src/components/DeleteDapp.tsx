import React, { Component } from "react";
import { Box, Button, Input } from "./ui";
import {
  LayoutContainer,
  ButtonText,
  Description,
  InputContainer,
  InputGroup,
  InputTitle
} from "../layout";

export interface DeleteDappState {
  dappName: string;
}

export interface DeleteDappProps {
  onCancel: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    inputs: DeleteDappState
  ) => void;
  onDeleteDappBot: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    inputs: DeleteDappState
  ) => void;
  onInputChange?: (inputs: DeleteDappState) => void;
}

const cleanDappName = (val:string) => {
  return val.toLowerCase()
    .replace(/\s/g, '-') // Convert spaces to hyphens
    .replace(/[^A-Za-z0-9-]/g, '') // Remove non-alphanumerics
}

const noEdgeHyphens = (val:string) => {
  return val.charAt(0) !== '-' && val.charAt(val.length - 1) !== '-'
}


export class DeleteDapp extends Component<DeleteDappProps, DeleteDappState> {
  state = {
    dappName: ""
  };

  broadcastInputs = () => {
    let { onInputChange } = this.props;
    onInputChange && onInputChange(Object.assign({}, this.state));
  };

  onDappNameChange = (input: string) => {
      this.setState(
        {
          dappName: input
        },
        this.broadcastInputs
      );
  };

  render() {
    let { dappName } = this.state;
    let { onCancel, onDeleteDappBot } = this.props;
    return (
      <LayoutContainer>
        <Box display="flex" direction="column">
          <Box smColumn={12} mdColumn={8}>
            <Box marginBottom={9}>
              <Description>
                Deleting a Dapp will remove it’s history from your account.
                Before deleting yout account it will require you to confirm the
                deletion by inputing the name of your dapp below. After inputing
                the name click the button at the bottom right to complete Dapp
                deletion.
              </Description>
            </Box>
            <InputGroup>
              <InputTitle>Dapp Name</InputTitle>
   

              <Input 
              id={"1"}
              type={"text"}
            value={this.state.dappName} 
            name={'DappName'} 
            clean={cleanDappName}
            isValid={noEdgeHyphens}
            stateHook={this.onDappNameChange}
            placeholder= {"eg. Dapp Name"}/>
                
             
              <Description>
                Deleting this Dapp will make the name immediately available to
                other users. If you wish to keep the name be sure to create
                another Dapp with the same name soon after.
              </Description>
            </InputGroup>
          </Box>
          <Box display="flex" justifyContent="between" marginTop={12}>
            <Box width={100}>
              <Button
                block
                size="small"
                theme="outlineBlue"
                onClick={e => onCancel(e, this.state)}
              >
                <ButtonText>Cancel</ButtonText>
              </Button>
            </Box>
            <Box width={180}>
              <Button
                block
                size="small"
                onClick={e => onDeleteDappBot(e, this.state)}
              >
                <ButtonText>Delete from DappBot</ButtonText>
              </Button>
            </Box>
          </Box>
          {/* <Box
            alignItems="end"
            column={4}
            display="flex"
            justifyContent="center"
            marginLeft={8}
          /> */}
        </Box>
      </LayoutContainer>
    );
  }
}

export default DeleteDapp;
