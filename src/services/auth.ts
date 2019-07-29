import { useState } from 'react';
// import { CognitoUser } from '@aws-amplify/auth';
import {requestFactory, Operations} from './abiClerk';
import { request } from 'https';


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

function signInRequest(): (args: SignInArgs, target: string) => AuthorizedRequest {

  return requestFactory(Operations.login, "auth")
}

function newPasswordRequest(): (args: NewPasswordArgs, target: string) => AuthorizedRequest {
  return requestFactory(Operations.login, "auth")
}

function beginPasswordResetRequest(): (args: BeginPasswordResetArgs, target: string) => AuthorizedRequest {
  return requestFactory(Operations.resetPassword,"auth")
}

function confirmPasswordResetRequest(): (args: ConfirmPasswordResetArgs, target: string) => AuthorizedRequest {
  return requestFactory(Operations.resetPassword, 'auth')
}


export const passwordChecker = new passwordValidator();
passwordChecker
  .is().min(8).max(64)
  .has().uppercase()
  .has().lowercase()
  .has().digits()
  .has().symbols()
  .has().not().spaces();

// Courtesy of https://usehooks.com/useLocalStorage/
export function useLocalStorage<ValueType>(key:string, initialValue:ValueType):[ValueType, React.Dispatch<ValueType>] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value:ValueType) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export default {
  signIn: signInRequest,
  // confirmMFA: confirmMFASignIn,
  newPassword: newPasswordRequest,
  passwordChecker,
  confirmPasswordResetRequest,
  beginPasswordResetRequest

}