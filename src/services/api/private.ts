import API from '../api';
import { 
  DappCreateArgs, DappData, UserResponse, UserSetter 
} from '../../types';
import { Operations, AuthorizedRequest } from './types';

export class PrivateAPI extends API {
  constructor(user:UserResponse, setUser:UserSetter){
    super({user, setUser});
  }

  create(): (args: DappData, newDappName: string) => AuthorizedRequest {
    return this.requestFactory( Operations.create,'private')
  }
  
  delete(): (dappName: string) => AuthorizedRequest {
    const deleteFunc = this.requestFactory(Operations.delete,'private')
    return (dappName: string) => deleteFunc({}, dappName);
  }
  
  edit(): (args: DappCreateArgs) => AuthorizedRequest {
    return this.requestFactory(Operations.edit,'private');
  }
  
  list(): () => AuthorizedRequest {
    const listFunc = this.requestFactory(Operations.list,'private');
    return () => listFunc({});
  }
  
  read(): (dappName: string) => AuthorizedRequest {
    const readFunc = this.requestFactory(Operations.read, 'private');
    return (dappName: string) => readFunc({ DappName: dappName })
  }
}

export default PrivateAPI;