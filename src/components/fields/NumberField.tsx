import React, { FunctionComponent, Fragment, ReactElement, useState } from 'react';
import { FieldProps, inputUpdater, ValidatorFunc, UpdaterOptions, displayLabel, inputValidator } from './shared'
import TextField from '../ui/TextField';
import HelpIcon from '../ui/HelpIcon';
const BigNum = require('bignumber.js');

interface Props extends FieldProps {
    value: string
    onChange: (newVal:string)=>void
    input?: ReactElement
    size: NumberTypes
    disabled?:boolean
    help?: string
}

const isValidFactory: (size:NumberTypes)=>[(val:string)=>boolean, string] = (size:NumberTypes) => {
    let validator, errMsg;

    // If the size has a number in it, parse that.  If not, (u)int aliases to (u)int256 
    const isSigned = size.charAt(0) === 'i';
    const numBits = /[0-9]/.test(size) ? parseInt(isSigned ? size.slice(3) : size.slice(4)) : 256;

    if (size.charAt(0) === 'u') {
        const maxVal = new BigNum(2).exponentiatedBy(numBits);
        validator = (newVal:string) => {
            const val = new BigNum(newVal);
            return val.lte(maxVal) && val.gte(0);
        }
        errMsg = `Please enter a number between 0 and 2^${numBits}.`;
    } else {
        const maxMagnitude = new BigNum(2).exponentiatedBy(numBits - 1);
        validator = (newVal:string) => {
            const val = new BigNum(newVal);
            return val.gte(maxMagnitude.negated()) && val.lte(maxMagnitude);
        };
        errMsg = `Please enter a number between -2^${numBits} and 2^${numBits}.`;
    }
    
    return [validator, errMsg];
}

export const NumberField: FunctionComponent<Props> = ({value, onChange, name, displayName, size, ...props }) => {

    const [errMsg, setErrMsg] = useState("");
    const [isValid, wrongSizeErr] = isValidFactory(size);

    const updater = inputUpdater(onChange, {
        withError : setErrMsg,
        clean : (newVal:string) => newVal.replace(/[^0-9.]/g, "")
    });

    const validator = inputValidator(isValid, setErrMsg, wrongSizeErr);

    return (
        <div className="row form-group">
            <div className="col-sm-12 col-md-12">
                <div className=" input-group-wrapper">
                    <label className=" input-group">
                        <div>
                            <div className="input-group">
                                <div className="input-group-header">
                                    {displayName}
                                    {props.help ? '  ' : ''}
                                    {props.help ? <HelpIcon helpTxt={props.help} /> : null}
                                </div>
                                <TextField type='number' 
                                    id={name}
                                    name={name} 
                                    value={value} 
                                    disabled={props.disabled}
                                    onChange={updater} 
                                    hasError={errMsg != ""}
                                    errorMessage={errMsg}
                                    onBlur={validator} />
                            </div>
                        </div>
                    </label>
                </div>
            </div>
        </div>
       
    )
}

NumberField.defaultProps = { disabled : false }

export default NumberField;

export type NumberTypes = Uints | Ints;

export enum Uints {
    base = "uint",
    size8 = "uint8",
    size16 = "uint16",
    size24 = "uint24",
    size32 = "uint32",
    size40 = "uint40",
    size48 = "uint48",
    size56 = "uint56",
    size64 = "uint64",
    size72 = "uint72",
    size80 = "uint80",
    size88 = "uint88",
    size96 = "uint96",
    size104 = "uint104",
    size112 = "uint112",
    size120 = "uint120",
    size128 = "uint128",
    size136 = "uint136",
    size144 = "uint144",
    size152 = "uint152",
    size160 = "uint160",
    size168 = "uint168",
    size176 = "uint176",
    size184 = "uint184",
    size192 = "uint192",
    size200 = "uint200",
    size208 = "uint208",
    size216 = "uint216",
    size224 = "uint224",
    size232 = "uint232",
    size240 = "uint240",
    size248 = "uint248",
    size256 = "uint256"
}

export enum Ints {
    base = "int",
    size8 = "int8",
    size16 = "int16",
    size24 = "int24",
    size32 = "int32",
    size40 = "int40",
    size48 = "int48",
    size56 = "int56",
    size64 = "int64",
    size72 = "int72",
    size80 = "int80",
    size88 = "int88",
    size96 = "int96",
    size104 = "int104",
    size112 = "int112",
    size120 = "int120",
    size128 = "int128",
    size136 = "int136",
    size144 = "int144",
    size152 = "int152",
    size160 = "int160",
    size168 = "int168",
    size176 = "int176",
    size184 = "int184",
    size192 = "int192",
    size200 = "int200",
    size208 = "int208",
    size216 = "int216",
    size224 = "int224",
    size232 = "int232",
    size240 = "int240",
    size248 = "int248",
    size256 = "int256"
}

export const NumberTypeStrings = Object.values(Uints).concat(Object.values(Ints));

export const selectNumberType:(type:string)=>NumberTypes = (type:string) => {
    if (type.charAt(0) === 'u'){
        // @ts-ignore
        return Uints[type];
    } else if (type.charAt(0) === 'i'){
        // @ts-ignore
        return Ints[type];
    } else {
        throw new Error(`selectNumberType got a value it wasn't prepared for: ${type}`);
    }
}