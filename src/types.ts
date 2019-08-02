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

export type AttributeMapType  = { [Name:string] : AttributeValueType }

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

export enum ChallengeType{
  Mfa = "MFA",
  ForgotPassword = "FORGOT_PASSWORD",
  NewPasswordRequired = "NEW_PASSWORD_REQUIRED",
  Default = "DEFAULT"
}



export interface AuthRefreshData {
  Token: string,
  ExpiresAt: string
}

export interface User {
  Username: string,
  Email: string
  UserAttributes: AttributeMapType,
  MFAOptions?: MFAOptionListType,
  PreferredMfaSetting?: string,
  UserMFASettingList?: UserMFASettingListType
}

export interface UserResponseData {
  User: User,
  Authorization: string,
  RefreshToken: string,
  ExpiresAt: string
}

export type UserSetter = (newUser:UserResponseData)=>void

export function defaultUser():User {
  return {
    Username:"", 
    Email: "",
    UserAttributes: {}
  }
}

export function defaultAuthRefreshData():AuthRefreshData{
  return {Token:'', ExpiresAt:''}
}

export function defaultUserResponse():UserResponseData {
  return {
    User: defaultUser(),
    Authorization:'',
    RefreshToken: '',
    ExpiresAt: new Date().toISOString()
  }
}

export enum Tiers{
  Standard = 'STANDARD',
  Professional = 'PROFESSIONAL',
  Enterprise = 'ENTERPRISE'
}
