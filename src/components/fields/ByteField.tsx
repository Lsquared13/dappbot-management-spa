import React, { FunctionComponent, ReactElement } from 'react';
import { FieldProps, inputUpdater } from './shared'
import TextField from '../ui/TextField';
import HelpIcon from '../ui/HelpIcon';

interface Props extends FieldProps {
    value: string
    onChange: (newVal:string)=>void
    input?: ReactElement
    help?: string
}

const ByteField: FunctionComponent<Props> = ({value, onChange, name, ...props}) => {

    const update = inputUpdater(onChange);

    // TODO: Explore how users would enter bytes and whether
    // I can validate the final size.
    return (
        <div className="row form-group">
            <div className="col-sm-12 col-md-12">
                <div className=" input-group-wrapper">
                    <label className=" input-group">
                        <div>
                            <div className="input-group">
                                <div className="input-group-header">
                                    {props.displayName}
                                    {props.help ? '  ' : ''}
                                    {props.help ? <HelpIcon helpTxt={props.help} /> : null}
                                </div>
                                <TextField type='text' 
                                    id={name}
                                    name={name} 
                                    value={value} 
                                    disabled={props.disabled}
                                    required={props.required}
                                    onChange={update} 
                                    />
                            </div>
                        </div>
                    </label>
                </div>
            </div>
        </div>

    )
}

ByteField.defaultProps = { disabled : false }

export default ByteField;

export enum Bytes {
    dynamic = "bytes",
    size1 = "bytes1",
    size2 = "bytes2",
    size3 = "bytes3",
    size4 = "bytes4",
    size5 = "bytes5",
    size6 = "bytes6",
    size7 = "bytes7",
    size8 = "bytes8",
    size9 = "bytes9",
    size10 = "bytes10",
    size11 = "bytes11",
    size12 = "bytes12",
    size13 = "bytes13",
    size14 = "bytes14",
    size15 = "bytes15",
    size16 = "bytes16",
    size17 = "bytes17",
    size18 = "bytes18",
    size19 = "bytes19",
    size20 = "bytes20",
    size21 = "bytes21",
    size22 = "bytes22",
    size23 = "bytes23",
    size24 = "bytes24",
    size25 = "bytes25",
    size26 = "bytes26",
    size27 = "bytes27",
    size28 = "bytes28",
    size29 = "bytes29",
    size30 = "bytes30",
    size31 = "bytes31",
    size32 = "bytes32"
}

export const ByteTypeStrings = Object.assign({}, Bytes);