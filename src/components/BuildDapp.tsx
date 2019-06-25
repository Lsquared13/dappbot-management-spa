import * as React from "react";
import { Base, Box, Button, Text, Console } from "./ui";
import {
  ButtonText,
  LayoutContainer,
  InputTitle,
  ReferenceLink,
  NetworkReferenceLink,
  EXCAddresLink,
} from "../layout";
import {StaticConsole} from "./ui/Console/StaticConsole"
import { ReactComponent as LinkIcon } from "../images/link.svg";
import { ReactComponent as CheckIcon } from "../images/check.svg";

export interface DappDetail {
  DappName: string;
  DnsName: string;
  ContractAddr: string;
  Web3URL: string;
  Abi: string;
  GuardianURL: string
}
export interface BuildDappProps {
  dappDetail: DappDetail;
  onBuildDapp?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export const BuildDapp: React.SFC<BuildDappProps> = props => {
  const { dappDetail, onBuildDapp } = props;
   
  return (
    <LayoutContainer>
      <Box display="flex" justifyContent="between">
        <Box>
          <InputTitle>Dapp URL</InputTitle>
          <Box marginTop={2}>
            <ReferenceLink href={dappDetail.DnsName}>
              {dappDetail.DnsName} <LinkIcon />
            </ReferenceLink>
          </Box>
        </Box>
        <Box>
          <InputTitle>Contract Network</InputTitle>
          <Box marginTop={2}>
            <NetworkReferenceLink href={dappDetail.Web3URL}></NetworkReferenceLink>
          </Box>
        </Box>
        <Box>
          <InputTitle>Contract Address</InputTitle>
          <Box marginTop={2}>
            <Text color="blue" size="xs" smSize="xs" mdSize="xs" lgSize="xs">
            <EXCAddresLink address={dappDetail.ContractAddr}/>
            </Text>
          </Box>
        </Box>
      </Box>
      <Box marginTop={6}>
        <Base type="standard">
          <Box display="flex" justifyContent="between" padding={6}>
            <Text
              bold
              color="gray"
              size="sm"
              smSize="sm"
              mdSize="sm"
              lgSize="sm"
            >
              Deployment In Progress
            </Text>
            <CheckIcon />
          </Box>
          <Text size="xs" smSize="xs" mdSize="xs" lgSize="xs">
            <Console />
          </Text>
        </Base>
      </Box>
      <Box display="flex" justifyContent="end">
        <Box  marginTop={12} >
          <Button theme={"outlineBlue"} disabled size="small" onClick={onBuildDapp}>
            <ButtonText>Deploy To IPFS</ButtonText>
          </Button>
        </Box>
      </Box>
      
    </LayoutContainer>
  );
};

export default BuildDapp;
