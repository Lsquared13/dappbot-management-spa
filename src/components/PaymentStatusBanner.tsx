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
      msg = "Your payment method has failed. Please update your credit card info in order to avoid any disruption of service."
      break
    case("CANCELLED"):
      msg = "You previously cancelled your account.  Please restart your subscription in order to access your old dapps or create new ones."
      break
    default:
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