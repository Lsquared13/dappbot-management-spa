import React,{FC} from 'react';
import { Box, Text } from './ui';
import { UserResponseData } from "../types";

export interface PaymentBannerProps{
  paymentState: boolean
}
export const PaymentLapseBanner:FC<PaymentBannerProps> = ({paymentState}) => {
  switch(paymentState){
    case(true):
      return (
      <div className="payment-lapse-banner">
        <Box shape="square" top={true} padding={4} >
          <Text color='white' align="center" bold={true} size="lg">Payment is lapsed please enter new credit card info.</Text>
        </Box>
      </div>
      )
    default:
      console.log(paymentState)
      return null
  }
}