import * as React from 'react';
import classnames from 'classnames';
// @ts-ignore Will be present upon component generation
import onClickOutside from "react-onclickoutside";
export function prefix(baseClass: any, style: string) {
  return baseClass + (style ? "-" + style : "");
}
import './Dropdown.css';
import DropdownTrigger from './DropdownTrigger';
import DropdownContent from './DropdownContent';
import DropdownItem from './DropdownItem';

export interface Props {
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
  disabled?: boolean,
  /**
   * boolean, active show dropdown as active (open)
   * @default false
   **/
  active?: boolean,
  /**
    * string, custom class prefix for css
    * @default dropdown
    **/
  customClass?: string;
  /**
   * string, class to apply on component
   **/
  className?: string;
}

interface State {
  active: boolean;
}

export class DropdownComponent extends React.Component<Props, State>  {

  static defaultProps = {
    customClass: 'dropdown'
  }

  constructor(props: any) {
    super(props);

    this.state = {
      active: false
    };

    this._onToggleClick = this._onToggleClick.bind(this);
  }

  isActive() {
    return (typeof this.props.active === 'boolean') ? this.props.active : this.state.active;
  }

  hide() {
    this.setState({
      active: false
    }, () => {
      if (this.props.onHide) {
        this.props.onHide();
      }
    });
  }

  show() {
    this.setState({
      active: true
    }, () => {
      if (this.props.onShow) {
        this.props.onShow();
      }
    });
  }

  _onToggleClick(event: any) {
    event.preventDefault();
    if (this.isActive()) {
      this.hide();
    } else {
      this.show();
    }
  }

  handleClickOutside =(evt:any) => {
    this.hide();
  };

  getChildren(active: boolean) {
    const { children, disabled, customClass } = this.props;
    return React.Children.map(children, (child: any) => {
      if (child.type === DropdownTrigger) {
        const originalOnClick = child.props.onClick;
        child = React.cloneElement(child, {
          customClass: customClass,
          onClick: (event) => {
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
        child = React.cloneElement(child, {
          customClass: customClass
        })
      }
      return child;
    });
  }

  getClasses(active: boolean){
    let {customClass, className, disabled} = this.props;
    let styles = {}
    styles[prefix(customClass, 'disabled')] = disabled;
    styles[prefix(customClass, 'active')] = active;
    return classnames(customClass, styles, className);
  }

  render() {
    const active = this.isActive();
    const boundChildren = this.getChildren(active);
    const className = this.getClasses(active);
    return (
      <div className={className}>{boundChildren}</div>
    )
  }
}

export const Dropdown = onClickOutside(DropdownComponent);

export { DropdownTrigger, DropdownContent, DropdownItem };

export default Dropdown;
