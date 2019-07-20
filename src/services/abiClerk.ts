import { DappCreateArgs, SampleDappArgs, DappData } from '../types';

interface RequestArgs {
  url: string,
  data: any
}

interface AuthorizedRequest extends RequestArgs {
  headers: any,
  method: string
}

export function abiClerkEndpoint(method: string, rootResource:string='private') {
  let apiCall = `${process.env.REACT_APP_DAPPBOT_API_ENDPOINT}/v1/${rootResource}`
  return apiCall
}

function httpMethod(method: string) {
  let httpMethodType: string;
  switch(method) {
    case 'create':
      httpMethodType = 'POST'
      break
    case 'login':
      httpMethodType = 'POST'
      break
    case 'delete':
      httpMethodType = 'DELETE'
      break
    case 'edit':
      httpMethodType = 'PUT'
      break
    case 'list':
    case 'read':
    default:
      httpMethodType = 'GET'
  }
  return httpMethodType
}
// The <Data> declares a generic type, which represents the request
// data.  The returned function takes an argument of the same type
// as <Data>, so calls to `authorizedRequestFactory` simply need to
// provide a sample `data` in order to get a properly typed request fxn.
export function requestFactory<Data>(method: string, rootResource: string="private", user?: any) {
  return (args: Data, target?:string) => {
    let url = abiClerkEndpoint(method, rootResource)
    let urlextension = ""
    console.log(target)
    if(target !== undefined){
      urlextension = `/${target}`
    }
    let headers:any = {'Content-Type': 'application/json'}
    if(rootResource === 'private'){
      headers = {
        Authorization: `${user.signInUserSession && user.signInUserSession.idToken.jwtToken}`,
        'Content-Type': 'application/json'
      }
    }
    let request = {
      url: `${url}${urlextension}`,
      data: args,
      method: httpMethod(method),
      headers: headers,
    };
    console.log(request)
    return request;
  }
}

function createRequest(user: any): (args: DappData, target: string) => AuthorizedRequest {
  return requestFactory( 'create', user)
}

function deleteRequest(user: any): (dappName: string) => AuthorizedRequest {
  const deleteFunc = requestFactory('delete', user)
  return (dappName: string) => deleteFunc({}, dappName);
}

function editRequest(user: any): (args: DappCreateArgs) => AuthorizedRequest {
  return requestFactory('edit', user);
}

function listRequest(user: any): () => AuthorizedRequest {
  const listFunc = requestFactory('list', user);
  return () => listFunc({});
}

function readRequest(user: any): (dappName: string) => AuthorizedRequest {
  const readFunc = requestFactory(user, 'read');
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