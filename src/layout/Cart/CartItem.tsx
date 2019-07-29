import * as React from "react";
import { RouteComponentProps } from "@reach/router";
import { Box, Checkbox, Text, Icon } from "../../components/ui";
import { InputTitle } from "../../layout";
import SelectList from "../../components/ui/SelectList";

export interface CartItemDetail {
  plan: "Standard" | "Professional" | "Enterprise";
  customBrand: boolean;
  customDomain: boolean;
  customMarkup: boolean;
  count: number;
  amount: number;
  totalAmount: number;
}

export interface CartItemProps extends RouteComponentProps, CartItemDetail {
  onCartItemChange?: (cartItem: CartItemDetail) => void;
}

export interface CartItemState extends CartItemDetail {}

export const planType = [
  {
    value: "Standard",
    label: "Standard"
  },
  {
    value: "Enterprise",
    label: "Enterprise"
  },
  {
    value: "Prpfessional",
    label: "Prpfessional"
  }
];

export class CartItem extends React.Component<CartItemProps, CartItemState> {
  state = {
    plan: this.props.plan || "Standard",
    customBrand: this.props.customBrand || false,
    customDomain: this.props.customDomain || false,
    customMarkup: this.props.customMarkup || false,
    count: this.props.count || 1,
    amount: this.props.amount || 10,
    totalAmount: this.props.totalAmount || 10
  };

  brodcastChange = () => {
    let { onCartItemChange } = this.props;
    onCartItemChange && onCartItemChange({ ...this.state });
  };

  onCustomBrandChange = (value: CartItemDetail["customBrand"]) => {
    this.setState(
      prevState => ({
        customBrand: value
        // amount: prevState.amount + (value ? 1 : -1),
        // totalAmount: prevState.amount * (prevState.count + 1)
      }),
      this.brodcastChange
    );
  };

  onCustomMarkupChange = (value: CartItemDetail["customMarkup"]) => {
    this.setState(
      prevState => ({
        customMarkup: value
        // amount: prevState.amount + (value ? 1 : -1),
        // totalAmount: prevState.amount * (prevState.count + 1)
      }),
      this.brodcastChange
    );
  };

  onCustomDomainChange = (value: CartItemDetail["customDomain"]) => {
    this.setState(
      prevState => ({
        customDomain: value
        // amount: prevState.amount + (value ? 1 : -1),
        // totalAmount: prevState.amount * (prevState.count + 1)
      }),
      this.brodcastChange
    );
  };

  onPlanChange = (value: CartItemDetail["plan"]) => {
    this.setState(
      {
        plan: value
      },
      this.brodcastChange
    );
  };

  onCartItemIncrement = () => {
    // console.log("sss");
    this.setState(
      prevState => ({
        count: prevState.count + 1,
        totalAmount: prevState.amount * (prevState.count + 1)
      }),
      this.brodcastChange
    );
  };

  onCartItemDecrement = () => {
    this.setState((prevState: CartItemState) => {
      if (prevState.count > 1) {
        return {
          count: prevState.count - 1,
          totalAmount: prevState.amount * (prevState.count - 1)
        };
      } else return prevState;
    }, this.brodcastChange);
  };

  render() {
    let {
      plan,
      customBrand,
      customDomain,
      customMarkup,
      count,
      amount,
      totalAmount
    } = this.state;
    return (
      <Box
        display="flex"
        direction="row"
        justifyContent="between"
        padding={6}
        marginBottom={10}
        dangerouslySetInlineStyle={{
          __style: {
            border: "1px solid #E6EAEE"
          }
        }}
      >
        <Box>
          <Text bold size="lg" smSize="lg" mdSize="lg" lgSize="lg">
            {plan} Dapp
          </Text>
          <Box display="flex" alignItems="center">
            <Text
              inline
              bold
              size="xs"
              smSize="xs"
              mdSize="xs"
              lgSize="xs"
              color="blue"
            >
              Remove
            </Text>
            <Text
              inline
              bold
              size="xs"
              smSize="xs"
              mdSize="xs"
              lgSize="xs"
              color="blue"
            >
              <Box marginTop={1} marginLeft={1}>
                <Icon icon="close" />
              </Box>
            </Text>
          </Box>
        </Box>
        <Box>
          <InputTitle color="gray">Plan Type</InputTitle>
          <Box marginTop={1}>
            <SelectList
              id="network"
              name="network"
              onChange={({ event, value }) => {
                this.onPlanChange(value as CartItemDetail["plan"]);
              }}
              options={planType}
              placeholder="Select network"
              value={plan}
            />
          </Box>
        </Box>
        <Box>
          <InputTitle color="gray">Custom Markup</InputTitle>
          <Box marginTop={1}>
            <Checkbox
              id="markup"
              checked={customMarkup}
              name="markup"
              onChange={({ event, checked }) => {
                this.onCustomMarkupChange(checked);
              }}
            />
          </Box>
        </Box>
        <Box>
          <InputTitle color="gray">Custom Brand</InputTitle>
          <Box marginTop={1}>
            <Checkbox
              id="brand"
              checked={customBrand}
              name="brand"
              onChange={({ event, checked }) => {
                this.onCustomBrandChange(checked);
              }}
            />
          </Box>
        </Box>
        <Box>
          <InputTitle color="gray">Custom Brand</InputTitle>
          <Box marginTop={1}>
            <Checkbox
              id="domain"
              checked={customDomain}
              name="domain"
              onChange={({ event, checked }) => {
                this.onCustomDomainChange(checked);
              }}
            />
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          <Text bold inline>
            {count}
          </Text>
          <Box
            width={30}
            height={30}
            marginLeft={3}
            display="flex"
            shape="roundedLeft"
            alignItems="center"
            justifyContent="center"
            dangerouslySetInlineStyle={{
              __style: {
                border: "1px solid #E6EAEE",
                cursor: "pointer"
              }
            }}
          >
            <Icon icon="minus" onClick={this.onCartItemDecrement} />
          </Box>
          <Box
            width={30}
            height={30}
            display="flex"
            shape="roundedRight"
            alignItems="center"
            justifyContent="center"
            dangerouslySetInlineStyle={{
              __style: {
                border: "1px solid #E6EAEE",
                cursor: "pointer"
              }
            }}
          >
            <Icon icon="add" onClick={this.onCartItemIncrement} />
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          <Text bold inline align="center">
            ${amount}
          </Text>
        </Box>
        <Box display="flex" alignItems="center">
          <Text bold inline align="center">
            ${totalAmount}
          </Text>
        </Box>
      </Box>
    );
  }
}

export default CartItem;
