import React, { Component } from "react";
import { Box, Text, Button } from "../components/reusable/ui";
import { Input } from "../components/reusable/ui/NavLeft/Input";
import {
  LayoutContainer,
  ButtonText,
  InputContainer,
  InputGroup,
  InputTitle
} from "../components/reusable/dapp";

export interface ProfileProps {
  onProfileInputChange?: (inputs: ProfileState) => void;
  onProfileSave: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    inputs: ProfileState
  ) => void;
  onProfileDelete: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    inputs: ProfileState
  ) => void;
}
export type InputEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>
  | React.ChangeEvent<HTMLTextAreaElement>
  | undefined;

export interface ProfileState {
  email?: string;
}

export default class Profile extends Component<ProfileProps, ProfileState> {
  state: ProfileState = {
    email: ""
  };

  broadcastInputs = () => {
    let { onProfileInputChange } = this.props;
    onProfileInputChange && onProfileInputChange(Object.assign({}, this.state));
  };

  onEmailChange = (event: InputEvent) => {
    if (event && event.target) {
      this.setState(
        {
          email: event.target.value
        },
        this.broadcastInputs
      );
    }
  };

  render() {
    let { onProfileDelete, onProfileSave } = this.props;
    let { email } = this.state;

    return (
      <LayoutContainer>
        <InputGroup>
          <InputTitle color="gray">Email</InputTitle>
          <InputContainer>
            <Box column={12} mdColumn={8}>
              <Input
                name="email"
                value={email}
                onChange={this.onEmailChange}
                type="email"
                placeholder="email address"
              />
            </Box>
          </InputContainer>
        </InputGroup>

        <Box display="flex" justifyContent="between" alignItems="center">
          <Box>
            <Button size="small" onClick={e => onProfileSave(e, this.state)}>
              <ButtonText>Save</ButtonText>
            </Button>
          </Box>
          <Box>
            <Button
              theme="outlineBlue"
              size="small"
              onClick={e => onProfileDelete(e, this.state)}
            >
              <ButtonText>Delete Account</ButtonText>
            </Button>
          </Box>
        </Box>
      </LayoutContainer>
    );
  }
}
