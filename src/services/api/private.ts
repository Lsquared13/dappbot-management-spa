import { 
  DappCreateArgs, DappData, UserResponseData, UserSetter 
} from '../../types';
import { 
  Operations, ListResponse, MessageResponse, ReadResponse, 
  ResourceFactory, RequestFactory
} from './types';

export class PrivateAPI {
  constructor(
    user:UserResponseData, 
    setUser:UserSetter,
    resourceFactory:ResourceFactory, 
    requestFactory:RequestFactory
  ){
    this.user = user;
    this.setUser = setUser;
    this.resourceFactory = resourceFactory;
    this.requestFactory = requestFactory;
  }
  user:UserResponseData
  setUser:(newUser:UserResponseData) => void
  resourceFactory:ResourceFactory
  requestFactory:RequestFactory

  create() {
    return this.resourceFactory<DappData, MessageResponse>(Operations.create, 'private');
  }
  
  delete() {
    return (dappName:string) => 
      this.resourceFactory<null, MessageResponse>(Operations.delete, 'private')(null, dappName);
  }
  
  edit() {
    return this.resourceFactory<DappCreateArgs, MessageResponse>(Operations.edit, 'private')
  }
  
  list() {
    return () => this.resourceFactory<null, ListResponse>(Operations.list, 'private')(null)
  }
  
  read() {
    return (dappName:string) => {
      return this.resourceFactory<null, ReadResponse>(Operations.read, 'private')(null, dappName)
    }
  }
}

export default PrivateAPI;