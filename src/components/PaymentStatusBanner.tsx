import React,{FC} from 'react';
import { Box, Text } from './ui';
import styled from "styled-components";

const RedWarningDiv = styled.div`
  background-color: red;
  opacity: .8;
`

export interface PaymentStatusBannerProps{
  paymentState: string
}
export const PaymentStatusBanner:FC<PaymentStatusBannerProps> = ({paymentState}) => {
  let msg;
  switch(paymentState){
    case("ACTIVE"):
      return null
    case("LAPSED"):
      msg = "Your payment method has failed. Please update your credit card info in order to avoid any disruption of service."
      break
    case("CANCELLED"):
      msg = "You previously cancelled your account.  Please restart your subscription in order to access your old dapps or create new ones."
      break
    case("FAILED"):
      msg = "Your account is no longer active due to having exceeded the time limit for updating payment info after payment failure."
      break
    default:
      console.error('received an unknown paymentState: ',paymentState);
      return null;
  }
  return(
    <RedWarningDiv>
      <Box shape="square" top={true} padding={4} >
        <Text color='white' align="center" bold={true} size="lg">{msg}</Text>
      </Box>
    </RedWarningDiv>
  )
}