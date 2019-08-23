import React, { FC, CSSProperties } from 'react';
import moment from 'moment';
import chunk from 'lodash.chunk';
import { XOR } from 'ts-xor';
import { Text } from './ui';
import { Invoice, LineItem } from '../services/api/types';
require('twix');

export interface InvoiceTableProps {
  invoice: XOR<Invoice, null>
  loadingData: boolean
}

interface StylesMap {
  [key:string] : CSSProperties
}

const CustomStyles:StylesMap = {
  bold: {
    fontWeight : 'bold'
  }
}

interface RowData {
  description: string
  amount: number
  period: string,
  bold?: boolean
}
function InvoiceRow({ description, amount, period, bold }:RowData, key?:number|string) {
  let styles = bold ? CustomStyles.bold : {};
  return (
    <tr key={key}>
      <td style={styles}>{description}</td>
      <td style={styles}>{period}</td>
      <td style={styles}>{formatStripeAmount(amount)}</td>
    </tr>
  )
}

function capitalize(str:string){
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
function formatStripeAmount(amount:number){
  return amount > 0 ?
    usdFormatter.format(amount / 100) :
    `(${usdFormatter.format(-1 * amount / 100)})`
}

function stripeRangeLength(start:number, end:number) {
  // @ts-ignore TS doesn't understand how Twix loads
  const range = moment(start * 1000).twix(end * 1000);
  return range.humanizeLength();
}

function formatStripeRange(start: number, end: number) {
  // @ts-ignore TS doesn't understand how Twix loads
  const range = moment(start * 1000).twix(end * 1000);
  return range.length('days') < 1 ? 
    range.format() :
    range.format({ hideTime : true })
}

export const InvoiceTable: FC<InvoiceTableProps> = (props) => {
  const { invoice, loadingData } = props;
  if (loadingData) {
    return <Text>Loading...</Text>
  }
  if (!invoice) {
    return <Text>No subscription to invoice.</Text>
  }
  const {
    total, subtotal, lines, period_start, period_end
  } = invoice;

  const lineItems = lines.data.slice();
  const subscriptionLine = lineItems.pop() as LineItem;
  lineItems.reverse()

  // Use invoice items to build a list of change events,
  // which we can later parse to create a list of billing
  // subperiods.
  const changeArray = chunk(lineItems, 2).map((changePoint, key) => {
    const [newCharge, oldCredit] = changePoint;
    return {
      prevCount : oldCredit.quantity,
      nextCount : newCharge.quantity,
      charge : newCharge.amount,
      credit : oldCredit.amount,
      timestamp : newCharge.period.start
    }
  })

  const changeRows:JSX.Element[] = [];
  changeArray.forEach((change, i) => {
    // First change includes credit for the payment which
    // started this billing cycle. Note that this block
    // does not return.
    if (i === 0){
      changeRows.push(
        <InvoiceRow key='initial-credit' 
          description={`Credit from ${change.prevCount} Standard Dapps on Last Invoice`}
          period={formatStripeRange(period_start, change.timestamp)}
          amount={change.credit} />
      )
    }

    // Last change has nothing following it, just use the
    // resulting charge directly.  Note that this is not
    // in an else -- if there's only one change, we want
    // both of these rows to be added. This returns, as
    // we don't want to compare against a "next" change
    // that doesn't exist.
    if (i === changeArray.length - 1){
      changeRows.push(
        <InvoiceRow key='rest-of-month'
          amount={change.charge}
          description={`Rest of Month: ${change.nextCount} Standard Dapps`}
          period={formatStripeRange(change.timestamp, period_end)} />
      )
      return;
    }

    // For changes which have another change after them,
    // add a row reflecting the net value charged between
    // this change the following one.  Don't add a row if
    // the update was so fast as to cause no charge.
    const nextChange = changeArray[i + 1];
    if (change.charge + nextChange.credit > 0) {
      changeRows.push(
        <InvoiceRow key={i}
          description={`${change.nextCount} Standard Dapps for ${stripeRangeLength(change.timestamp, nextChange.timestamp)}`}
          period={formatStripeRange(change.timestamp, nextChange.timestamp)}
          amount={change.charge + nextChange.credit} />
      )
    }
  })
  const netChangeValue = changeArray.reduce((total, change) => {
    return total + change.charge + change.credit;
  }, 0);

  return (
    <table className='table' style={{width:'100%'}}>
      <thead>
        <tr>
          <th>Charge Description</th>
          <th>Time Period</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        { 
          changeRows.length > 0 && (
            <InvoiceRow bold
              description='This Month'
              amount={netChangeValue}
              period={formatStripeRange(period_start, subscriptionLine.period.start)} />
          )
         }
        { changeRows }
        <InvoiceRow bold amount={subscriptionLine.amount} 
          description={`Next Month: ${subscriptionLine.quantity} Standard Dapps`}
          period={formatStripeRange(subscriptionLine.period.start, subscriptionLine.period.end)} />
        <InvoiceRow description='Subtotal Before Taxes &amp; Fees' period='' amount={subtotal} />
        <InvoiceRow bold description='Total' 
          period={`Billing on ${moment(subscriptionLine.period.start * 1000).format('MMM D')}`} 
          amount={total} />
      </tbody>
    </table>
  )
}

export default InvoiceTable;