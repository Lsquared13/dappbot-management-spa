import * as React from "react";
import { Box } from "../../ui";
import { RouteComponentProps } from "@reach/router";
import CartItem, { CartItemDetail } from "./CartItem";

export interface CartProps extends RouteComponentProps {
  onCartChange?: (cartItems: CartItemDetail[]) => void;
  cartItems?: CartItemDetail[];
}

export interface CartState {
  cartItems: CartItemDetail[];
}

export class Cart extends React.Component<CartProps, CartState> {
  state = {
    cartItems: this.props.cartItems || []
  };

  onCartItemChange = (index: number, cartItem: CartItemDetail) => {
    let { cartItems } = this.state;
    let { onCartChange } = this.props;
    cartItems[index] = cartItem;
    this.setState({ cartItems }, () => {
      onCartChange && onCartChange({ ...this.state.cartItems });
    });
  };

  render() {
    let { cartItems, onCartChange } = this.props;
    return (
      <Box>
        {cartItems &&
          cartItems.map((item, index: number) => (
            <CartItem
              {...item}
              onCartItemChange={cartItem => {
                this.onCartItemChange(index, cartItem);
              }}
            />
          ))}
      </Box>
    );
  }
}

export default Cart;
