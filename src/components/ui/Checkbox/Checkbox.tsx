import * as React from "react";
import classnames from "classnames";
import Box from "../Box";
import { StyledCheckboxCheck, StyledCheckboxInput } from "./StyledCheckbox";
import Icon from "../Icon/IconSVG";

type eventData = {
  event: React.SyntheticEvent<HTMLInputElement>;
  checked: boolean;
};

export interface CheckboxProps {
  /**
   * boolean, checked
   * @default false
   **/
  checked?: boolean;
  /**
   * boolean, disabled
   * @default false
   **/
  disabled?: boolean;
  /**
   * boolean, hasError
   * @default false
   **/
  hasError?: boolean;
  /**
   * string, id attribute
   **/
  id: string;
  /**
   * boolean, Indeterminism is purely presentational - the value of a checkbox and it's indeterminism are independent
   **/
  indeterminate?: boolean;
  /**
   * string, name attribute
   **/
  name?: string;
  /**
   * function, ({ event: SyntheticInputEvent<HTMLInputElement>, checked: boolean }) => void
   * Event is fired checkbox checked/unchecked
   **/
  onChange: ({ event, checked }: eventData) => void;
  /**
   * function, ({ event: SyntheticInputEvent<HTMLInputElement>, checked: boolean }) => void
   * Event is fired checkbox is clicked
   **/
  onClick?: ({ event, checked }: eventData) => void;
  /**
   * string, size of checkbox
   * options includes : "sm" | "md"
   * @default "md"
   **/
  size?: "sm" | "md";
}

export interface CheckboxStates {
  focused: boolean;
}

export class Checkbox extends React.Component<CheckboxProps, CheckboxStates> {
  static defaultProps = {
    checked: false,
    disabled: false,
    hasError: false,
    indeterminate: false,
    size: "md"
  };

  state = {
    focused: false
  };

  componentDidMount() {
    if (this.props.indeterminate) {
      this.setIndeterminate(!!this.props.indeterminate);
    }
  }

  componentDidUpdate(previousProps: CheckboxProps) {
    if (previousProps.indeterminate !== this.props.indeterminate) {
      this.setIndeterminate(!!this.props.indeterminate);
    }
  }

  setIndeterminate(indeterminate: boolean) {
    if (this.input.current) {
      this.input.current.indeterminate = indeterminate;
    }
  }

  handleChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    const { checked } = event.currentTarget;
    onChange && onChange({ event, checked });
  };

  handleClick = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const { onClick } = this.props;
    const { checked } = event.currentTarget;
    onClick && onClick({ event, checked });
  };

  handleBlur = () => this.setState({ focused: false });

  handleFocus = () => this.setState({ focused: true });

  input = React.createRef<HTMLInputElement>();

  render() {
    const {
      checked,
      disabled,
      hasError,
      id,
      indeterminate,
      name,
      size = "md"
    } = this.props;

    let borderStyle = "border";
    if (!disabled && (checked || indeterminate)) {
      borderStyle = "borderDark";
    } else if (hasError) {
      borderStyle = "borderError";
    }

    return (
      <Box position="relative">
        <StyledCheckboxInput
          checked={checked}
          className={classnames("input", {
            disabled: !disabled,
            indeterminate: indeterminate,
            inputSm: size === "sm",
            inputMd: size === "md"
          })}
          disabled={disabled}
          id={id}
          name={name}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onClick={this.handleClick}
          onFocus={this.handleFocus}
          innerRef={this.input}
          type="checkbox"
        />
        <StyledCheckboxCheck
          className={classnames(
            borderStyle,
            "check",
            disabled
              ? checked || indeterminate
                ? "grayBg"
                : "lightGrayBg"
              : checked || indeterminate
              ? "darkGrayBg"
              : "whiteBg",
            {
              enabled: !disabled,
              focused: this.state.focused,
              checkSm: size === "sm",
              checkMd: size === "md"
            }
          )}
        >
          {(checked || indeterminate) && (
            <Icon
              accessibilityLabel=""
              color="white"
              icon={indeterminate ? "check" : "check"}
              size={size === "sm" ? 8 : 12}
            />
          )}
        </StyledCheckboxCheck>
      </Box>
    );
  }
}

export default Checkbox;
