import * as React from "react";
//import onClickOutside from "react-onclickoutside";
import DropdownTrigger from "./DropdownTrigger";
import DropdownContent from "./DropdownContent";
import Box from "../Box";

export interface DropdownProps {
  /**
   * func, Event --> called on dropdown hide
   **/

  onHide?: () => void;
  /**
   * func, Event --> called on dropdown show
   **/
  onShow?: () => void;
  /**
   * boolean, disables dropdown
   * @default false
   **/
  disabled?: boolean;
  /**
   * boolean, active show dropdown as active (open)
   * @default false
   **/
  active?: boolean;
}

interface DropdownState {
  active: boolean;
}

export class DropdownComponent extends React.Component<
  DropdownProps,
  DropdownState
> {
  static defaultProps = {
    customClass: "dropdown"
  };

  constructor(props: any) {
    super(props);

    this.state = {
      active: false
    };

    this._onToggleClick = this._onToggleClick.bind(this);
  }

  isActive() {
    return typeof this.props.active === "boolean"
      ? this.props.active
      : this.state.active;
  }

  hide() {
    this.setState(
      {
        active: false
      },
      () => {
        if (this.props.onHide) {
          this.props.onHide();
        }
      }
    );
  }

  show() {
    this.setState(
      {
        active: true
      },
      () => {
        if (this.props.onShow) {
          this.props.onShow();
        }
      }
    );
  }

  _onToggleClick(event: any) {
    event.preventDefault();
    if (this.isActive()) {
      this.hide();
    } else {
      this.show();
    }
  }

  handleClickOutside = (evt: any) => {
    this.hide();
  };

  getChildren(active: boolean) {
    const { children, disabled } = this.props;
    return React.Children.map(children, (child: any) => {
      if (child.type === DropdownTrigger) {
        const originalOnClick = child.props.onClick;
        child = React.cloneElement(child, {
          disabled,
          active,
          onClick: event => {
            if (!disabled) {
              this._onToggleClick(event);
              if (originalOnClick) {
                originalOnClick.apply(child, event);
              }
            }
          }
        });
      } else if (child.type === DropdownContent && !active) {
        child = null;
      } else {
        child = React.cloneElement(child);
      }
      return child;
    });
  }

  render() {
    const active = this.isActive();
    const boundChildren = this.getChildren(active);
    return (
      <Box display="inlineBlock" position="relative">
        {boundChildren}
      </Box>
    );
  }
}

export const Dropdown = DropdownComponent;

export default Dropdown;
