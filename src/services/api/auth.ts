import { XOR } from 'ts-xor';
import { UserResponseData, UserSetter } from '../../types';
import { API } from '../api';
import { 
  Operations, MessageResponse, UserResponse, 
  ChallengeResponse, SignInResponse
} from './types'
import { Resource } from 'react-request-hook';

interface RequestArgs {
  url: string,
  data: any
}

interface AuthorizedRequest extends RequestArgs {
  headers: any,
  method: string
}

interface AuthorizedRequest extends RequestArgs {
  headers: any,
  method: string
}
const passwordValidator = require('password-validator');

export interface BeginPasswordResetArgs {
  username:string
}
export interface ConfirmPasswordResetArgs {
  username:string
  newPassword: string,
  passwordResetCode: string
}
export interface NewPasswordArgs {
  username: string,
  newPassword: string,
  session: string
}
export interface SignInArgs {
  username: string,
  password: string
}

export interface RefreshArgs {
  refreshToken: string
}

export class AuthAPI {
  constructor(
    user:UserResponseData, 
    setUser:UserSetter, 
    resourceFactory:<Args, Returns>(operation: Operations, rootResource?: "private" | "public" | "auth") => (args: Args, subResource?: string | undefined) => Resource<Returns>, 
    requestFactory:<Args>(operation: Operations, rootResource?: "private" | "public" | "auth") => (args: Args, subResource?: string | undefined) => AuthorizedRequest
  ){
    this.user = user;
    this.setUser = setUser;
    this.requestFactory = requestFactory;
    this.resourceFactory = resourceFactory;
  }
  user:UserResponseData
  setUser:(newUser:UserResponseData) => void
  resourceFactory:<Args, Returns>(operation: Operations, rootResource?: "private" | "public" | "auth") => (args: Args, subResource?: string | undefined) => Resource<Returns>
  requestFactory:<Args>(operation: Operations, rootResource?: "private" | "public" | "auth") => (args: Args, subResource?: string | undefined) => AuthorizedRequest

  signIn(){
    return this.resourceFactory<SignInArgs, SignInResponse>(Operations.login, "auth")
  }
  
  newPassword(){
    return this.resourceFactory<NewPasswordArgs, UserResponseData>(Operations.login, "auth")
  }
  
  // This function is a *requestFactory* because we just want the config object,
  // doing our request directly.
  refresh(){
    return this.requestFactory<RefreshArgs>(Operations.login, "auth")
  }
  
  beginPasswordReset() {
    return this.resourceFactory<BeginPasswordResetArgs, MessageResponse>(Operations.resetPassword,"auth")
  }
  
  confirmPasswordReset() {
    return this.resourceFactory<ConfirmPasswordResetArgs, MessageResponse>(Operations.resetPassword, 'auth')
  }
}

export const passwordChecker = new passwordValidator();
passwordChecker
  .is().min(8).max(64)
  .has().uppercase()
  .has().lowercase()
  .has().digits()
  .has().symbols()
  .has().not().spaces();

export default AuthAPI;