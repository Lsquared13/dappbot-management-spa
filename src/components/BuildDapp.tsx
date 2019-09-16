import * as React from "react";
import Dapp from '@eximchain/dappbot-types/spec/dapp'
import { Base, Box, Button, Text, Console } from "./ui";
import {
  ButtonText,
  LayoutContainer,
  InputTitle,
  ReferenceLink,
  NetworkReferenceLink,
  EXCAddressLink,
} from "../layout";
import { ReactComponent as LinkIcon } from "../assets/images/link.svg";
import { ReactComponent as CheckIcon } from "../assets/images/check.svg";

export interface BuildDappProps {
  dappDetail: Dapp.Item.Api;
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
            <EXCAddressLink address={dappDetail.ContractAddr}/>
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
