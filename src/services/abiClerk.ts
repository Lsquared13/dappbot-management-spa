import { DappCreateArgs, SampleDappArgs, DappData } from '../types';

interface RequestArgs {
  url: string,
  data: any
}

interface AuthorizedRequest extends RequestArgs {
  headers: any,
  method: string
}

function abiClerkEndpoint(method: string) {
  let apiCall = `${process.env.REACT_APP_DAPPBOT_API_ENDPOINT}/v1/private`
  return apiCall
}

function httpMethod(method: string) {
  let httpMethodType: string;
  switch(method) {
    case 'create':
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
function authorizedRequestFactory<Data>(user: any, method: string) {
  return (args: Data, target?:string) => {
    let url = abiClerkEndpoint(method)
    let urlextension = ""
    if(target !== "undefined"){
      urlextension = `/${target}`
    }
    let request = {
      url: `${url}${urlextension}`,
      data: args,
      method: httpMethod(method),
      headers: {
        Authorization: `Bearer ${user.signInUserSession && user.signInUserSession.idToken.jwtToken}`,
        'Content-Type': 'application/json'
      },
    };
    console.log(request)
    return request;
  }
}

function createRequest(user: any): (args: DappData, target: string) => AuthorizedRequest {
  return authorizedRequestFactory(user, 'create')
}

function deleteRequest(user: any): (dappName: string) => AuthorizedRequest {
  const deleteFunc = authorizedRequestFactory(user, 'delete')
  return (dappName: string) => deleteFunc({}, dappName);
}

function editRequest(user: any): (args: DappCreateArgs) => AuthorizedRequest {
  return authorizedRequestFactory(user, 'edit');
}

function listRequest(user: any): () => AuthorizedRequest {
  const listFunc = authorizedRequestFactory(user, 'list');
  return () => listFunc({});
}

function readRequest(user: any): (dappName: string) => AuthorizedRequest {
  const readFunc = authorizedRequestFactory(user, 'read');
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