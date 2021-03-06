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
import Dapp from "@eximchain/dappbot-types/spec/dapp";

export interface DeleteDappState {
  dappNameInput: string;
}

export interface DeleteDappProps {
  dappName: string;
  onCancel: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    inputs: DeleteDappState
  ) => void;
  onDeleteDappBot: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    inputs: string
  ) => void;
  onInputChange?: (inputs: DeleteDappState) => void;
}



export class DeleteDapp extends Component<DeleteDappProps, DeleteDappState> {
  state = {
    dappNameInput: ""
  }; 
  broadcastInputs = () => {
    let { onInputChange } = this.props;
    onInputChange && onInputChange(Object.assign({}, this.state));
  };

  onDappNameChange = (input: string) => {
      this.setState(
        {
          dappNameInput: input
        },
        this.broadcastInputs
      );
  };

  render() {
    let { dappName} = this.props;
    let { dappNameInput } = this.state;
    let { onCancel, onDeleteDappBot } = this.props;
    let disableDelete = dappName == dappNameInput;
    return (
      <LayoutContainer>
        <Box display="flex" direction="column">
          <Box smColumn={12} mdColumn={8}>
            <Box marginBottom={9}>
              <Description>
                Deleting a dapp will remove its history from your account.
                Before deleting your dapp it will require you to confirm the
                deletion by inputing the name of your dapp below. After inputing
                the name, click the button at the bottom right to complete dapp
                deletion.
              </Description>
            </Box>
            <InputGroup>
              <InputTitle>Dapp Name</InputTitle>
   

              <Input 
              id={"1"}
              type={"text"}
            value={dappNameInput} 
            name={'DappName'} 
            isValid={val => val === dappName}
            stateHook={this.onDappNameChange}
            errorMessage={"confirm dapp name to continue"}
            placeholder= {dappName}/>

                
             
              <Description>
                Deleting this dapp will make the name immediately available to
                other users. If you wish to keep the name, be sure to create
                another dapp with the same name soon after.
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
                onClick={e => onDeleteDappBot(e, dappName)}
                disabled={!disableDelete}
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
