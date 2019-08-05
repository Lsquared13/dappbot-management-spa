import { UserResponseData, UserSetter } from '../../types';
import { 
  Operations, MessageResponse, SignInResponse,
  AuthorizedRequest, RootStrings
} from './types'
import { Resource } from 'react-request-hook';

interface RequestArgs {
  url: string,
  data: any
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
    resourceFactory:<Args, Returns>(operation: Operations, rootResource?: RootStrings) => (args: Args, subResource?: string | undefined) => Resource<Returns>, 
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
    return (args:SignInArgs) => {
      return this.resourceFactory<SignInArgs, SignInResponse>(Operations.login, "auth")(args, 'login');
    }
  }
  
  newPassword(){
    return (args:NewPasswordArgs) => {
      return this.resourceFactory<NewPasswordArgs, UserResponseData>(Operations.login, "auth")(args, 'login');
    }
  }
  
  refresh(){
    return (args:RefreshArgs) => {
      // This function is a *requestFactory* because we just want the config object,
      // doing our request directly.
      return this.requestFactory<RefreshArgs>(Operations.login, "auth")(args, 'login')
    }
  }
  
  beginPasswordReset() {
    return (args:BeginPasswordResetArgs) => {
      return this.resourceFactory<BeginPasswordResetArgs, MessageResponse>(Operations.resetPassword,"auth")(args, 'password-reset');
    }
  }
  
  confirmPasswordReset() {
    return (args:ConfirmPasswordResetArgs) => {
      return this.resourceFactory<ConfirmPasswordResetArgs, MessageResponse>(Operations.resetPassword, 'auth')(args, 'password-reset');
    }
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