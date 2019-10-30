import React, { useState, FunctionComponent } from 'react';
import { FieldProps, inputUpdater, inputValidator } from './shared';
import TextField from '../ui/TextField';
import HelpIcon from '../ui/HelpIcon';

interface Props extends FieldProps {
    value: string
    onChange: (newVal:string)=>void
    help?: string
}

const invalidAddrErr = "Please enter a valid hexademical address.  It should begin with 0x and be 42 characters long."

const isValid = (newVal:string) => {
    return /^0x[a-fA-F0-9]+$/.test(newVal) && newVal.length === 42;
}

const clean = (newVal:string) => {
    let prefix = newVal.slice(0,2);
    let hasPrefix = ['0x','0X'].includes(prefix);
    let val = hasPrefix ? newVal.slice(2) : newVal;
    let cleaned =  val.replace(/[^a-fA-f0-9]/g, '');
    return hasPrefix ? prefix + cleaned : cleaned;
}

const AddressField: FunctionComponent<Props> = ({value, onChange, name, displayName, ...props}) => {

    const [errorMsg, setError] = useState("");

    const update = inputUpdater(onChange, { clean, withError : setError })

    const validator = inputValidator(isValid, setError, invalidAddrErr);

    return (
        <div className="row form-group">
            <div className="col-sm-12 col-md-12">
                <div className=" input-group-wrapper">
                    <label className=" input-group">
                        <div>
                            <div className="input-group">
                                <div className="input-group-header">
                                    {displayName}
                                    {props.required ? ' (*)' : ''}
                                    {props.help ? '  ' : ''}
                                    {props.help ? <HelpIcon helpTxt={props.help} /> : null}
                                </div>
                                <TextField type='text' 
                                    id={name}
                                    name={name} 
                                    value={value} 
                                    disabled={props.disabled}
                                    onChange={update} 
                                    showError={errorMsg !== ""}
                                    errorMessage={errorMsg}
                                    required={props.required}
                                    onBlur={validator} />
                            </div>
                        </div>
                    </label>
                </div>
            </div>
        </div>
       
    )
}

AddressField.defaultProps = { disabled : false };

export default AddressField;