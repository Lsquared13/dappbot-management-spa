import React, { FocusEvent, SyntheticEvent } from 'react';

export type ValidatorFunc = (newVal: string) => boolean;

export interface FieldProps {
    name: string
    displayName?: string
    validate?: ValidatorFunc
    withError?: (errorStr:string)=>void
    disabled?: boolean
    required?: boolean
}

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

export const displayLabel = (name:string, displayName?:string)=>{
    return displayName ? <label style={{
        display:'block',
        paddingTop: '1em',
        paddingBottom: '0.25em',
        fontWeight: 'bold'
    }} htmlFor={name}>{displayName}</label> : null;
}