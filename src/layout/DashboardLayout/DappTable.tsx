import * as React from "react";
import { Box, Table, Text, TextProps } from "../../components/ui";
import { NetworkReferenceLink, EXCAddresLink, DappDetailLink, FancyLink } from "../utils";
import { ReactComponent as CheckIcon } from "../../assets/images/check.svg";

export interface DappDetail {
  DappName: string;
  DnsName: string;
  ContractAddr: string;
  Web3URL: string;
  Abi: string;
  GuardianURL: string
}

export interface DappTableProps {
  dapps: DappDetail[];
}

const Title: React.SFC = props => (
  <Box paddingY={2}>
    <Text
      size="sm"
      smSize="sm"
      mdSize="sm"
      lgSize="sm"
      textTransform="capitalize"
    >
      {props.children}
    </Text>
  </Box>
);

const Content: React.SFC<TextProps> = props => (
  <Text {...props} size="sm" smSize="sm" mdSize="sm" lgSize="sm">
    {props.children}
  </Text>
);

export const DappTable: React.SFC<DappTableProps> = props => {
  let columns = [
    { title: <Title>Dapp Name</Title>, field: "name" },
    { title: <Title>Status</Title>, field: "status" },
    { title: <Title>Network</Title>, field: "network" },
    { title: <Title>Contract Address</Title>, field: "address" },
    { title: <Title>Dapp URL</Title>, field: "url" }
  ];

  let records = props.dapps.map(dapp => ({
    name: <DappDetailLink dappName={dapp.DappName}/>,
    network: <NetworkReferenceLink href={dapp.Web3URL}></NetworkReferenceLink>,
    address: <EXCAddresLink short address={dapp.ContractAddr} /> ,
    url: <FancyLink href={`https://${dapp.DnsName}`}>{`https://${dapp.DnsName}`}</FancyLink>,
    status: (
      //TODO: FACTOR OUT ONCE WE HAVE STATUS API
      <Box marginLeft={-5}display="flex" alignItems="start" justifyContent="center" >
        {/* <Box marginRight={2}>
          {dapp.status === "available" ? (
            <CheckIcon height={24} width={24} />
          ) : (
            <LoadingIcon height={24} width={24} />
          )}
        </Box> */}
        <Box marginRight={2}>
          <CheckIcon height={20} width={20} />
        </Box>
        
        <Content textTransform="capitalize">available</Content>
      </Box>
    ),
  }));

  return (
    <Box
      marginLeft={5}
      marginRight={5}
      dangerouslySetInlineStyle={{
        __style: {
          borderLeft: "1px solid #E6EAEE",
          borderRight: "1px solid #E6EAEE",
          borderTop: "1px solid #E6EAEE",
          overflowX: "auto"
        }
      }}
    >
      <Table columns={columns} records={records} />
    </Box>
  );
};

export default DappTable;
