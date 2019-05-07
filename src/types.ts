export enum DappArgNames {
  DappName = 'DappName',
  Abi = 'Abi',
  Web3URL = 'Web3URL',
  GuardianURL = 'GuardianURL',
  ContractAddr = 'ContractAddr'
}

export type DappArgNameStrs = keyof typeof DappArgNames;

export interface DappArgs {
  DappName: string
  Abi: string
  Web3URL: string
  GuardianURL: string
  ContractAddr: string
}

export interface DappDbItem extends DappArgs {
  OwnerEmail : string,
  CreationTime : string,
  DnsName : string
}