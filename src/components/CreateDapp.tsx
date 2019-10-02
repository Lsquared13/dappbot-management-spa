import * as React from "react";
import Dapp from '@eximchain/dappbot-types/spec/dapp';
import { Box, Button, Text, Input} from "../components/ui";
import {
  LayoutContainer,
  ButtonText,
  Description,
  InputContainer,
  InputGroup,
  InputTitle
} from "../layout";
import { isValidUrl } from "./ui/Input/utils";

import { ReactComponent as GithubIcon } from "../assets/images/Github.svg";


export type InputEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>
  | React.ChangeEvent<HTMLTextAreaElement>
  | undefined;

export interface CreateDappProps {
  onCancel: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    inputs: CreateDappState
  ) => void;
  onConfigDapp: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    inputs: CreateDappState
  ) => void;
  onGithubLink: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    inputs: CreateDappState
  ) => void;
  onNoneLink: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    inputs: CreateDappState
  ) => void;
  onInputChange?: (inputs: CreateDappState) => void;
}

export interface CreateDappState {
  buildDestination: string;
  dappName: string;
}

export class CreateDapp extends React.Component<
  CreateDappProps,
  CreateDappState
> {
  state: CreateDappState = {
    dappName: "",
    buildDestination: ""
  };

  broadcastInputs = () => {
    let { onInputChange } = this.props;
    onInputChange && onInputChange(Object.assign({}, this.state));
  };

  onBuildDestinationChange =  (inputEventValue: string)=> {

      this.setState(
        {
          buildDestination: inputEventValue
        },
        this.broadcastInputs
      );
  
  };

  onDappNameChange = (inputEventValue: string) => {
  
      this.setState(
        {
          dappName: inputEventValue
        },
        this.broadcastInputs
      );
  
  };

  dappNameValid = (dappName: string) => {
    return dappName && dappName === Dapp.cleanName(dappName);
  }

  render() {
    let { onConfigDapp, onCancel, onGithubLink, onNoneLink } = this.props;
    let { dappName, buildDestination } = this.state;
    return (
      <LayoutContainer>
        <Box display="flex" marginBottom={12}>
          <Box smColumn={12} mdColumn={10} lgColumn={8}> 
            <InputGroup>
              <InputTitle>Dapp Name</InputTitle>
              <InputContainer>
              <Box column={12} >
              <Input 
                  id={"1"}
                  type={"text"}
                  value={dappName} 
                  name={'dappName'} 
                  isValid={(dappName:string) => dappName === Dapp.cleanName(dappName)}
                  stateHook={this.onDappNameChange}
                  errorMessage={"This name must be all lowercase, and must begin and end with a letter or number.  Only letters, numbers, and hyphens please!"}
                  placeholder= {"Dapp Name"}/>
              </Box>
               
              </InputContainer>
              <Description>
                This Dapp name will be used to create your Dapp's URL and cannot be changed after creation.
              </Description>
            </InputGroup>

            <InputGroup>
              <InputTitle>Build Desitination</InputTitle>
              <InputContainer>
                  <Box column={12}>
                    <Input 
                      id={"1"}
                      type={"text"}
                      value={buildDestination} 
                      name={'buildDestination'} 
                      disabled
                      isValid={isValidUrl}
                      stateHook={this.onBuildDestinationChange}
                      errorMessage={"This name will be lower-cased, and must begin and end with a letter or number.  Only letters, numbers, and hyphens please!"}
                      placeholder= {"🔐 Requires Enteprise License"}/>
                  </Box>
                
                  
              </InputContainer>
              <Description>
                The repositiory identifier in the format username/respositorty.
                Only public Github repositiories can be used at this time.
                Dapp source code will be placed here.
              </Description>
            </InputGroup>
          </Box>

          <Box
            display="flex"
            direction="column"
            justifyContent="center"
            mdMarginLeft={12}
            marginLeft={6}
            mdColumn={2}
            lgColumn={4}
            smDisplay={"none"}
          >
            <Text
              bold
              color="gray"
              size="sm"
              smSize="sm"
              mdSize="sm"
              lgSize="sm"
            >
              Repository
            </Text>
            <Box display="flex" wrap={true} marginBottom={3} marginTop={2}>
              <Box width={100} marginTop={1}>
                <Button
                  block
                  size="small"
                  theme="outlineBlue"
                  onClick={e => onNoneLink(e, this.state)}
                  disabled
                >
                  <ButtonText>None</ButtonText>
                </Button>
              </Box>
              <Box display="inlineBlock" margin={2} />
              <Box width={100} marginTop={1}>
                <Button
                  block
                  size="small"
                  theme="outlineBlue"
                  onClick={e => onGithubLink(e, this.state)}
                  disabled
                >
                  <Box display="inlineBlock" marginRight={2}>
                    <GithubIcon />
                  </Box>
                  <ButtonText>Github</ButtonText>
                </Button>
              </Box>
            </Box>
            <Description>*requires dapp license</Description>
     
    
          </Box>
        </Box>

        <div style={{ display: "flex", justifyContent: "space-between"  }} >
          <Button
            size="small"
            style="standard"
            theme="cta"
            disabled={!this.dappNameValid(this.state.dappName)}
            onClick={e => onConfigDapp(e, this.state)}>
            <ButtonText>Configure Dapp</ButtonText>
          </Button>
          <Button
            size="small"
            style="standard"
            theme="outlineBlue"
            onClick={e => onCancel(e, this.state)}
          >
            <ButtonText>Cancel</ButtonText>
          </Button>
        </div>
      </LayoutContainer>
    );
  }
}

export default CreateDapp;
