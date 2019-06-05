import * as React from "react";
import { Box, Table, Text, TextProps, EXCAddress } from "../../components/ui";
import { ReferenceLink, NetworkReferenceLink, EXCAddresLink, DappDetailLink } from "../utils";
import { ReactComponent as CheckIcon } from "../../images/check.svg";
import { ReactComponent as LoadingIcon } from "../../images/loading.svg";
import { ReactComponent as LinkIcon } from "../../images/link.svg";

// export interface DappDetail {
//   name: string;
//   status: "available" | "building" | "creating";
//   network: string;
//   address: string;
//   url: string;
// }
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
    url: <ReferenceLink href={dapp.DnsName}/>,
    status: (
      //TODO: FACTOR OUT ONCE WE HAVE STATUS API
      <Box marginLeft={-5}display="flex" alignItems="start" >
        {/* <Box marginRight={2}>
          {dapp.status === "available" ? (
            <CheckIcon height={24} width={24} />
          ) : (
            <LoadingIcon height={24} width={24} />
          )}
        </Box> */}
        <Box marginRight={2}>
          <CheckIcon height={24} width={24} />
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
