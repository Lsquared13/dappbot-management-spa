import { UserResponse, UserSetter } from "../../types";
import moment from 'moment';
import request from 'request-promise-native';
import { NavigateFn } from '@reach/router';
import AuthAPI from './auth';
import PrivateAPI from './private';
import {
  Operations, RootStrings, Headers, RootResources
} from './types';

export interface APIConfig {
  user: UserResponse
  setUser: UserSetter
}

export class API {
  constructor(args:APIConfig){
    const { user, setUser } = args;
    this.user = user;
    this.setUser = setUser;
    this.auth = new AuthAPI(user, setUser);
    this.private = new PrivateAPI(user, setUser);
  }

  user:UserResponse
  setUser:(newUser:UserResponse) => void
  auth:AuthAPI
  private:PrivateAPI

  // The <Data> declares a generic type, which represents the request
  // data.  The returned function takes an argument of the same type
  // as <Data>, so calls to `authorizedRequestFactory` simply need to
  // provide a sample `data` in order to get a properly typed request fxn.
  requestFactory<Data>(operation: Operations, rootResource:RootStrings="private") {
    return (args: Data, subResource?:string) => {
      let headers:Headers = {
        'Content-Type': 'application/json'
      }
      if(rootResource === 'private'&& this.user){
        headers.Authorization = this.user.Authorization
      }
      let request = {
        url: this.dappbotUrl(rootResource).concat(subResource ? `/${subResource}` : ''),
        data: args,
        method: this.operationToHttpMethod(operation),
        headers: headers,
      };
      return request;
    }
  }

  dappbotUrl(rootResource:RootStrings=RootResources.private) {
    let apiCall = `${process.env.REACT_APP_DAPPBOT_API_ENDPOINT}/v1/${rootResource}`
    return apiCall
  }

  operationToHttpMethod(operation: Operations) {
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
    const user:UserResponse = this.user;
    const setUser:UserSetter = this.setUser;
    if (user.RefreshToken === '' || user.ExpiresAt === ''){
      throw new Error('No current user object, need to fully log in again.')
    }
    if (moment(user.ExpiresAt).isAfter(moment.now())) {
      return false;
    }
    const refreshRequestBuilder = this.auth.refresh();
    const refreshResult = await request(refreshRequestBuilder({
      refreshToken : user.RefreshToken
    }));
    const RefreshedUser:UserResponse = refreshResult.data;
    // Note that we spread the original object *then* add
    // the updated keys. Later entries overwrite earlier ones.
    setUser({
      ...user,
      Authorization : RefreshedUser.Authorization,
    })
    return true;
  }
}

export default API;