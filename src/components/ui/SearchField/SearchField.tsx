import * as React from "react";
import Box from "../Box";
import Icon from "../Icon";
import {
  StyledSearchInput,
  StyledSearchClearButton
} from "./StyledSearchField";

type eventData = {
  event: React.SyntheticEvent<HTMLInputElement | HTMLButtonElement>;
  value?: string;
};

export interface SearchFieldProps {
  /**
   * string, String that clients such as VoiceOver will read to describe the element. Always localize the label.
   **/
  accessibilityLabel: string;
  /**
   * string, autoComplete
   * options includes - "on" | "off" | "username" | "name"
   **/
  autoComplete?: "on" | "off" | "username" | "name";
  /**
   * string, id attribute
   **/
  id: string;
  /**
   * function, ({ event: SyntheticInputEvent<HTMLInputElement>}) => void
   * Event is fired on search input blur
   **/
  onBlur?: ({ event }: eventData) => void;
  /**
   * function, ({ event: SyntheticInputEvent<HTMLInputElement>}) => void
   * Event is fired on search input change
   **/
  onChange: ({ value, event }: eventData) => void;
  /**
   * function, ({ event: SyntheticInputEvent<HTMLInputElement>}) => void
   * Event is fired on search input focus
   **/
  onFocus?: ({ value, event }: eventData) => void;
  /**
   * string, placeholder
   **/
  placeholder?: string;
  /**
   * string, value
   **/
  value?: string;
}

export interface SearchFieldState {
  focused: boolean;
  hovered: boolean;
}

export default class SearchField extends React.Component<
  SearchFieldProps,
  SearchFieldState
> {
  state: SearchFieldState = {
    focused: false,
    hovered: false
  };

  handleChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    this.props.onChange({
      value: event.currentTarget.value,
      event: event
    });
  };

  handleClear = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    this.props.onChange({
      value: "",
      event: event
    });
  };

  handleMouseEnter = () => this.setState({ hovered: true });

  handleMouseLeave = () => this.setState({ hovered: false });

  handleFocus = (event: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({ focused: true });

    if (this.props.onFocus) {
      this.props.onFocus({
        value: event.currentTarget.value,
        event: event
      });
    }
  };

  handleBlur = (event: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({ focused: false });

    if (this.props.onBlur) {
      this.props.onBlur({ event });
    }
  };

  render() {
    const {
      accessibilityLabel,
      autoComplete,
      id,
      placeholder,
      value
    } = this.props;

    // This mirrors the built in browser behavior. If there's a value, show the
    // clear button if you're hovering or if you've focused on the field
    // const showClear =
    //   (this.state.focused || this.state.hovered) && value && value.length > 0;

    const showClear = value && value.length > 0;

    return (
      <Box
        display="flex"
        position="relative"
        alignItems="center"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        color="white"
      >
        <Box
          dangerouslySetInlineStyle={{
            __style: {
              pointerEvents: "none",
              top: "50%",
              transform: "translateY(-50%)"
            }
          }}
          left
          position="absolute"
          paddingX={4}
        >
          <Icon icon="search" color="gray" />
        </Box>
        <StyledSearchInput
          aria-label={accessibilityLabel}
          autoComplete={autoComplete}
          className="input"
          id={id}
          onChange={this.handleChange}
          placeholder={placeholder}
          role="searchbox"
          type="search"
          value={value}
        />
        {showClear && (
          <Box position="absolute" right top>
            <StyledSearchClearButton
              className="clear"
              onClick={this.handleClear}
              tabIndex={-1}
              type="button"
            >
              <Icon color="gray" icon="close" />
            </StyledSearchClearButton>
          </Box>
        )}
      </Box>
    );
  }
}
