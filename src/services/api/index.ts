import { UserResponseData, UserSetter, emptyUserResponse } from "../../types";
import { request as resourceRequest } from 'react-request-hook';
import Alert from 'react-s-alert';
import moment from 'moment';
import request from 'request-promise-native';
import { NavigateFn } from '@reach/router';
import AuthAPI from './auth';
import PrivateAPI from './private';
import PaymentAPI from './payment';
import {
  Operations, RootStrings, Headers, RootResources,
  AuthorizedRequest, ResourceFactory, RequestFactory
} from './types';

export * from './types';

export interface APIConfig {
  user: UserResponseData
  setUser: UserSetter
}

export class API {
  constructor(args:APIConfig){
    const { user, setUser } = args;
    this.user = user;
    this.setUser = setUser;
    this.auth = new AuthAPI(user, setUser, this.resourceFactory, this.requestFactory);
    this.private = new PrivateAPI(user, setUser, this.resourceFactory, this.requestFactory);
    this.payment = new PaymentAPI(user, setUser, this.resourceFactory, this.requestFactory);
  }

  user:UserResponseData
  setUser:(newUser:UserResponseData) => void
  auth:AuthAPI
  private:PrivateAPI
  payment:PaymentAPI

  // Instruments the `requestFactory` to specifically return
  // react-request-hook resources, specifically declaring
  // the return value of the resource.  The generic args
  // alow you to specify both the inputs and outputs of the
  // request.
  resourceFactory<Args, Returns>(operation: Operations, rootResource:RootStrings="private") {
    return (args:Args, subResource?:string) => {
      return resourceRequest<Returns>(this.requestFactory(operation, rootResource)(args, subResource))
    }
  }

  // The <Data> declares a generic type, which represents the request
  // data.  The returned function takes an argument of the same type
  // as <Data>, so calls to `authorizedRequestFactory` simply need to
  // provide a sample `data` in order to get a properly typed request fxn.
  // The objects returned by `requestFactory` can be given to any
  // fetch library. Defining the helpers within this same function so
  // that the fxns are still available when these methods get copied
  // onto child API's `this` values.
  requestFactory<Args>(operation: Operations, rootResource:RootStrings="private") {
    
    function dappbotUrl(rootResource:RootStrings=RootResources.private) {
      let apiCall = `${process.env.REACT_APP_DAPPBOT_API_ENDPOINT}/v1/${rootResource}`
      return apiCall
    }

    function operationToHttpMethod(operation: Operations) {
      let httpMethodType: string;
      switch(operation) {
        case Operations.create:
        case Operations.signup:
        case Operations.login:
        case Operations.resetPassword:
          httpMethodType = 'POST'
          break
        case Operations.delete:
        case Operations.cancelStripe:
          httpMethodType = 'DELETE'
          break
        case Operations.edit:
        case Operations.updatePayment:
        case Operations.updatePlanCount:
          httpMethodType = 'PUT'
          break
        case Operations.list:
        case Operations.read:
        case Operations.readStripeData:
          httpMethodType = 'GET';
          break;
        default:
          throw new Error(`Unrecognized operation : ${operation}`);
      }
      return httpMethodType
    }

    return (args: Args, subResource?:string) => {
      let headers:Headers = {
        'Content-Type': 'application/json'
      }
      if(['private','payment'].includes(rootResource) && this.user){
        headers.Authorization = this.user.Authorization
      }
      let request = {
        url: dappbotUrl(rootResource).concat(subResource ? `/${subResource}` : ''),
        data: args,
        method: operationToHttpMethod(operation),
        headers: headers,
      } as AuthorizedRequest;
      return request;
    }
  }

  /**
   * Checks the ExpiresAt field to see if the Authorization
   * needs to be updated, and then performs the update 
   * if necessary.  Returns a new API object if the user
   * was updated, returns self if nothing changed, throws
   * an error if something goes wrong in the process.
   */
  async refreshAuthorization(){
    const { user } = this;

    // user === emptyUserResponse()
    if (user.RefreshToken === '' || user.ExpiresAt === ''){
      throw new Error("Please log in.")
    }

    if (moment(user.ExpiresAt).isAfter(moment.now())) {
      return this;
    } else {
      return this.refreshUser()
    }
  }

  /**
   * Refreshes the full user object, updating each 
   * parameter except for RefreshToken.
   */
  async refreshUser(){
    const { user, setUser } = this;
    if (!user.RefreshToken) throw new Error("Please log in.");
    const refreshRequest = this.auth.refresh()({
      refreshToken : user.RefreshToken
    });
    try {
      const refreshResult = await request(refreshRequest);
      const RefreshedUser:UserResponseData = refreshResult.data;
      // Use the assign because RefreshedUser doesn't have
      // the RefreshToken on it.
      const NewUser = Object.assign({ RefreshToken : user.RefreshToken }, RefreshedUser);
      setUser(NewUser)
      return new API({
        user : NewUser,
        setUser
      })
    } catch (err) {
      setUser(emptyUserResponse());
      throw new Error("Unable to refresh your session, please log in again.");
    }
  }
}


export default API;