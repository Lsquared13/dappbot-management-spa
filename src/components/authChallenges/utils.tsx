import { ErrorBox } from '..';
import { StringField } from '../fields';
import { Button, TextFieldTypes } from '../ui';

import React, { FC, ReactElement } from 'react';

export interface ChallengeBoxOuterProps {
  children: ReactElement
}

export const ChallengeBoxOuter: FC<ChallengeBoxOuterProps> = ({ children }) => (
  <>
      <section className="fdb-block fp-active pt-0" data-block-type="forms" >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8 text-center">
              <div className="fdb-box fdb-touch">
                {children}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
)

export interface ChallengeBoxTitleProps {
  title: string
}

export const ChallengeBoxTitle: FC<ChallengeBoxTitleProps> = ({ title }) => (
  <div className="row">
    <div className="col">
      <h2>{title}</h2>
    </div>
  </div>
)

export interface ChallengeBoxInputProps {
  name: string
  value: string
  onChange: (newVal:string)=>void
  displayName?: string
  fieldType?: TextFieldTypes
  disabled?: boolean
  isValid?: (value:string)=>boolean
  onPressEnter?: ()=>void
  help?: string
  errorMsg?: string
}

export const ChallengeBoxInput: FC<ChallengeBoxInputProps> = ({ name, value, onChange, displayName, fieldType,
                                                         disabled, isValid, help, errorMsg }) => (
  <div className="row mt-4">
    <div className="col">
      <StringField 
        value={value}
        displayName={displayName}
        fieldType={fieldType}
        disabled={disabled}
        isValid={isValid}
        help={help}
        errorMsg={errorMsg}
        onChange={onChange}
        name={name} /> 
    </div>
  </div>
)

export interface ChallengeBoxSubmitButtonProps {
  errorMsg: string
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>)=>void
  disabled?: boolean
}

export const ChallengeBoxSubmitButton: FC<ChallengeBoxSubmitButtonProps> = ({ onClick, disabled, errorMsg }) => (
  <div className="row mt-4">
    <div className="col">
      <div style={{textAlign: "left"}}>
        <Button onClick={onClick} disabled={disabled}>Submit</Button>
        <ErrorBox errMsg={errorMsg}></ErrorBox>
      </div>
    </div>
  </div>
)