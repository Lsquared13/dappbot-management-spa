import React, { FC, useState, useEffect } from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import DappbotAPI from '@eximchain/dappbot-api-client';
import { StringField, NumberField, Uints, BooleanField } from '../components/fields';
import { Button, Box, Text, Checkbox } from '../components/ui';
import { Container, monthlyDappCost, PLAN_PRICES } from "../layout";
import EmailImage from "../assets/images/CheckEmail.svg";


import { CardElement, injectStripe, ReactStripeElements } from 'react-stripe-elements';
import validate from 'validator';
import Alert from 'react-s-alert';

import '../components/froala/bootstrap.min.css';
import '../components/froala/froala_blocks.min.css';
import { ErrorBox } from '../components';
import { useResource } from 'react-request-hook';
import { getErrMsg } from '../services/util';
import Track from '../services/analytics';
import { Payment } from '@eximchain/dappbot-types/spec/methods';

interface SignupProps extends RouteComponentProps, ReactStripeElements.InjectedStripeProps {
  user?: any
  API: DappbotAPI
  requireCreditCard?: boolean
}

const FREE_CAPACITY = Payment.freeTierStripePlan().standard;

export const CheckoutBox:FC<{numDapps:string, requireCreditCard:boolean}> = ({numDapps, requireCreditCard}) => {
  if (requireCreditCard){
    return (
      <Box>
        <Text>
          You are purchasing <strong>{numDapps} dapps</strong> at a total cost of <strong>${monthlyDappCost(parseInt(numDapps))} per month</strong> ({FREE_CAPACITY} for free, then ${PLAN_PRICES.standard} apiece).
        </Text>
      </Box>
    )
  } 
  else {
    return (
      <Box>
        <Text>
          You will receive access to <strong>{numDapps} dapps</strong> on our free tier.  If you would like to create more, you can add a credit card later.
        </Text>
      </Box>
    )
   
  }
  
}

      

export const Signup:FC<SignupProps> = ({user, API, stripe, requireCreditCard}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [coupon, setCoupon] = useState('');
  const [numDapps, setNumDapps] = useState(FREE_CAPACITY.toString());
  
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [organization, setOrganization] = useState("");
  const [occupation, setOccupation] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false) ;


  const [createUserResponse, sendCreateUserRequest] = useResource(API.payment.signUp.resource);
  const [createUserSent, markCreateUserSent] = useState(false);

  const metadata = { occupation, organization };
  const isRequired = requireCreditCard;
  const noCreditCardSignupArgs = { 
    plans: { standard:1, professional:0, enterprise:0 },
    email, name, coupon, metadata
  };
  const creditCardSignupArgs = { 
    plans: { standard:+numDapps, professional:0, enterprise:0 },
    token: "",
    email, name, coupon, metadata
  };

  const handleCreateUser= async () => {
    markCreateUserSent(true);
    setErr('');
    if (isRequired && stripe) {
      try {
        let {token} = await stripe.createToken({'name': name});
        if (token && token.id) { 
          creditCardSignupArgs.token = token.id
          sendCreateUserRequest(creditCardSignupArgs) }
      } catch (err) {
        let msg = `Error sending new user request : ${getErrMsg(err)}`;
        setErr(msg);
        Alert.error(msg);
      }
    } 
    else {
      sendCreateUserRequest(noCreditCardSignupArgs);
    }

 
  }
  useEffect(() => {
    if (!createUserSent) return
    if (createUserResponse.isLoading){
      setLoading(true);
      Alert.info("Sending Request", { timeout: 750});  
    } else if (createUserResponse.error) {
      markCreateUserSent(false)
      setLoading(false);
      console.log(createUserResponse.error)
      switch (createUserResponse.error.code) {
        default: {
          let msg = `Error creating user : ${getErrMsg(createUserResponse.error)}`;
          setErr(msg)
          Alert.error(msg);
        }
      }

    } else if(createUserResponse.data) {
      console.log(createUserResponse.data)
      setLoading(false);
      setSuccessful(true);
      markCreateUserSent(false);
      Track.userSignup(email, metadata);
    }
  }, [createUserResponse]);
  
  return successful ? (
    <Box marginTop={9} marginBottom={12}>
      <Container>
        <div className="mb-5 mt-5 text-center">
          <div className="row text-center mb-3">
            <div className="col-sm-6 m-auto col-lg-4">
              <img alt="Dapp Empty State" className="img-fluid" src={EmailImage} />
            </div>
          </div>
          <Text
            bold
            size="lg"
            smSize="lg"
            mdSize="lg"
            lgSize="lg"
            align="center"
            className="mb-3"
            color="blue"
            >
            Check your Email
          </Text>
          <div className="row text-center">
            <div className="col-sm-6 col-md-6 m-auto">
              <Text
              size="sm"
              smSize="sm"
              mdSize="sm"
              lgSize="sm"
              color="gray"
              align="center"
              className="mb-5">
                You're ready to make up to {numDapps} dapps with DappBot!
                <br />
                We've sent you an email with your temporary password, <Link to='/login'>login here</Link>.
              </Text>
            </div>
          </div>
        </div>
      </Container>
    </Box>
  ) : (
    <div>

      <section className="fdb-block fp-active" data-block-type="forms">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-7 col-md-5 text-center">
              <div className="fdb-box fdb-touch">
                <div className="row">
                  <div className="col">
                    <h2>Get Started with DappBot</h2>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col">
                    <StringField name='name' 
                    value={name} 
                    disabled={loading}
                    displayName='Name'
                    onChange={setName}/>
                  </div>
                </div>
                
             
                <div className="row mt-4">
                  <div className="col">
                    <StringField name='email' 
                    value={email} 
                    isValid={validate.isEmail}
                    disabled={loading}
                    displayName='Email'
                    onChange={setEmail}/>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col">
                    <StringField name='organization' 
                    value={organization} 
                    isValid={()=> true}
                    disabled={loading}
                    displayName='Organization'
                    onChange={setOrganization}/>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col">
                    <StringField name='occupation' 
                    value={occupation} 
                    isValid={()=> true}
                    disabled={loading}
                    displayName='Occupation'
                    onChange={setOccupation}/>
                  </div>
                </div>
      
                <div className="row mt-4">
                  <div className="col">	                  
                    <div className="col flex d-flex flex-row">
                      
                      <div className="mt-1">
                        <Checkbox
                          checked={agreeTerms}
                          disabled={false}
                          indeterminate={false}
                          id='agreeTerms'
                          name='agreeTerms'
                          size='sm'
                          onChange={({ event, checked }) => {
                            setAgreeTerms(!agreeTerms)
                          }}
                        />
                      </div>
                      <label className="text-left mr-2 pl-2" htmlFor="agreeTerms">I have read and agreed to the DappBot <a target="_blank" href="/privacy">Privacy Policy</a> and <a target="_blank" href="/terms">Terms of Use</a>.</label>
                    </div>	                 
                  </div>
                </div>
                
                { !requireCreditCard ? null : (
                  <div>
                      <div className="row mb-4">
                        <div className="col" style={{textAlign: "left"}}>
                      
                          <NumberField name='numDapps' 
                          value={numDapps}
                          displayName={'Number of Dapps'}
                          disabled={loading}
                          size={Uints.size32}
                          onChange={setNumDapps} />
                        </div>
                      </div>

                      <div className="row mb-4">
                        <div className="col">
                          <div style={{textAlign: "left"}}>
                            <p className="input-group-header" >Payment</p>
                          </div>
                          <div style={{border: "1px solid #8e8e8e", borderRadius: 4, padding: 20}}>
                            <CardElement />
                          </div>
                        </div>
                      </div>
                  </div>)
                }
                
                
                <div className="row mt-4 mb-4">
                  <div className="col">
                    <CheckoutBox numDapps={numDapps} requireCreditCard={!!requireCreditCard}/>
                  </div>
                </div>

                <Button disabled={loading} onClick={handleCreateUser} block>
                  Submit
                </Button>

              </div>
            </div>
          </div>
        </div>
      </section>

      <ErrorBox errMsg={err} />
    </div>
  )
}

Signup.defaultProps = {
  requireCreditCard: false,
}

export const SignupPage = injectStripe(Signup);

export default SignupPage;