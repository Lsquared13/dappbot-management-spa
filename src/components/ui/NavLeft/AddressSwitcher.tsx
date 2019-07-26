import * as React from 'react';
import classnames from 'classnames';
import Address from './Address';

export interface IAddress {
  title: string,
  label: string,
  icon?: AddressIconOptions
}

export const AddressSwitcherStyles = {
  left: 'left',
  right: 'right'
}
export type AddressIconOptions =
  | "add"
  | "blockmaker"
  | "chevronLeft"
  | "close"
  | "cycle"
  | "demotion"
  | "filter"
  | "governanceCycle"
  | "help"
  | "home"
  | "listView"
  | "media"
  | "members"
  | "more"
  | "node"
  | "notificationBell"
  | "promotion"
  | "remove"
  | "search"
  | "settings"
  | "upload"
  | "user"
  | "vote"
  | "arrowDown";

export interface Props {
  /**
   * func, Event --> Address select event
   **/
  onSelect?: (index: any, data: any) => void;
  /**
   * array, array of IAddress
   *
   * IAddress type:
   *  {
   *      title: string,
   *      label: string,
   *      icon?: AddressIconOptions
   *  }
   *
   * AddressIconOptions includes:
   *
   * Icon options include:
   * 'add' | 'blockmaker' |'chevronLeft' |'close' | 'cycle' |'demotion' |'filte' |'governanceCycle' |'help' |'home' |'listView' |'media' |'members' |'more' |'node' |'notificationBell' |'promotion' |'remove' |'search' |'settings' |'upload' |'user' |'vote' |'arrowDown'
   *
   * example :
        [
          {
            title: '0x123456789...',
            label: '12,843.12 EXC',
            icon: 'blockmaker'
          },
            ... ,
          {
            title: '0x123456789...',
            label: '12,843.12 EXC',
            icon: 'blockmaker'
          }
        ]
   **/
  address: string
  /**
   * string, title for address switcher
   **/
  title?: string;
  /**
   * string, custom class prefix for css
   * @default address-switcher
   **/
  customClass?: string;
  /**
   * string, class to apply on component
   **/
  className?: string;
  onLoginShow: () => void
}

export interface State {
  cursor: number,
  address: IAddress
}

export class AddressSwitcher extends React.Component<Props, State> {

  static defaultProps = {
    customClass: 'address-switcher'
  }

  constructor(props: any) {
    super(props);
    this.state = {
      cursor: 0,
      address: 
        {
          title: '0x',
          label: 'Not Authenticated',
          icon: 'blockmaker'
        }
    };
    // this.onUpArrowClick = this.onUpArrowClick.bind(this);
    // this.onDownArrowClick = this.onDownArrowClick.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  // onUpArrowClick() {
  //   this.setState(
  //     prevState => {
  //       var cursor = (prevState.cursor - 1) >= 0 ? (prevState.cursor - 1) : 0;
  //       return {
  //         cursor: cursor,
  //         address: this.props.address
  //       }
  //     }
  //   )
  // }

  // onDownArrowClick() {
  //   this.setState(
  //     prevState => {
  //       var cursor = ((prevState.cursor + 1) >= this.props.addresses.length) ? this.props.addresses.length - 1 : prevState.cursor + 1;
  //       return {
  //         cursor: cursor,
  //         address: this.props.addresses[cursor]
  //       }
  //     }
  //   )
  // }

  onSelect(event: any, data: any) {
    this.props.onSelect && this.props.onSelect(this.state.cursor, data);
  }

  getContent() {
    let { customClass } = this.props;
    if (this.props.address) {
      return (
        <div>
          <div className={customClass + '-' + AddressSwitcherStyles.left} >
            <Address title={this.props.address} label="authenticated" onClick={this.onSelect} icon="user"></Address>
          </div>
         
        </div>
      )
    } else {
      return (<p>No address found.  <button className={"address-switcher btn-login"} onClick={this.props.onLoginShow}>Please sign in to continue </button></p>)
    }
  }

  render() {
    let { className, customClass, title } = this.props;
    let classes = classnames(customClass, className);
    let content = this.getContent();
    return (
      <div className={classes}>
        <p>{title}</p>
        <hr />
        {content}
      </div>
    )
  }
}

export default AddressSwitcher;
