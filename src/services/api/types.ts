import { XOR } from 'ts-xor';
import { 
  DappDbItem, ChallengeData, UserResponseData, 
  ChallengeType, User, StripePlans
} from "../../types";
import Stripe from 'stripe';
import { Resource } from 'react-request-hook';

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
  auth = 'auth',
  payment = 'payment'
}

export type RootStrings = keyof typeof RootResources;

export enum Operations {
  create = "create",
  login = "login",
  resetPassword = "reset-password",
  delete = "delete",
  edit = "edit",
  list = "list",
  read = "read",
  signup = "signup",
  updatePlanCount = "updatePlanCount",
  updatePayment = "updatePayment",
  readStripeData = "readStripeData",
  cancelStripe = "cancelStripe"
}

export type RequestFactory = <Args>(operation: Operations, rootResource?: "private" | "public" | "auth") => (args: Args, subResource?: string | undefined) => AuthorizedRequest
export type ResourceFactory = <Args, Returns>(operation: Operations, rootResource?: RootStrings) => (args: Args, subResource?: string | undefined) => Resource<Returns>

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

export type Customer = Stripe.customers.ICustomer;
export type Subscription = Stripe.subscriptions.ISubscription;

export interface StripeUserData {
  user : User
  subscription : Subscription
  customer : Customer
}

export type StripeUserDataResponse = DappBotResponse<StripeUserData>

export type StripeCancelResponse = DappBotResponse<{
  cancelledSub : Subscription
}>

export type UserCreateResponse = DappBotResponse<{
  stripeId: number
  subscriptionId: number
  user : User | boolean
}>

export interface UpdatePlanCountArgs {
  plans : StripePlans
}

export type UpdatePlanCountResponse = DappBotResponse<{
  updatedSubscription : Subscription
  updatedUser : User
}>

export interface UpdatePaymentArgs {
  token : string
}

export type UpdatePaymentResponse = DappBotResponse<{
  updatedCustomer : Customer
}>