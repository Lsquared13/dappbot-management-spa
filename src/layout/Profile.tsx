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

  render() {
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