import { UserResponse, UserSetter } from '../../types';
import { API } from '../api';
import { Operations } from './types'

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

export class AuthAPI extends API {
  constructor(user:UserResponse, setUser:UserSetter){
    super({user, setUser});
  }

  signIn(): (args: SignInArgs, target?: string) => AuthorizedRequest {
    return this.requestFactory(Operations.login, "auth")
  }
  
  newPassword(): (args: NewPasswordArgs, target?: string) => AuthorizedRequest {
    return this.requestFactory(Operations.login, "auth")
  }
  
  refresh(): (args:RefreshArgs, target?:string) => AuthorizedRequest {
    return this.requestFactory(Operations.login, "auth")
  }
  
  beginPasswordReset(): (args: BeginPasswordResetArgs, target?: string) => AuthorizedRequest {
    return this.requestFactory(Operations.resetPassword,"auth")
  }
  
  confirmPasswordReset(): (args: ConfirmPasswordResetArgs, target?: string) => AuthorizedRequest {
    return this.requestFactory(Operations.resetPassword, 'auth')
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