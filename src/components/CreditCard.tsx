import React, { FC } from 'react';
import { StripeTypes } from '@eximchain/dappbot-types/spec/methods/payment';
import './CreditCard.scss';
import Card from 'react-credit-cards';

export interface CreditCardProps {
  card: StripeTypes.Card
}

export const CreditCard: FC<CreditCardProps> = ({ card }) => {
  const { last4, brand, name, exp_month, exp_year } = card;

  function convertBrand(brandName: typeof brand) {
    switch (brandName) {
      case 'American Express':
        return 'amex';
      case 'Diners Club':
        return 'dinersclub';
      default:
        return brandName.toLowerCase()
    }
  }

  return (
    <div style={{width:'300px'}}>
      <Card
        name={name || ''}
        expiry={`${exp_month}/${exp_year}`}
        number={`**** **** **** ${last4}`}
        issuer={convertBrand(brand)}
        cvc='***'
        preview={true} />
    </div>
  )
}

export default CreditCard;