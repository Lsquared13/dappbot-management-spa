import React, { FC } from "react";
import { Button, Box, Divider, Text } from "../../ui";
import { ButtonText } from "../utill";

export interface OrderSummaryProps {
  onPlaceOrder?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export const OrderSummary: FC<OrderSummaryProps> = props => {
  const { onPlaceOrder } = props;
  return (
    <Box>
      <Text bold>Order Summary</Text>

      <Box display="flex" justifyContent="between" marginTop={5}>
        <Text bold>Subtotal</Text>
        <Text bold>$10.00</Text>
      </Box>

      <Box
        display="flex"
        justifyContent="between"
        marginTop={5}
        marginBottom={8}
      >
        <Text bold>Estimated Tax</Text>
        <Text bold>$0.20</Text>
      </Box>

      <Divider type="secondary" />

      <Box
        display="flex"
        justifyContent="between"
        marginTop={8}
        marginBottom={8}
      >
        <Text bold>Total</Text>
        <Text bold>$10.20</Text>
      </Box>

      <Button block size="small" onClick={onPlaceOrder}>
        <ButtonText>Place Order</ButtonText>
      </Button>

      <Box marginTop={3}>
        <Text align="center" overflow="breakWord">
          By clicking ‘Place Order’ you accept the <a>Terms and Conditions</a>
          and
          <a> Privacy Policy</a>.
        </Text>
      </Box>
    </Box>
  );
};

OrderSummary.displayName = "OrderSummary";

export default OrderSummary;
