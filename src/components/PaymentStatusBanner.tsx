import React,{FC} from 'react';
import { Box, Text } from './ui';
import { UserResponseData } from "../types";

export interface PaymentBannerProps{
  paymentState: string
}
export const PaymentStatusBanner:FC<PaymentBannerProps> = ({paymentState}) => {
  let msg = '';
  switch(paymentState){
    case("LAPSED"):
      msg = "Your payment method has failed. Please update your credit card info."
      break
    case("CANCELLED"):
      msg = "Your account has been cancelled and will no longer be able to access your old dapps or create new ones."
    default:
      console.log(paymentState)
      return null
  }
  return(
    <div className="payment-lapse-banner">
    <Box shape="square" top={true} padding={4} >
      <Text color='white' align="center" bold={true} size="lg">{msg}</Text>
    </Box>
  </div>
  )
}