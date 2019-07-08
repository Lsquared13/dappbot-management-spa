import * as React from "react";
import { Container } from "../Container";
import { Box, Text } from "../../ui";
import {
  LayoutContainer,
  InputGroup,
  InputTitle,
  InputContainer,
  Description,
  ReferenceLink
} from "../utill";
import Input from "../../ui/NavLeft/Input";
import { RouteComponentProps } from "@reach/router";
import SelectList from "../../ui/SelectListOLD";

export type InputEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>
  | React.ChangeEvent<HTMLTextAreaElement>
  | undefined;

export interface PaymentDetailsProps extends RouteComponentProps {
  onInputChange?: (inputs: PaymentDetailsState) => void;
}

export interface PaymentDetailsState {
  selectedExpMonth: string;
  selectedExpYear: string;
  selectedCountry: string;
  selectedState: string;
  creditNumber: string;
  fname: string;
  lname: string;
  company: string;
  street1: string;
  street2: string;
  city: string;
  zip: string;
  cvv: string;
}

export const expMonth = [
  {
    value: "",
    label: "Exp. Month"
  },
  {
    value: "jan",
    label: "January"
  },
  {
    value: "feb",
    label: "February"
  }
];

export const expYear = [
  {
    value: "",
    label: "Exp. Year"
  },
  {
    value: "2000",
    label: "2000"
  },
  {
    value: "2001",
    label: "2001"
  }
];

export const country = [
  {
    value: "",
    label: "Country"
  },
  {
    value: "ind",
    label: "India"
  },
  {
    value: "us",
    label: "USA"
  }
];

export const state = [
  {
    value: "",
    label: "State"
  },
  {
    value: "guju",
    label: "Gujarat"
  },
  {
    value: "dh",
    label: "Delhi"
  }
];

export class PaymentDetails extends React.Component<
  PaymentDetailsProps,
  PaymentDetailsState
> {
  state = {
    selectedExpMonth: "",
    selectedExpYear: "",
    selectedCountry: "",
    selectedState: "",
    creditNumber: "",
    fname: "",
    lname: "",
    company: "",
    street1: "",
    street2: "",
    city: "",
    zip: "",
    cvv: ""
  };

  broadcastInputs = () => {
    let { onInputChange } = this.props;
    onInputChange && onInputChange(Object.assign({}, this.state));
  };

  onExpMonthChange = ({ event, value }: any) => {
    let isEthNetwork = value === "eth";
    this.setState(
      prevState => ({
        selectedExpMonth: value
      }),
      this.broadcastInputs
    );
  };

  onExpYearChange = ({ event, value }: any) => {
    let isEthNetwork = value === "eth";
    this.setState(
      prevState => ({
        selectedExpYear: value
      }),
      this.broadcastInputs
    );
  };

  onCountryChange = ({ event, value }: any) => {
    let isEthNetwork = value === "eth";
    this.setState(
      prevState => ({
        selectedCountry: value
      }),
      this.broadcastInputs
    );
  };

  onStateChange = ({ event, value }: any) => {
    let isEthNetwork = value === "eth";
    this.setState(
      prevState => ({
        selectedState: value
      }),
      this.broadcastInputs
    );
  };

  onCreditNumberChange = (event: InputEvent) => {
    if (event && event.target) {
      this.setState(
        {
          creditNumber: event.target.value
        },
        this.broadcastInputs
      );
    }
  };

  onCVVChange = (event: InputEvent) => {
    if (event && event.target) {
      this.setState(
        {
          cvv: event.target.value
        },
        this.broadcastInputs
      );
    }
  };

  onFirstNameChange = (event: InputEvent) => {
    if (event && event.target) {
      this.setState(
        {
          fname: event.target.value
        },
        this.broadcastInputs
      );
    }
  };

  onLastNameChange = (event: InputEvent) => {
    if (event && event.target) {
      this.setState(
        {
          lname: event.target.value
        },
        this.broadcastInputs
      );
    }
  };

  onCompanyChange = (event: InputEvent) => {
    if (event && event.target) {
      this.setState(
        {
          company: event.target.value
        },
        this.broadcastInputs
      );
    }
  };

  onstreet1Change = (event: InputEvent) => {
    if (event && event.target) {
      this.setState(
        {
          street1: event.target.value
        },
        this.broadcastInputs
      );
    }
  };

  onstreet2Change = (event: InputEvent) => {
    if (event && event.target) {
      this.setState(
        {
          street2: event.target.value
        },
        this.broadcastInputs
      );
    }
  };

  onCityChange = (event: InputEvent) => {
    if (event && event.target) {
      this.setState(
        {
          city: event.target.value
        },
        this.broadcastInputs
      );
    }
  };

  onZipChange = (event: InputEvent) => {
    if (event && event.target) {
      this.setState(
        {
          zip: event.target.value
        },
        this.broadcastInputs
      );
    }
  };

  render() {
    return (
      <Box>
        <Box marginBottom={4}>
          <Text
            bold
            size="lg"
            smSize="lg"
            mdSize="lg"
            lgSize="lg"
            textTransform="capitalize"
          >
            Payment Details
          </Text>
        </Box>
        <InputGroup>
          <InputTitle>Credit Card Number</InputTitle>
          <InputContainer>
            <Input
              name="creditCardNumber"
              value={this.state.creditNumber}
              onChange={this.onCreditNumberChange}
              type="text"
              placeholder="Credit Card Number"
            />
          </InputContainer>
          <InputContainer>
            <Box display="flex" width="100%">
              <Box flex="grow" display="inlineBlock">
                <SelectList
                  id="network"
                  name="network"
                  onChange={this.onExpMonthChange}
                  options={expMonth}
                  placeholder="Exp. Month"
                  value={this.state.selectedExpMonth}
                />
              </Box>
              <Box
                flex="grow"
                display="inlineBlock"
                marginLeft={2}
                marginRight={2}
              >
                <SelectList
                  id="network"
                  name="network"
                  onChange={this.onExpYearChange}
                  options={expYear}
                  placeholder="Exp. Year"
                  value={this.state.selectedExpYear}
                />
              </Box>
              <Box flex="grow" display="inlineBlock">
                <Input
                  className="cvv"
                  name="cvv"
                  value={this.state.cvv}
                  onChange={this.onCVVChange}
                  type="password"
                  placeholder="CVV"
                />
              </Box>
            </Box>
          </InputContainer>
        </InputGroup>
        <InputGroup>
          <InputTitle>Billing Address</InputTitle>
          <InputContainer>
            <SelectList
              id="country"
              name="country"
              onChange={this.onCountryChange}
              options={country}
              placeholder="Select network"
              value={this.state.selectedCountry}
            />
          </InputContainer>
          <InputContainer>
            <Box flex="grow" marginRight={2}>
              <Input
                name="fname"
                value={this.state.fname}
                onChange={this.onFirstNameChange}
                type="text"
                placeholder="First Name"
              />
            </Box>
            <Box flex="grow" marginLeft={2}>
              <Input
                name="lname"
                value={this.state.lname}
                onChange={this.onLastNameChange}
                type="text"
                placeholder="Last Name"
              />
            </Box>
          </InputContainer>
          <InputContainer>
            <Input
              name="company"
              value={this.state.company}
              onChange={this.onCompanyChange}
              type="text"
              placeholder="Company (Optional)"
            />
          </InputContainer>
          <InputContainer>
            <Input
              name="street1"
              value={this.state.street1}
              onChange={this.onstreet1Change}
              type="text"
              placeholder="Street 1"
            />
          </InputContainer>
          <InputContainer>
            <Input
              name="street2"
              value={this.state.street2}
              onChange={this.onstreet2Change}
              type="text"
              placeholder="Street 2 (Optional)"
            />
          </InputContainer>
          <InputContainer>
            <Box flex="grow">
              <Input
                name="city"
                value={this.state.city}
                onChange={this.onCityChange}
                type="text"
                placeholder="City"
              />
            </Box>
            <Box flex="grow" marginLeft={2} marginRight={2}>
              <SelectList
                id="state"
                name="state"
                onChange={this.onStateChange}
                options={state}
                placeholder="Select State"
                value={this.state.selectedState}
              />
            </Box>
            <Box flex="grow">
              <Input
                name="zip"
                value={this.state.zip}
                onChange={this.onZipChange}
                type="text"
                placeholder="Zip"
              />
            </Box>
          </InputContainer>
        </InputGroup>
      </Box>
    );
  }
}

export default PaymentDetails;
