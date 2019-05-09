import { DappArgs, SampleDappArgs } from '../types';

interface RequestArgs {
  url: string,
  data: any
}

interface AuthorizedRequest extends RequestArgs {
  headers: {
    Authorization: string
  },
  method: string
}

function abiClerkEndpoint(method: string) {
  return `${process.env.REACT_APP_DAPPSMITH_ENDPOINT}/test/${method}`
}

// The <Data> declares a generic type, which represents the request
// data.  The returned function takes an argument of the same type
// as <Data>, so calls to `authorizedRequestFactory` simply need to
// provide a sample `data` in order to get a properly typed request fxn.
function authorizedRequestFactory<Data>(user: any, method: string, data: Data) {
  return (args: Data) => {
    console.log('userVal: ',user);
    let request = {
      url: abiClerkEndpoint(method),
      data: args,
      method: 'POST',
      headers: {
        Authorization: user.signInUserSession && user.signInUserSession.accessToken,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': process.env.REACT_APP_DAPPSMITH_ENDPOINT,
        Accept : 'application/json'
      },
    };
    console.log('request: ', request);
    return request;
  }
}

function createRequest(user: any): (args: DappArgs) => AuthorizedRequest {
  return authorizedRequestFactory(user, 'create', SampleDappArgs())
}

function deleteRequest(user: any): (dappName: string) => AuthorizedRequest {
  const deleteFunc = authorizedRequestFactory(user, 'delete', { DappName: 'DappName' })
  return (dappName: string) => deleteFunc({ DappName: dappName });
}

function editRequest(user: any): (args: DappArgs) => AuthorizedRequest {
  return authorizedRequestFactory(user, 'edit', SampleDappArgs());
}

function listRequest(user: any): () => AuthorizedRequest {
  const listFunc = authorizedRequestFactory(user, 'list', {});
  return () => listFunc({});
}

function readRequest(user: any): (dappName: string) => AuthorizedRequest {
  const readFunc = authorizedRequestFactory(user, 'read', { DappName: 'DappName' });
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