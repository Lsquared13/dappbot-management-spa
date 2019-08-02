import { XOR } from 'ts-xor';
import { 
  DappDbItem, ChallengeData, UserResponseData, ChallengeType
} from "../../types";

export interface RequestArgs {
  url: string,
  data: any
}

export interface Headers {
  'Content-Type': string,
  Authorization?:string
}

export interface AuthorizedRequest extends RequestArgs {
  headers: Headers,
  method: string
}

export enum RootResources {
  private = 'private',
  public = 'public',
  auth = 'auth'
}

export type RootStrings = keyof typeof RootResources;

export enum Operations {
  create = "create",
  login = "login",
  resetPassword = "reset-password",
  delete = "delete",
  edit = "edit",
  list = "list",
  read = "read"
}

export interface DappBotResponse<ResponseType> {
  data: ResponseType
  err : Error | null
}

export type MessageResponse = DappBotResponse<{ message: string }>

export type ReadResponse = DappBotResponse<{
  exists : boolean
  item : DappDbItem
}>

export type ListResponse = DappBotResponse<{
  count : 0
  items : DappDbItem[]
}>

export type SignInResponse = DappBotResponse<XOR<UserResponseData, ChallengeData>>

export type UserResponse = DappBotResponse<UserResponseData>

export type ChallengeResponse = DappBotResponse<ChallengeData>

export function challengeDataFactory(typeOfChallenge:ChallengeType) {
  let data: ChallengeData = {
    ChallengeName:typeOfChallenge,
    ChallengeParameters:{},
    Session:''
  }
  return data
}

export function defaultChallengeResponse():ChallengeResponse{
  return {data:challengeDataFactory(ChallengeType.Default),err:null}
}