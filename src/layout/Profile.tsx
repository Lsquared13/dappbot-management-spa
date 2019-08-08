import React, { Component } from "react";
import { Box, Text, Button } from "../components/ui";
import { Input } from "../components/ui/NavLeft/Input";
import {
  LayoutContainer,
  InputContainer,
  InputGroup,
  InputTitle
} from "../layout";
import { UserResponseData } from "../types";

export interface ProfileProps {
  user: UserResponseData;
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
    email: this.props.user.User.Email
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
    console.log()
    return (
      <InputGroup>
        <InputTitle color="gray">Email</InputTitle>
        <InputContainer>
          <Box column={12} mdColumn={8}>
            <Text>
              {email}
            </Text>
          </Box>
        </InputContainer>
      </InputGroup>
    );
  }
}