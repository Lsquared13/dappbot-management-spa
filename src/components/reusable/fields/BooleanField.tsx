import React, { FunctionComponent, Fragment } from 'react';
import { inputUpdater, FieldProps, displayLabel } from './shared'

interface Props extends FieldProps {
    value: boolean
    onChange: (newVal:boolean)=>void
    labels?: BoolLabel
}

interface BoolLabel {
    true: string
    false: string
}

const BooleanField: FunctionComponent<Props> = ({name,onChange, displayName, value, labels, ...props}) => {
    const clickTrue = ()=>{if (!props.disabled) onChange(true)}
    const clickFalse = ()=>{if (!props.disabled) onChange(false)}
    const dummyOnChange=(arg:any)=>{}
    return (
        <div className='input-group'>
        <p className="caption">{displayName}</p>
           
            <label onClick={clickTrue}>
                <input type='radio' disabled={props.disabled} onChange={dummyOnChange} name={name} checked={value === true} />
                { labels ? labels.true : 'True'}
            </label>
            <label onClick={clickFalse}>
                <input type='radio' disabled={props.disabled} onChange={dummyOnChange} name={name} checked={value === false} />
                { labels ? labels.false : 'False'}
            </label>
        </div>
    )
}

BooleanField.defaultProps = { disabled : false }

export default BooleanField;