import AddressField from './AddressField';
import BooleanField from './BooleanField';
import ByteField, { ByteTypeStrings } from './ByteField';
import StringField from './StringField';

export enum Fields {
    Address,
    Boolean,
    Bytes,
    Number,
    String
}

export * from './NumberField';


export {
    AddressField,
    BooleanField,
    ByteField,
    ByteTypeStrings,
    StringField
}