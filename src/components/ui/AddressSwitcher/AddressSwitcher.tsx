import * as React from "react";
import Address from "./Address";
import Box from "../Box";
import Divider from "../Divider";
import Icon, { IconProps } from "../Icon";
import Link from "../Link";
import Text from "../Text";

export interface IAddress {
  address: string;
  label: string;
  icon?: IconProps["icon"];
}

export interface AddressSwitcherProps {
  /**
   * func, Event --> Address select event
   **/
  onSelect?: (index: any, data: any) => void;
  /**
   * array, array of IAddress
   *
   * IAddress type:
   *  {
   *      address: string,
   *      label: string,
   *      icon?: IconOptions
   *  }
   *
   * IconOptions includes:
   *
   * Icon options include:
   * "user"| "members"| "avatar"| "signature"| "terms-of-service"| "privacy-policy"| "flag"| "loading"| "send"| "receive"| "qr-code"| "time"| "info"| "help"| "warning"| "more"| "grid-view"| "list-view"| "description"| "stats"| "tally"| "check"| "language"| "world"| "home"| "notification"| "settings"| "menu"| "camera"| "media"| "email"| "calendar"| "book"| "visible"| "hidden"| "work"| "organization"| "environment"| "ruler"| "clipboard"| "broadcast"| "EXC-logo"| "hourglass"| "blockmaker"| "tx-status"| "gas"| "wallet"| "transfer"| "seed-phrase"| "forward-ios"| "back-ios"| "keyboard-down"| "keyboard-up"| "keyboard-left"| "keyboard-right"| "downward"| "upward"| "drop-down"| "drop-up"| "left"| "right"| "right-alt"| "vote"| "governance"| "promotion"| "demotion"| "candidate"| "cycle"| "token-claim"| "kyc-validated"| "shield"| "key"| "fingerprint"| "passcode"| "password-security"| "lock"| "trash"| "copy"| "edit"| "search"| "close"| "add"| "minus"| "filter"| "backspace"| "activity"| "identity"| "not-tilted"
   *
   * example :
        [
          {
            address: '0x123456789...',
            label: '12,843.12 EXC',
            icon: 'blockmaker'
          },
            ... ,
          {
            address: '0x123456789...',
            label: '12,843.12 EXC',
            icon: 'blockmaker'
          }
        ]
   **/
  addresses: IAddress[];
  /**
   * string, title for address switcher
   **/
  title?: string;
}

export interface AddressSwitcherState {
  cursor: number;
  address: IAddress;
}

export class AddressSwitcher extends React.Component<
  AddressSwitcherProps,
  AddressSwitcherState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      cursor: 0,
      address: this.props.addresses[0]
    };
    this.onUpArrowClick = this.onUpArrowClick.bind(this);
    this.onDownArrowClick = this.onDownArrowClick.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  onUpArrowClick() {
    this.setState(prevState => {
      var cursor = prevState.cursor - 1 >= 0 ? prevState.cursor - 1 : 0;
      return {
        cursor: cursor,
        address: this.props.addresses[cursor]
      };
    });
  }

  onDownArrowClick() {
    this.setState(prevState => {
      var cursor =
        prevState.cursor + 1 >= this.props.addresses.length
          ? this.props.addresses.length - 1
          : prevState.cursor + 1;
      return {
        cursor: cursor,
        address: this.props.addresses[cursor]
      };
    });
  }

  onSelect(event: any, data: any) {
    this.props.onSelect && this.props.onSelect(this.state.cursor, data);
  }

  getContent() {
    if (this.state.address) {
      return (
        <Box display="flex">
          <Box flex="grow">
            <Address
              address={this.state.address.address}
              label={this.state.address.label}
              onClick={this.onSelect}
              icon={this.state.address.icon}
            />
          </Box>
          <Box display="flex" direction="column">
            <Box paddingX={3}>
              <Link href="javascript:;" onClick={this.onUpArrowClick}>
                <Text size="xl" color="gray">
                  <Icon icon="drop-up" />
                </Text>
              </Link>
            </Box>
            <Box paddingX={3}>
              <Link href="javascript:;" onClick={this.onDownArrowClick}>
                <Text size="xl" color="gray">
                  <Icon icon="drop-down" />
                </Text>
              </Link>
            </Box>
          </Box>
        </Box>
      );
    } else {
      return <Text color="gray">No address found!!</Text>;
    }
  }

  render() {
    let { title } = this.props;
    let content = this.getContent();
    return (
      <Box>
        <Box marginBottom={3}>
          <Text color="gray" size="xs" textTransform="uppercase">
            {title}
          </Text>
        </Box>
        <Divider />
        <Box marginTop={2}>{content}</Box>
      </Box>
    );
  }
}

export default AddressSwitcher;
