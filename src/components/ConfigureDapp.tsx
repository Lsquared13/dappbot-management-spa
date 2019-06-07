import React, { Component } from "react";
import { Box, Button, Icon, Input} from "./ui";
import { isValidAddress, cleanAddress, isValidABI, isValidWeb3Url} from "./ui/Input/utils";
import {
  LayoutContainer,
  ButtonText,
  Description,
  InputContainer,
  InputGroup,
  InputTitle,
  ReferenceLink,
  FancyLink
} from "../layout";

import { ReactComponent as LinkIcon } from "../images/link.svg";
import SelectList from "./ui/SelectList";

type InputEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>
  | React.ChangeEvent<HTMLTextAreaElement>
  | undefined;

export interface ConfigureDappState {
  selectedNetwork: string;
  contractAddress: string;
  contractABI: any;
  web3URL: string;
  showProviderInput: boolean;
}

export interface ConfigureDappProps {
  onCancel: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    inputs: ConfigureDappState
  ) => void;
  onCreateDapp: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    inputs: ConfigureDappState
  ) => void;
  onInputChange?: (inputs: ConfigureDappState) => void;
}

export const networkOptions = [
  {
    value: "",
    label: "Select Network"
  },
  {
    value: "https://tx-executor-stress-test.eximchain.com",
    label: "Eximchain"
  },
  {
    value: "https://mainnet.infura.io/v3/45c2433b314e4ad09674978a2b9cce43",
    label: "Ethereum"
  },
  {
    value: "https://ropsten.infura.io/v3/f084d60882a94d76bfb3b587af30e8e6",
    label: "Ropsten"
  },
  {
    value: "https://kovan.infura.io/v3/c58eda7787d342c7b41f8a3f38893def",
    label: "Kovan"
  },
  {
    value: "https://rinkeby.infura.io/v3/70a3fea548984fffbe86de56093b8044",
    label: "Rinkeby"
  },
  {
    value: "https://goerli.infura.io/v3/55454709df7f4e54a660ceb5ad5a844c",
    label: "Görli"
  },
  {
    value: "https://",
    label: "Custom"
  }
];
const invalidAddrErr = "Please enter a valid hexademical address.  It should begin with 0x and be 42 characters long."

export class ConfigureDapp extends Component<
  ConfigureDappProps,
  ConfigureDappState
> {
  state = {
    selectedNetwork: "",
    contractAddress: "",
    contractABI: "",
    web3URL: "",
    showProviderInput: false
  };
  

  broadcastInputs = () => {
    let { onInputChange } = this.props;
    onInputChange && onInputChange(Object.assign({}, this.state));
  };

  onAddressChange = (inputEventValue: string) => {
    
      this.setState(
        {
          contractAddress: inputEventValue
        },
        this.broadcastInputs
      );
    
  };

  onContractABIChange = (inputEventValue: string) => {

      this.setState(
        {
          contractABI: inputEventValue
        },
        this.broadcastInputs
      );
  
  };

  onWeb3URLChange = (inputEventValue: string) => {
 
      this.setState(
        {
          web3URL: inputEventValue
        },
        this.broadcastInputs
      );
    
  };

  onNetworkChange = ({ event, value }: any) => {
    let isEXCNetwork = value === "https://tx-executor-stress-test.eximchain.com";
    this.setState(
      prevState => ({
        selectedNetwork: value,
        web3URL: value ? value : "",
        showProviderInput: !isEXCNetwork
      }),
      this.broadcastInputs
    );
  };
  

  render() {
    let {
      contractAddress,
      contractABI,
      web3URL,
      showProviderInput
    } = this.state;
    let disableSubmit = !(isValidWeb3Url(web3URL)&& isValidABI(contractABI)&&isValidAddress(contractAddress))
    let { onCancel, onCreateDapp } = this.props;
    return (
      <LayoutContainer>
        <Box marginBottom={12}>
          <InputGroup>
            <InputTitle>Contract Deployed Address</InputTitle>
            <InputContainer>
              <Box column={12} smColumn={12} mdColumn={8}>
              <Input 
                id={"1"}
                type={"text"}
                value={contractAddress} 
                name={'ContractAddress'} 
                clean={cleanAddress}
                isValid={isValidAddress}
                stateHook={this.onAddressChange}
                errorMessage={"* Please input a valid address"}
                placeholder= {"0x92EB17BE1573e82e6E5DAa17C12Adba00279CEA1"}/>
              </Box>
            </InputContainer>
            <Description>
              Please enter hexademical address that your smart contract is
              currently deployed at. It should begin with 0x and be 42
              characters long.
              <FancyLink href="https://medium.com/openberry/compile-and-deploy-using-remix-ide-f58fcc662ed0">
                Learn how to deploy a smart contract 
              </FancyLink>
            </Description>
          </InputGroup>

          <InputGroup>
            <InputTitle>Contract ABI</InputTitle>
            <InputContainer>
              <Box column={12} smColumn={12} mdColumn={8}>
              <Input 
                id={"ContractABI"}
                type={"text"}
                value={contractABI} 
                name={'ContractABI'} 
                isValid={isValidABI}
                stateHook={this.onContractABIChange}
                errorMessage={"* Please enter a valid ABI JSON for your contract."}
                />
              </Box>
              <Box smColumn={12} mdColumn={4} mdPaddingX={4} marginTop={1}>
                <Box mdMarginTop={1}>
                  <Button theme="outlineBlue" size="small" disabled>
                    <ButtonText>
                      <Icon icon="send" type="thick" color="blue" /> Search ABI Library
                    </ButtonText>
                  </Button>
                </Box>
              </Box>
            </InputContainer>
            <Description>
              Please enter an ABI JSON for your contract.
              <FancyLink href="https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial">
                Learn how to compile the source code of your smart contract to
                generate an ABI  
              </FancyLink>
            </Description>
          </InputGroup>

          <InputGroup>
            <InputTitle>Contract Network</InputTitle>
            <InputContainer>
              <SelectList
                id="network"
                name="network"
                onChange={this.onNetworkChange}
                options={networkOptions}
                placeholder="Select network"
                value={this.state.selectedNetwork}
              />
            </InputContainer>
            <InputContainer>
              {showProviderInput && (
                <Box column={12}>
                  <Input 
                id={"web3URL"}
                type={"text"}
                value={web3URL} 
                name={'Web3URL'} 
                isValid={isValidWeb3Url}
                stateHook={this.onWeb3URLChange}
                placeholder="https://"
                errorMessage={"* Please enter a valid URL for a Web3 HTTP Provider on your network.  It must begin with https://"}
                />           
                </Box>
              )}
            </InputContainer>
            <Description>
              Please select a network or enter a URL for a Web3 HTTP Provider on
              your network.
              <FancyLink href="https://infura.io/docs/gettingStarted/chooseaNetwork">
                Learn where to find the Web3 URL for your network 
              </FancyLink>
            </Description>
          </InputGroup>
        </Box>

        <Box display="flex">
          <Box width={125}>
            <Button
              block
              size="small"
              onClick={e => onCreateDapp(e, this.state)}
              disabled={disableSubmit}
            >
              <ButtonText>Create Dapp</ButtonText>
            </Button>
          </Box>
          <Box display="inlineBlock" margin={2} />
          <Box width={125}>
            <Button
              block
              size="small"
              theme="outlineBlue"
              onClick={e => onCancel(e, this.state)}
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
          </Box>
        </Box>
      </LayoutContainer>
    );
  }
}

export default ConfigureDapp;
// Please enter hexademical address that your smart contract is currently deployed at. It should begin with 0x and be 42 characters long.
// Learn how to deploy a smart contract
