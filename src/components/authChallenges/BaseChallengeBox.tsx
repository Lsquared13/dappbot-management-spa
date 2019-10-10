import { ErrorBox } from '..';
import { Button } from '../ui';
import { StringField, StringFieldProps } from '../fields/StringField';

import React, { FC, ReactNode } from 'react';

export const ChallengeBoxInput: FC<StringFieldProps> = (props) => (
  <div className="row mt-4">
    <div className="col">
      <StringField {...props} /> 
    </div>
  </div>
)

export interface BaseChallengeBoxProps {
  title: string
  errorMsg: string
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>)=>void
  disabled?: boolean
  children?: ReactNode
}

export const BaseChallengeBox: FC<BaseChallengeBoxProps> = ({ title, onClick, disabled, errorMsg, children }) => (
  <section className="fdb-block fp-active pt-0" data-block-type="forms" >
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8 text-center">
          <div className="fdb-box fdb-touch">
            <div className="row">
              <div className="col">
                <h2>{title}</h2>
              </div>
            </div>
            {children}
            <div className="row mt-4">
              <div className="col">
                <div style={{textAlign: "left"}}>
                  <Button onClick={onClick} disabled={disabled}>Submit</Button>
                  <ErrorBox errMsg={errorMsg}></ErrorBox>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default BaseChallengeBox;