import React, { FC, CSSProperties } from 'react';
import moment from 'moment';
import twix from 'twix';
import { XOR } from 'ts-xor';
import { Text } from './ui';
import { Invoice, LineItem } from '../services/api/types';

export interface InvoiceTableProps {
  invoice: XOR<Invoice, null>
}

interface StylesMap {
  [key:string] : CSSProperties
}

const CustomStyles:StylesMap = {
  bold: {
    fontWeight : 'bold'
  }
}

function capitalize(str:string){
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function humanizeStripeRange(start: number, end: number) {
  const range = moment(start * 1000).twix(end * 1000);
  return range.format();
}

export const InvoiceTable: FC<InvoiceTableProps> = (props) => {
  const { invoice } = props;
  if (!invoice) {
    return <Text>Loading...</Text>
  }
  const {
    total, subtotal, lines, period_start, period_end
  } = invoice;

  const invoiceRange = humanizeStripeRange(period_start, period_end);

  function LineItemRow(item:LineItem, key:string|number){
    const {
      quantity, amount, proration, period, description, plan
    } = item;
    const { start, end } = period;
    const range = proration ? humanizeStripeRange(start, end) : '';
    return (
      <tr key={key}>
        <td>{capitalize(plan.id)} | {description}</td>
        <td>{range}</td>
        <td>{quantity}</td>
        <td>{amount}</td>
      </tr>
    )
  }

  return (
    <table className='table'>
      <thead>
        <tr>
          <td></td>
          <td>Date Range</td>
          <td>Quantity</td>
          <td>Amount ($)</td>
        </tr>
      </thead>
      <tbody>
        {lines.data.map(LineItemRow)}
        <tr>
          <td style={CustomStyles.bold}>Subtotal Before Taxes &amp; Fees</td>
          <td colSpan={2}></td>
          <td style={CustomStyles.bold}>{subtotal / 100}</td>
        </tr>
        <tr>
          <td style={CustomStyles.bold}>Total</td>
          <td colSpan={2}>{invoiceRange}</td>
          <td style={CustomStyles.bold}>{total / 100}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default InvoiceTable;