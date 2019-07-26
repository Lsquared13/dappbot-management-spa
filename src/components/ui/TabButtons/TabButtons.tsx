import * as React from "react";
import classnames from "classnames";
import TabButton, { TabButtonProps } from "./TabButton";
import StyledTabButtons from "./StyledTabButtons";

type selectedIndex = number | string;

export interface TabButtonsProps {
  /**
   * func, Event --> called on tab button select
   **/
  onChange?: (
    event?: React.MouseEvent<HTMLElement>,
    index?: selectedIndex
  ) => void;
  /**
   * Element, Type of TabButton
   **/
  children?: React.ReactNode;
  /**
   * string, class to apply on component
   **/
  className?: string;
  /**
   * boolean, disable the tab buttons
   * @default false
   **/
  disabled?: boolean;
  /**
   * number | string, index/key of button to show as selected
   * @default null
   **/
  selectedIndex?: selectedIndex;
  /**
   * String, button size options
   * options include: "large" | "small"
   * @default "large"
   **/
  size?: "large" | "small";
}

//State to manage selected tab button index
export interface State {
  selectedIndex: selectedIndex;
}

//TabButtons will be statefull component as we require to manage selected state.
export class TabButtons extends React.Component<TabButtonsProps, State> {
  static defaultProps = {
    disabled: false,
    size: "large"
  };

  state = {
    selectedIndex: this.props.selectedIndex ? this.props.selectedIndex : -1
  };

  //on TabButton click fire change event
  onButtonSelect = (
    e: React.MouseEvent<HTMLElement>,
    selectedIndex: selectedIndex
  ) => {
    let { onChange } = this.props;
    this.setState({ selectedIndex }, () => {
      onChange && onChange(e, selectedIndex);
    });
  };

  attachEventListner = (children: any) => {
    return React.Children.map(
      children,
      (child: React.ReactElement<TabButtonProps>, index: number) => {
        let { disabled } = this.props;
        //If child is not a TabButton remove it
        if (child.type !== TabButton) return null;
        let key = child.key ? child.key : index + 1;
        const originalOnClick = child.props.onClick;
        //Clone the child
        child = React.cloneElement(child, {
          key: key,
          disabled: disabled ? true : child.props.disabled,
          selected: this.state.selectedIndex == key ? true : false,
          onClick: (e: any) => {
            //if TabButtons or TabButton is not disabled fire click and onChange event
            if (!child.props.disabled) {
              e.persist();
              this.onButtonSelect(e, key);
              originalOnClick && originalOnClick(e);
            }
          }
        });
        return child;
      }
    );
  };

  render() {
    let { children, className, size } = this.props;
    let classes = classnames("tab-buttons", size, className);
    //If children provided return only TabButton with onChange event attached to them
    children && (children = this.attachEventListner(children));
    return <StyledTabButtons className={classes}>{children}</StyledTabButtons>;
  }
}

export { TabButton };
export default TabButtons;
