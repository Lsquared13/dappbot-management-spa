export enum DappArgNames {
  DappName = 'DappName',
  Abi = 'Abi',
  Web3URL = 'Web3URL',
  GuardianURL = 'GuardianURL',
  ContractAddr = 'ContractAddr'
}

export type DappArgNameStrs = keyof typeof DappArgNames;

export interface DappCreateArgs extends DappData {
  DappName: string
}
export interface DappData {
  Abi: string,
  Web3URL: string,
  GuardianURL: string,
  ContractAddr: string,
  Tier: Tiers
}

export function SampleDappArgs():DappCreateArgs{
  return {
    DappName: '',
    Abi : '',
    Web3URL : '',
    GuardianURL : 'https://guardian.dapp.bot',
    ContractAddr : '',
    Tier:Tiers.Standard
  }
}

export interface DappDbItem extends DappCreateArgs {
  OwnerEmail : string,
  CreationTime : string,
  DnsName : string
}

export type AttributeListType = AttributeType[];

export type AttributeNameType = string;

export type AttributeValueType = string;

export interface AttributeType {
    Name: AttributeNameType;
    Value?: AttributeValueType;
}

export type MFAOptionListType = MFAOptionType[];

export type DeliveryMediumType = "SMS"|"EMAIL"|string;

export interface MFAOptionType {

  DeliveryMedium?: DeliveryMediumType;

  AttributeName?: AttributeNameType;
}
export type UserMFASettingListType = string[];


export interface ChallengeData {
  ChallengeName: string,
  ChallengeParameters:{
    [key:string]: string
  },
  Session: string
}

export interface ChallengeResponse {
  Data: ChallengeData,
  Error: string,
}

export const defaultChallengeData: ChallengeData = {
  ChallengeName:'',
  ChallengeParameters:{},
  Session:''
}

export enum ChallengeType{
  Mfa = "MFA",
  ForgotPassword = "FORGOT_PASSWORD",
  NewPasswordRequired = "NEW_PASSWORD_REQUIRED"
}

export const forgotPasswordChallengeData: ChallengeData = {
  ChallengeName:ChallengeType.ForgotPassword,
  ChallengeParameters:{},
  Session:''
}

export const defaultChallengeResponse:ChallengeResponse = {
  Data:defaultChallengeData,
  Error:''
}

export interface AuthRefreshData {
  Token: string,
  ExpiresAt: string
}

export interface User {
  Username: string,
  UserAttributes: AttributeListType,
  MFAOptions?: MFAOptionListType,
  PreferredMfaSetting?: string,
  UserMFASettingList?: UserMFASettingListType
}

export interface UserResponse {
  User: User,
  Authorization: string,
  Refresh: AuthRefreshData
}

export const defaultUser = {
  Username:'',
  UserAttributes:[]
}

export const defaultAuthRefreshData = {
  Token:'',
  ExpiresAt:''
}
export const defaultUserResponse = {
  User: defaultUser,
  Authorization:'',
  Refresh: defaultAuthRefreshData
}

export enum Tiers{
  Standard = 'STANDARD',
  Professional = 'PROFESSIONAL',
  Enterprise = 'ENTERPRISE'
}
