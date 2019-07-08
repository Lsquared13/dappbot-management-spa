import * as React from "react";
import classnames from "classnames";
import Box from "../Box";
import Flyout from "../Flyout";
import Text from "../Text";
import Icon from "../Icon";
import StyledSelectList from "./StyledSelectList";
import Caret from "../Caret";

type eventData = {
  event: React.SyntheticEvent<HTMLSelectElement>;
  value: string;
};

export interface SelectListStates {
  focused: boolean;
  errorIsOpen: boolean;
  errorMessage?: string;
}

export interface SelectListProps {
  /**
   * string, error message
   **/
  errorMessage?: string;
  /**
   * boolean, disabled
   * @default false
   **/
  disabled?: boolean;
  /**
   * string, id attribute
   **/
  id: string;
  /**
   * string, Preferred direction for the error Flyout to open
   * @default "right"
   * options includes - "up" | "right" | "down" | "left"
   **/
  idealErrorDirection?: "up" | "right" | "down" | "left";
  /**
   * string, name
   **/
  name?: string;
  /**
   * function, ({ event: React.SyntheticEvent<HTMLSelectElement>, value: string }) => void
   * Event is fired when selection is changed
   **/
  onChange: ({ event, value }: eventData) => void;
  /**
   * Array, array of objects for label and value
   **/
  options: Array<{
    label: string;
    value: string;
  }>;
  /**
   * string, placeholder
   **/
  placeholder?: string;
  /**
   * string, value
   **/
  value?: string;
  className?: string;
  style?: any;
}

export default class SelectList extends React.Component<
  SelectListProps,
  SelectListStates
> {
  static defaultProps = {
    disabled: false,
    idealErrorDirection: "right",
    options: []
  };

  state = {
    focused: false,
    errorIsOpen: false
  };

  static getDerivedStateFromProps(
    props: SelectListProps,
    state: SelectListProps
  ) {
    if (props.errorMessage !== state.errorMessage) {
      return {
        errorIsOpen: !!props.errorMessage,
        errorMessage: props.errorMessage
      };
    }

    return null;
  }

  handleOnChange = (event: React.SyntheticEvent<HTMLSelectElement>) => {
    if (
      event.target instanceof HTMLSelectElement &&
      this.props.value !== event.target.value
    ) {
      this.props.onChange({ event, value: event.target.value });
      if (this.props.errorMessage) {
        this.setState({ errorIsOpen: false });
      }
    }
  };

  handleBlur = () => {
    if (this.props.errorMessage) {
      this.setState({ errorIsOpen: false });
    }
  };

  handleFocus = () => {
    if (this.props.errorMessage) {
      this.setState({ errorIsOpen: true });
    }
  };

  selectRef = React.createRef<HTMLSelectElement>();

  select!: HTMLSelectElement;

  componentDidMount() {
    this.select = this.selectRef.current!;
  }

  render() {
    const {
      disabled,
      errorMessage,
      id,
      idealErrorDirection,
      name,
      options,
      placeholder,
      value = "",
      className,
      style
    } = this.props;

    const classes = classnames(
      "select",
      disabled ? "disabled" : "enabled",
      errorMessage ? "errored" : "normal"
    );
    //     margin-top: 10px;
    // width: 255px;
    return (
      <Box
        color={disabled ? "lightGray" : "white"}
        dangerouslySetInlineStyle={{ __style: { borderRadius: 4 } }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            position: "relative",
            marginTop: 7
          }}
        >
        {/* <Box
          alignItems="center"
          bottom
          dangerouslySetInlineStyle={{
            __style: { paddingRight: 14, paddingTop: 2 }
          }}
          display="flex"
          position="absolute"
          right
          top
          className="drp"
        > */}
        <Icon
          className="drp"
          icon="drop-down"
          color={disabled ? "gray" : "darkGray"}
        />
        {/* </Box> */}
        <StyledSelectList
          aria-describedby={
            errorMessage && this.state.focused
              ? `${id}-gestalt-error`
              : undefined
          }
          aria-invalid={errorMessage ? "true" : "false"}
          className={classes}
          disabled={disabled}
          style={style}
          id={id}
          name={name}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onChange={this.handleOnChange}
          innerRef={this.selectRef}
          value={value}
        >
          {placeholder && !value && (
            <option defaultValue={placeholder} disabled hidden/>
              
          )}
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </StyledSelectList>
        {errorMessage && this.state.errorIsOpen && (
          <Flyout
            anchor={this.select}
            color="orange"
            idealDirection={idealErrorDirection}
            onDismiss={() => this.setState({ errorIsOpen: false })}
            shouldFocus={false}
            size="sm"
          >
            <Box padding={3}>
              <Text bold color="white">
                <span id={`${id}-gestalt-error`}>{errorMessage}</span>
              </Text>
            </Box>
          </Flyout>
        )}
        </div>
      </Box>
    );
  }
}