import { DappCreateArgs, SampleDappArgs, DappData, UserResponse } from '../types';

interface RequestArgs {
  url: string,
  data: any
}

interface Headers {
  'Content-Type': string,
  Authorization?:string
}

interface AuthorizedRequest extends RequestArgs {
  headers: any,
  method: string
}

export function abiClerkEndpoint(method: string, rootResource:string='private') {
  let apiCall = `${process.env.REACT_APP_DAPPBOT_API_ENDPOINT}/v1/${rootResource}`
  return apiCall
}
export enum Operations {
  create = "create",
  login = "login",
  resetPassword = "reset-password",
  delete = "delete",
  edit = "edit",
  list = "list",
  read = "read"
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
// The <Data> declares a generic type, which represents the request
// data.  The returned function takes an argument of the same type
// as <Data>, so calls to `authorizedRequestFactory` simply need to
// provide a sample `data` in order to get a properly typed request fxn.
export function requestFactory<Data>(operation: Operations, rootResource: string="private", user?: UserResponse) {
  return (args: Data, target?:string) => {
    let url = abiClerkEndpoint(operation, rootResource)
    let urlextension = ""
    console.log(target)
    if(target !== undefined){
      urlextension = `/${target}`
    }
    let headers:Headers = {'Content-Type': 'application/json'}
    if(rootResource === 'private'&& user){
      headers = {
        Authorization: `${user.Authorization}`,
        'Content-Type': 'application/json'
      }
    }
    let request = {
      url: `${url}${urlextension}`,
      data: args,
      method: operationToHttpMethod(operation),
      headers: headers,
    };
    console.log(request)
    return request;
  }
}



function createRequest(user: UserResponse): (args: DappData, target: string) => AuthorizedRequest {
  return requestFactory( Operations.create,'private', user)
}

function deleteRequest(user: UserResponse): (dappName: string) => AuthorizedRequest {
  const deleteFunc = requestFactory(Operations.delete,'private', user)
  return (dappName: string) => deleteFunc({}, dappName);
}

function editRequest(user: UserResponse): (args: DappCreateArgs) => AuthorizedRequest {
  return requestFactory(Operations.edit,'private', user);
}

function listRequest(user: UserResponse): () => AuthorizedRequest {
  const listFunc = requestFactory(Operations.list,'private', user);
  return () => listFunc({});
}

function readRequest(user: UserResponse): (dappName: string) => AuthorizedRequest {
  const readFunc = requestFactory(Operations.read, 'private', user);
  return (dappName: string) => readFunc({ DappName: dappName })
}

export const ABIClerk = {
  create: createRequest,
  read: readRequest,
  delete: deleteRequest,
  list: listRequest,
  edit: editRequest
}

export default ABIClerk;