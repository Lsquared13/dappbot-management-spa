import React, {FunctionComponent, useState, SyntheticEvent, FocusEvent, useEffect} from "react";
import classnames from "classnames";
import StyledInput, { StyledErrorMessage } from "./StyledInput";
import { Box } from "..";

export type ValidatorFunc = (newVal: string) => boolean;



export interface UpdaterOptions {
  withError?: Function
  clean?: (newVal:string)=>string
}

export function inputUpdater (onChange:Function, options:UpdaterOptions={}) {
  const { withError, clean } = options;
  return function(e:SyntheticEvent<HTMLInputElement>){
      let val = e.currentTarget.value;
      if (withError) withError('');
      if (clean) val = clean(val);
      onChange(val);
  };
}

export function inputValidator (validator:ValidatorFunc, withError:Function, errorMsg:string="Invalid value.") {
  return function(e:FocusEvent<HTMLInputElement>){ 
      if (!validator(e.target.value)){ 
          withError(errorMsg) 
      } else {
          withError('')
      }
  }
}
export type InputTypeOptions =
  | "text"
  | "password"
  | "number"
  | "email"
  | "select"
  | "textarea";
  
  export type InputEventData = {
    event: React.SyntheticEvent<HTMLInputElement>;
    value?: string;
  };
  
  export enum InputTypeEnum {
    date = "date", 
    email = "email",
    number = "number",
    password = "password",
    text = "text",
    url ="url"
  }

  export type InputTypes = keyof typeof InputTypeEnum;

  export interface Props {
    /**
     * string, autoComplete
     **/
    autoComplete?: "current-password" | "on" | "off" | "username";
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
    showError?: boolean;
    /**
     * string, id
     **/
    id: string;
    /**
     * string, Preferred direction for the error Flyout to open
     * options includes - "up" | "right" | "down" | "left"
     * @default "up"
     **/
    idealErrorDirection?: "up" | "right" | "down" | "left";
    /**
     * string, name
     **/
    name?: string;

    isValid?: (value:string)=>boolean,

    clean?: (value:string)=>string,

    stateHook: (newVal:string)=>void

    onFocus?: (event:React.SyntheticEvent<HTMLInputElement>)=>void
    /**
     * function, ({ event: React.SyntheticEvent<HTMLInputElement>, value: boolean }) => void
     * Event is fired on key down
     **/
    onKeyDown?: (event:React.SyntheticEvent<HTMLInputElement>)=>void
    /**
     * string, placeholder
     **/
    placeholder?: string;
    /**
     * number, rows
     * @default 3
     **/
    rows?: number;
    /**
     * string, value
     **/
    value?: string;
    /**
     * string, "date" | "email" | "number" | "password" | "text" | "url"
     * @default "text"
     **/
    type?: InputTypes;
    /**
     * string, custom class prefix for css
     * @default form-control
     **/
    customClass?: string;
  }

export const Input: FunctionComponent<Props> = (
  {id, value, placeholder,type, stateHook, name, isValid, errorMessage,clean,disabled,autoComplete, ...props}
  ) =>{
    let textfield:HTMLInputElement; 
    const textfieldRef = React.createRef<HTMLInputElement>();
    const [focused, setFocused] = useState(false)
    const [errMsg, setErr] = useState("");
    const update = inputUpdater(stateHook, { clean : clean ? clean : (val)=>val });
    
    useEffect(()=>{
      textfield = textfieldRef.current!;
    },[])
    

    let validator = (e:FocusEvent<HTMLInputElement>)=>{ };
    if (isValid){
        if (errorMessage){
            validator = inputValidator(isValid, setErr, errorMessage);
        } else {
            validator = inputValidator(isValid, setErr);
        }
    }

    const classes = classnames("form-control", 
      "textField",
      disabled ? "disabled" : "enabled",
      (errMsg !== "")  || errorMessage ? "errored" : "normal"
    );

    // type='number' doesn't work on ios safari without a pattern
    // https://stackoverflow.com/questions/14447668/input-type-number-is-not-showing-a-number-keypad-on-ios
    const pattern = type === "number" ? "\\d*" : undefined;

    const handleChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
      update(event);
    };
    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      if (validator) {
        validator(event);
      }
    };
    const handleFocus = (event: React.SyntheticEvent<HTMLInputElement>) => {

      if (props.onFocus) {
        props.onFocus(event);
      }
    };
    const handleKeyDown = (event: React.SyntheticEvent<HTMLInputElement>) => {
      if (props.onKeyDown) {
        props.onKeyDown(event);
      }
    };

  
  return (
    <Box display="flex" wrap={true} marginTop={2} marginBottom={3}>
    
      <StyledInput
          aria-describedby={
            errorMessage && focused
              ? `${id}-gestalt-error`
              : undefined
          }
          aria-invalid={errorMessage || (errMsg !== "")  ? "true" : "false"}
          autoComplete={autoComplete}
          className={classes}
          disabled={disabled}
          id={id}
          name={name}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          pattern={pattern}
          placeholder={placeholder}
          innerRef={textfieldRef}
          type={type}
          value={value}
        /> 
      <StyledErrorMessage className={classnames('textField','errorMsg', (errMsg !== "")  ? '' : 'hide')}>
        { (errMsg !== "") && errorMessage ? errorMessage : ''}
      </StyledErrorMessage>
  </Box>

    
    
  )
}
export default Input;

// }
// export class Input extends React.Component<Props> {
//   static defaultProps = {
//     disabled: false,
//     showError: false,
//     idealErrorDirection: "right",
//     type: "text"
//   };

//   state = {
//     focused: false
//   };

//   const update = inputUpdater(onChange, { clean : clean ? clean : (val)=>val });
//   const [errMsg, setErr] = useState("");

//   let validator = (e:FocusEvent<HTMLInputElement>)=>{ };
//   if (isValid){
//       if (errorMsg){
//           validator = inputValidator(isValid, setErr, errorMsg);
//       } else {
//           validator = inputValidator(isValid, setErr);
//       }
//   }
  

//   handleChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
//     this.props.onChange(event);
//   };

//   handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
//     if (this.props. props.errorMessage) {
//       this.setState({ errorIsOpen: false });
//     }
//     if (validator) {
//       validator(event);
//     }
//   };

//   handleFocus = (event: React.SyntheticEvent<HTMLInputElement>) => {
//     if (this.props.errorMessage) {
//       this.setState({ errorIsOpen: true });
//     }
//     if (this.props.onFocus) {
//       this.props.onFocus(event);
//     }
//   };

//   handleKeyDown = (event: React.SyntheticEvent<HTMLInputElement>) => {
//     if (this.props.onKeyDown) {
//       this.props.onKeyDown(event);
//     }
//   };

//   textfieldRef = React.createRef<HTMLInputElement>();

//   // @ts-ignore
//   textfield: HTMLInputElement;

//   componentDidMount() {
//     this.textfield = this.textfieldRef.current!;
//   }



//   render() {
//     const {
//       autoComplete,
//       disabled,
//       errorMessage,
//       showError,
//       id,
//       name,
//       placeholder,
//       type,
//       value
//     } = this.props;

//     const classes = classnames(
//       "textField",
//       disabled ? "disabled" : "enabled",
//       showError || errorMessage ? "errored" : "normal"
//     );

//     // type='number' doesn't work on ios safari without a pattern
//     // https://stackoverflow.com/questions/14447668/input-type-number-is-not-showing-a-number-keypad-on-ios
//     const pattern = type === "number" ? "\\d*" : undefined;



//     if (type == "select") {
//       return (
//         <div className="select_wrap">
//           <select
//             className={classes}
//             ref={inputRef}
//             placeholder={placeholder}
//             disabled={disabled}
//           >
//             {children ? children : null}
//           </select>
//         </div>
//       );
//     } else if ((type == "textarea")) {
//       return (
//         <textarea
//           name={name}
//           value={value}
//           className={classes}
//           disabled={disabled}
//           placeholder={placeholder}
//           ref={inputRef}
//           onChange={onChange}
//         />
//       );
//     } else {
//       return (
//         <input
//           type={type}
//           name={name}
//           value={value}
//           className={classes}
//           disabled={disabled}
//           placeholder={placeholder}
//           ref={inputRef}
//           onChange={onChange}
//         />
//       );
//     }
//   }
// }

// export default Input;
