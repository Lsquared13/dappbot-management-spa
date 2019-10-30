import React, { KeyboardEvent, FunctionComponent, ReactElement, useState, FocusEvent } from 'react';
import { FieldProps, inputUpdater, inputValidator } from './shared'
import TextField, { TextFieldTypes } from '../ui/TextField';
import HelpIcon from '../ui/HelpIcon';

export interface StringFieldProps extends FieldProps {
    value: string
    onChange: (newVal:string)=>void
    onPressEnter?:()=>void
    input?: ReactElement,
    isValid?: (value:string)=>boolean,
    errorMsg?: string,
    disabled?: boolean,
    help?: string,
    clean?: (value:string)=>string,
    fieldType?: TextFieldTypes
    password?: boolean
}

export const StringField: FunctionComponent<StringFieldProps> = ({
    value, onChange, name, displayName, isValid, 
    errorMsg, clean, ...props
}) => {

    const update = inputUpdater(onChange, { clean : clean ? clean : (val)=>val });
    const [errMsg, setErr] = useState("");

    let validator = (e:FocusEvent<HTMLInputElement>)=>{ };
    if (isValid){
        if (errorMsg){
            validator = inputValidator(isValid, setErr, errorMsg);
        } else {
            validator = inputValidator(isValid, setErr);
        }
    }
    
    let keyDownHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if (props.onPressEnter !== undefined && e.keyCode === 13) {
            props.onPressEnter()
        }
    }

    let fieldType = props.fieldType || 'text';
    return (
        <div className="row form-group">
            <div className="col-sm-12 col-md-12">
                <div className=" input-group-wrapper">
                    <label className=" input-group">
                        <div>
                            <div className="input-group text-left">
                                <div className="input-group-header">
                                    {displayName}
                                    {props.help ? '  ' : ''}
                                    {props.help ? <HelpIcon helpTxt={props.help} /> : null}
                                </div>
                                <TextField type={fieldType}
                                    id={name}
                                    name={name} 
                                    value={value} 
                                    disabled={props.disabled}
                                    onChange={update} 
                                    onKeyDown={keyDownHandler}
                                    showError={errMsg !== ""}
                                    errorMessage={errMsg}
                                    onBlur={validator}
                                    required={props.required}
                                    />
                            </div>
                        </div>
                    </label>
                </div>
            </div>
        </div>
       
    )
}

StringField.defaultProps = { disabled : false }

export default StringField;