import { CreateDapp } from "@eximchain/dappbot-types/spec/methods/private";

const apiUrl = process.env.REACT_APP_DAPPBOT_API_ENDPOINT as string;
const client = 'dapp.bot';
function defaultTrackProps(){ return { apiUrl, client } }

export function userLogin(email:string, isRefresh:boolean) {
  window.analytics.identify(email);
  window.analytics.track('User Login', {
    email, isRefresh, ...defaultTrackProps()
  })
}

export function userSignup(email:string, metadata:Record<string,any>) {
  window.analytics.identify(email, metadata);
  window.analytics.track('User Signup', {
    email, ...defaultTrackProps()
  });
}

export function dappCreated(email:string, DappName:string, args:CreateDapp.Args) {
  window.analytics.track('Dapp Created', {
    email, DappName, ...args, ...defaultTrackProps()
  })
}

export function dappDeleted(DappName:string) {
  window.analytics.track('Dapp Deleted', {
    DappName, ...defaultTrackProps()
  })
}

export function cardAdded(email:string) {
  window.analytics.track('Card Added', {
    email, ...defaultTrackProps()
  })
}

export function cardUpdated(email:string) {
  window.analytics.track('Card Updated', {
    email, ...defaultTrackProps()
  })
}

export function capacityUpdated(email:string, oldCapacity:number, newCapacity:number) {
  if (oldCapacity > newCapacity) {
    window.analytics.track('Dapp Capacity Decreased', {
      email, oldCapacity, newCapacity, ...defaultTrackProps()
    })
  }

  if (newCapacity > oldCapacity) {
    window.analytics.track('Dapp Capacity Increased', {
      email, oldCapacity, newCapacity, ...defaultTrackProps()
    })
  }
}

export function appMfaEnabled(email:string) {
  window.analytics.track('MFA Enabled - App', {
    email, ...defaultTrackProps()
  })
}

export function appMfaDisabled(email:string) {
  window.analytics.track('MFA Disabled - App', {
    email, ...defaultTrackProps()
  })
}

export const Track = {
  userLogin, userSignup, dappCreated, dappDeleted,
  cardAdded, cardUpdated, capacityUpdated,
  appMfaEnabled, appMfaDisabled
}

export default Track;