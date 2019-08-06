import React, { FC, useState } from 'react';
import { ICard as CardType, subscriptions } from 'stripe';
import { useResource } from 'react-request-hook';
import { XOR } from 'ts-xor';
import moment from 'moment';
import { LayoutContainer, InputGroup, InputTitle, InputContainer } from '../layout';
import CreditCard from './CreditCard';
import 'react-credit-cards/lib/styles.scss';
import API from '../services/api';
import { Box, Text } from './ui';

export interface BillingProps {
  source: XOR<CardType, null>
  sub: subscriptions.ISubscription
}


export const Billing:FC<BillingProps> = ({ source, sub }) => {
  
  let cardElt = source ? (
    <CreditCard card={source} />
  ) : (
    <Text>No Card on File</Text>
  )

  // Format is like 'January 1st'
  let nextBillingDate = moment(sub.current_period_end).format('MMMM Do');

  let subStatus = 
    sub.status === 'trialing' ? 'Trial' :
    sub.status === 'active' ? 'Active' :
    sub.status === 'canceled' ? 'Cancelled' :
    'Lapsed';
  return (
    <LayoutContainer>
      
      <InputGroup>
        <InputTitle color="gray">Credit Card</InputTitle>
        <InputContainer>
          <Box column={12} mdColumn={8}>
            {cardElt}
          </Box>
        </InputContainer>
        {/* TODO: Add an update button within here*/}
      </InputGroup>

      {/* TODO: List the current number of subs */}

      <InputGroup>
        <InputTitle color="gray">Subscription Status</InputTitle>
        <InputContainer>
          <Box column={12} mdColumn={8}>
            <Text>
              {subStatus}
            </Text>
          </Box>
        </InputContainer>
      </InputGroup>

      <InputGroup>
        <InputTitle color="gray">Next Billing Date</InputTitle>
        <InputContainer>
          <Box column={12} mdColumn={8}>
            <Text>
              {nextBillingDate}
            </Text>
          </Box>
        </InputContainer>
      </InputGroup>

    </LayoutContainer>
  )
}

export default Billing;