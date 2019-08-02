import { UserResponseData, UserSetter, defaultUserResponse } from "../../types";
import { request as resourceRequest } from 'react-request-hook';
import moment from 'moment';
import request from 'request-promise-native';
import { NavigateFn } from '@reach/router';
import AuthAPI from './auth';
import PrivateAPI from './private';
import {
  Operations, RootStrings, Headers, RootResources,
  AuthorizedRequest
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
  }

  user:UserResponseData
  setUser:(newUser:UserResponseData) => void
  auth:AuthAPI
  private:PrivateAPI

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
          httpMethodType = 'POST'
          break
        case Operations.login:
          httpMethodType = 'POST'
          break
        case Operations.resetPassword:
          httpMethodType = 'POST'
          break
        case Operations.delete:
          httpMethodType = 'DELETE'
          break
        case Operations.edit:
          httpMethodType = 'PUT'
          break
        case Operations.list:
        case Operations.read:
        default:
          httpMethodType = 'GET'
      }
      return httpMethodType
    }

    return (args: Args, subResource?:string) => {
      let headers:Headers = {
        'Content-Type': 'application/json'
      }
      if(rootResource === 'private'&& this.user){
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
   * Given a user & setUser, checks the ExpiresAt field
   * to see if the Authorization needs to be updated,
   * and then performs the update if necessary.  Returns
   * true if Authorization was updated, false if no
   * update was required, throws if something goes wrong
   * in the process.
   * @param user 
   * @param setUser 
   */
  async refreshAuthorization(){
    const user:UserResponseData = this.user;
    const setUser:UserSetter = this.setUser;
    if (user.RefreshToken === '' || user.ExpiresAt === ''){
      throw new Error("Please log in.")
    }
    if (moment(user.ExpiresAt).isAfter(moment.now())) {
      return this;
    }
    const refreshRequestFactory = this.auth.refresh();
    const refreshRequest = refreshRequestFactory({
      refreshToken : user.RefreshToken
    });
<<<<<<< HEAD
    console.log('refreshRequest: ',refreshRequest);
    const refreshResult = await request(refreshRequest);
    console.log('result: ',refreshResult);
    const RefreshedUser:UserResponseData = refreshResult.data;

    // Note that we spread the original object *then* add
    // the updated keys. Later entries overwrite earlier ones.
    setUser({
      ...user,
      Authorization : RefreshedUser.Authorization,
      ExpiresAt : RefreshedUser.ExpiresAt
    })
    return true;
=======
    try {
      const refreshResult = await request(refreshRequest);
      const RefreshedUser:UserResponseData = refreshResult.data;
      // Note that we spread the original object *then* add
      // the updated keys. Later entries overwrite earlier ones.
      const NewUser = {
        ...user,
        Authorization : RefreshedUser.Authorization,
        ExpiresAt : RefreshedUser.ExpiresAt
      }
      setUser(NewUser)
      return new API({
        user : NewUser,
        setUser
      })
    } catch (err) {
      setUser(defaultUserResponse());
      throw new Error("Unable to refresh your session, please log in again.");
    }
>>>>>>> master
  }
}


export default API;