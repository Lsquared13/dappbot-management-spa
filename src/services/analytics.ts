import { CreateDapp } from "@eximchain/dappbot-types/spec/methods/private";

const apiUrl = process.env.REACT_APP_DAPPBOT_API_ENDPOINT as string;

export function userLogin(email:string) {
  window.analytics.identify(email);
  window.analytics.track('User Login - Dapp.Bot', {
    email, apiUrl
  })
}

export function userSignup(email:string) {
  window.analytics.track('User Signup - Dapp.Bot', {
    email, apiUrl
  });
}

export function dappCreated(email:string, DappName:string, args:CreateDapp.Args) {
  window.analytics.track('Dapp Created - Dapp.Bot', {
    apiUrl, email, DappName, ...args
  })
}

export function dappDeleted(DappName:string) {
  window.analytics.track('Dapp Deleted - Dapp.Bot', {
    apiUrl, DappName
  })
}

export function cardAdded(email:string) {
  window.analytics.track('Card Added', {
    apiUrl, email
  })
}

export function cardUpdated(email:string) {
  window.analytics.track('Card Updated', {
    apiUrl, email
  })
}

export function capacityUpdated(email:string, oldCapacity:number, newCapacity:number) {
  if (oldCapacity > newCapacity) {
    window.analytics.track('Dapp Capacity Decreased', {
      email, apiUrl, oldCapacity, newCapacity
    })
  }

  if (newCapacity > oldCapacity) {
    window.analytics.track('Dapp Capacity Increased', {
      email, apiUrl, oldCapacity, newCapacity
    })
  }
}

export function appMfaEnabled(email:string) {
  window.analytics.track('MFA Enabled - App', {
    apiUrl, email
  })
}

export function appMfaDisabled(email:string) {
  window.analytics.track('MFA Disabled - App', {
    apiUrl, email
  })
}

export const Track = {
  userLogin, userSignup, dappCreated, dappDeleted,
  cardAdded, cardUpdated, capacityUpdated,
  appMfaEnabled
}

export default Track;