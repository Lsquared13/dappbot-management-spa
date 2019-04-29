export enum FormArgNames {
  DappName = 'DappName',
  Owner = 'Owner',
  Abi = 'Abi',
  Web3URL = 'Web3URL',
  GuardianURL = 'GuardianURL',
  ContractAddr = 'ContractAddr'
}

export type FormArgNameStrs = keyof typeof FormArgNames;

export interface FormArgVals {
  DappName: string
  Owner: string
  Abi: string
  Web3URL: string
  GuardianURL: string
  ContractAddr: string
}