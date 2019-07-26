import React, { Component } from "react";
import { Box, Text, Button } from "../components/ui";
import { Input } from "../components/ui/NavLeft/Input";
import {
  LayoutContainer,
  ButtonText,
  InputContainer,
  InputGroup,
  InputTitle
} from "../layout";

export interface PasswordProps {
  onPasswordInputChange?: (inputs: PasswordState) => void;
  onPasswordSave: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    inputs: PasswordState
  ) => void;
}
export type InputEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>
  | React.ChangeEvent<HTMLTextAreaElement>
  | undefined;

export interface PasswordState {
  currentPswd?: string;
  newPswd?: string;
}

export default class Password extends Component<PasswordProps, PasswordState> {
  state: PasswordState = {
    currentPswd: "",
    newPswd: ""
  };

  broadcastInputs = () => {
    let { onPasswordInputChange } = this.props;
    onPasswordInputChange &&
      onPasswordInputChange(Object.assign({}, this.state));
  };

  oncurrentPswdChange = (event: InputEvent) => {
    if (event && event.target) {
      this.setState(
        {
          currentPswd: event.target.value
        },
        this.broadcastInputs
      );
    }
  };

  onnewPswdChange = (event: InputEvent) => {
    if (event && event.target) {
      this.setState(
        {
          newPswd: event.target.value
        },
        this.broadcastInputs
      );
    }
  };

  render() {
    let { onPasswordSave } = this.props;
    let { currentPswd, newPswd } = this.state;

    return (
      <LayoutContainer>
        <InputGroup>
          <InputTitle color="gray">Current Password</InputTitle>
          <InputContainer>
            <Box column={12} mdColumn={8}>
              <Input
                name="currentPswd"
                value={currentPswd}
                onChange={this.oncurrentPswdChange}
                type="password"
                placeholder="Current Password"
              />
            </Box>
          </InputContainer>
        </InputGroup>
        <InputGroup>
          <InputTitle color="gray">New Password</InputTitle>
          <InputContainer>
            <Box column={12} mdColumn={8}>
              <Input
                name="newPswd"
                value={newPswd}
                onChange={this.onnewPswdChange}
                type="password"
                placeholder="New Password"
              />
            </Box>
          </InputContainer>
        </InputGroup>

        <Box>
          <Button size="small" onClick={e => onPasswordSave(e, this.state)}>
            <ButtonText>Save</ButtonText>
          </Button>
        </Box>
      </LayoutContainer>
    );
  }
}
