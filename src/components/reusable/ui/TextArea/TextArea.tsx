import * as React from "react";
import classnames from "classnames";
import Flyout from "../Flyout";
import Box from "../Box";
import Text from "../Text";
import StyledTextArea from "./StyledTextArea";

type eventData = {
  event: React.SyntheticEvent<HTMLTextAreaElement>;
  value?: string;
};

export interface TextAreaState {
  focused: boolean;
  errorIsOpen: boolean;
  errorMessage?: string;
}

export interface TextAreaProps {
  className?:string
  /**
   * string, error message
   **/
  errorMessage?: string;
  /**
   * boolean, disabled
   **/
  disabled?: boolean;
  /**
   * boolean, disabled
   **/
  hasError?: boolean;
  /**
   * string, id
   **/
  id: string;
  /**
   * string, Preferred direction for the error Flyout to open
   * options includes - "up" | "right" | "down" | "left"
   * @default "right"
   **/
  idealErrorDirection?: "up" | "right" | "down" | "left";
  /**
   * string, name
   **/
  name?: string;
  /**
   * function, ({ event: React.SyntheticEvent<HTMLTextAreaElement>, value: boolean }) => void
   * Event is fired on blur
   **/
  onBlur?: ({ event, value }: eventData) => void;
  /**
   * function, ({ event: React.SyntheticEvent<HTMLTextAreaElement>, value: boolean }) => void
   * Event is fired on changed
   **/
  onChange: ({ event, value }: eventData) => void;
  /**
   * function, ({ event: React.SyntheticEvent<HTMLTextAreaElement>, value: boolean }) => void
   * Event is fired on focus
   **/
  onFocus?: ({ event, value }: eventData) => void;
  /**
   * function, ({ event: React.SyntheticEvent<HTMLTextAreaElement>, value: boolean }) => void
   * Event is fired on key down
   **/
  onKeyDown?: ({ event, value }: eventData) => void;
  /**
   * string, placeholder
   **/
  placeholder?: string;
  /**
   * number, rows
   * @default 3
   **/
  rows?: number /* default: 3 */;
  /**
   * number, rows
   * @default 3
   **/
  value?: string;
}

export default class TextArea extends React.Component<
  TextAreaProps,
  TextAreaState
> {
  static defaultProps = {
    disabled: false,
    hasError: false,
    idealErrorDirection: "right",
    rows: 3
  };

  state = {
    focused: false,
    errorIsOpen: false
  };

  static getDerivedStateFromProps(props: TextAreaProps, state: TextAreaState) {
    if (props.errorMessage !== state.errorMessage) {
      return {
        errorIsOpen: !!props.errorMessage,
        errorMessage: props.errorMessage
      };
    }

    return null;
  }

  handleChange = (event: React.SyntheticEvent<HTMLTextAreaElement>) => {
    this.props.onChange({
      event,
      value: event.currentTarget.value
    });

    if (this.props.errorMessage) {
      this.setState({ errorIsOpen: true });
    }
  };

  handleBlur = (event: React.SyntheticEvent<HTMLTextAreaElement>) => {
    if (this.props.errorMessage) {
      this.setState({ errorIsOpen: false });
    }
    if (this.props.onBlur) {
      this.props.onBlur({
        event,
        value: event.currentTarget.value
      });
    }
  };

  handleFocus = (event: React.SyntheticEvent<HTMLTextAreaElement>) => {
    if (this.props.errorMessage) {
      this.setState({ errorIsOpen: true });
    }
    if (this.props.onFocus) {
      this.props.onFocus({
        event,
        value: event.currentTarget.value
      });
    }
  };

  handleKeyDown = (event: React.SyntheticEvent<HTMLTextAreaElement>) => {
    if (this.props.onKeyDown) {
      this.props.onKeyDown({
        event,
        value: event.currentTarget.value
      });
    }
  };

  textareaRef = React.createRef<HTMLTextAreaElement>();

  textarea!: HTMLTextAreaElement;

  componentDidMount() {
    this.textarea = this.textareaRef.current!;
  }

  render() {
    const {
      disabled,
      errorMessage,
      hasError,
      id,
      idealErrorDirection,
      name,
      placeholder,
      rows,
      value,
      className
    } = this.props;

    const classes = classnames(
      className,
      "textArea",
      disabled ? "disabled" : "enabled",
      hasError || errorMessage ? "errored" : "normal"
    );

    return (
      <span>
        <StyledTextArea
          aria-describedby={
            errorMessage && this.state.focused ? `${id}-exim-error` : undefined
          }
          aria-invalid={errorMessage || hasError ? "true" : "false"}
          className={classes}
          disabled={disabled}
          id={id}
          name={name}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeyDown}
          placeholder={placeholder}
          innerRef={this.textareaRef}
          rows={rows}
          value={value}
        />
        {errorMessage && this.state.errorIsOpen ? (
          <Flyout
            anchor={this.textarea}
            color="orange"
            idealDirection={idealErrorDirection}
            onDismiss={() => this.setState({ errorIsOpen: false })}
            shouldFocus={false}
            size="sm"
          >
            <Box padding={3}>
              <Text bold color="white">
                <span id={`${id}-exim-error`}>{errorMessage}</span>
              </Text>
            </Box>
          </Flyout>
        ) : null}
      </span>
    );
  }
}
