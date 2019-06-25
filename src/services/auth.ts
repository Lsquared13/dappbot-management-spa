import { useState } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';
const passwordValidator = require('password-validator');

Amplify.configure({
  Auth: {
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID,
    region: process.env.REACT_APP_AWS_REGION
  }
})

const MFA_TYPE = 'SMS_MFA';

const signIn = async (email: string, password: string) => {
  try {
    const user = await Auth.signIn(email, password);
    if (user.challengeName === 'SMS_MFA' ||
      user.challengeName === 'SOFTWARE_TOKEN_MFA') {
      return { challenge: 'MFA', user }
    } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
      const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
      return {
        challenge: 'newPassword',
        requiredAttributes,
        user
      }
    } else if (user.challengeName === 'MFA_SETUP') {
      // This happens when the MFA method is TOTP
      // The user needs to setup the TOTP before using it
      // More info please check the Enabling MFA part
      Auth.setupTOTP(user);
    } else {
      // The user directly signs in
      return {user};
    }
  } catch (err) {
    if (err.code === 'UserNotConfirmedException') {
      await Auth.resendSignUp(email);
      return {
        errMsg : "Please finish confirming your account, we've resent your confirmation code."
      }
      // The error happens if the user didn't finish the confirmation step when signing up
      // In this case you need to resend the code and confirm the user
      // About how to resend the code and confirm the user, please check the signUp part
    } else if (err.code === 'PasswordResetRequiredException') {
      await Auth.forgotPassword(email);
      return {
        errMsg: "Please reset your password, we've emailed you a confirmation code.",
        challenge: 'forgotPassword'
      }
    } else if (['NotAuthorizedException','UserNotFoundException'].includes(err.code)) {
      // Provide same message for incorrect password and missing account,
      // do not reveal account existence to attackers.
      return {
        errMsg: "We could not log you in with these credentials."
      }
    } else {
      return err;
    }
  }
}

const forgotPassword = async (username: string) => {
  return await Auth.forgotPassword(username);
}

const confirmMFASignIn = async (user: CognitoUser, code: string) => {
  return await Auth.confirmSignIn(
    user,   // Return object from Auth.signIn()
    code,   // Confirmation code  
    MFA_TYPE // MFA Type e.g. SMS_MFA, SOFTWARE_TOKEN_MFA
  );
}

const completeNewPassword = async (user: CognitoUser, newPassword: string) => {
  return await Auth.completeNewPassword(user, newPassword, {});
}

const completeForgotPassword = async (email:string, code:string, new_password:string) => {
  return await Auth.forgotPasswordSubmit(email, code, new_password);
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
export function useLocalStorage<ValueType>(key:string, initialValue:ValueType):any[] {
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

export const currentUserInfo = async () => {
  return await Auth.currentUserInfo();
}

export default {
  signIn,
  confirmMFA: confirmMFASignIn,
  newPassword: completeNewPassword,
  forgotPass: completeForgotPassword,
  passwordChecker, currentUserInfo,
  forgotPassword: forgotPassword
}