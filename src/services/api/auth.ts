import { UserResponseData, UserSetter } from '../../types';
import { 
  Operations, MessageResponse, SignInResponse,
  RequestFactory, ResourceFactory
} from './types'

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
    resourceFactory:ResourceFactory, 
    requestFactory:RequestFactory
  ){
    this.user = user;
    this.setUser = setUser;
    this.requestFactory = requestFactory;
    this.resourceFactory = resourceFactory;
  }
  user:UserResponseData
  setUser:(newUser:UserResponseData) => void
  resourceFactory:ResourceFactory
  requestFactory:RequestFactory

  signIn(){
    return (args:SignInArgs) => {
      return this.resourceFactory<SignInArgs, SignInResponse>(Operations.login, "auth")(args, 'login');
    }
  }
  
  newPassword(){
    return (args:NewPasswordArgs) => {
      return this.resourceFactory<NewPasswordArgs, SignInResponse>(Operations.login, "auth")(args, 'login');
    }
  }
  
  refresh(){
    return (args:RefreshArgs) => {
      // This function is a *requestFactory* because we just want the config object,
      // doing our request directly.  
      let refreshRequest = this.requestFactory<RefreshArgs>(Operations.login, "auth")(args, 'login');

      // @ts-ignore The `.data` field is copied to `.json`, because
      // that's where `request` expects to find it. Don't tell
      // Typescript though, it'll get angry.
      refreshRequest.json = refreshRequest.data;
      return refreshRequest
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