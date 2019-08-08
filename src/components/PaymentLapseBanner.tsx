import React,{FC} from 'react';
import { Box, Text } from './ui';
import { UserResponseData } from "../types";

export interface PaymentBannerProps{
  paymentState: boolean
}
export const PaymentLapseBanner:FC<PaymentBannerProps> = ({paymentState}) => {
  switch(paymentState){
    case(true):
      return <Box color='red' shape="square" top={true} >
        <Text color='white' align="center">Payment is lapsed please enter new credit card info.</Text>
      </Box>
    default:
      console.log(paymentState)
      return null
  }
}