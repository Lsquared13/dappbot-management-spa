import { 
  UserResponseData, UserSetter, User,
  UserCreateArgs
} from '../../types';
import { 
  Operations, ResourceFactory, RequestFactory,
  StripeUserDataResponse, 
  StripeCancelResponse, UserCreateResponse,
  UpdatePlanCountArgs, UpdatePlanCountResponse,
  UpdatePaymentArgs, UpdatePaymentResponse
} from './types'

export class PaymentAPI {
  constructor(
    user: UserResponseData,
    setUser: UserSetter,
    resourceFactory:ResourceFactory, 
    requestFactory:RequestFactory
  ){
    this.user = user;
    this.setUser = setUser;
    this.requestFactory = requestFactory;
    this.resourceFactory = resourceFactory;
  }

  user:UserResponseData
  setUser:(newUser:UserResponseData) => void
  resourceFactory:ResourceFactory
  requestFactory:RequestFactory


  createUser(){
    return (args:UserCreateArgs) => {
      return this.resourceFactory<UserCreateArgs, UserCreateResponse>(Operations.signup, 'payment')(args, 'stripe');
    }
  }

  getUserStripeData(){
    return () => {
      let getDataRequest = this.resourceFactory<null, StripeUserDataResponse>(Operations.readStripeData, 'payment')(null, 'stripe');
      console.log('getDataRequest: ',getDataRequest);
      return getDataRequest;
    }
  }

  cancelSubscription(){
    return () => {
      return this.resourceFactory<null, StripeCancelResponse>(Operations.cancelStripe, 'payment')(null, 'stripe');
    }
  }

  updatePlanCounts(){
    return (args:UpdatePlanCountArgs) => {
      return this.resourceFactory<UpdatePlanCountArgs, UpdatePlanCountResponse>(Operations.updatePlanCount, 'payment')(args, 'stripe');
    }
  }

  updatePaymentMethod(){
    return (args:UpdatePaymentArgs) => {
      let updatePaymentReq = this.resourceFactory<UpdatePaymentArgs, UpdatePaymentResponse>(Operations.updatePayment, 'payment')(args, 'stripe');
      console.log('updatePaymentReq: ',updatePaymentReq);
      return updatePaymentReq;
    }
  }

}

export default PaymentAPI;