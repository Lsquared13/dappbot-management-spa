import React from 'react';
import PricingTable from './PricingTable';
import './../bootstrap.min.css';
import './../froala_blocks.min.css';
import Newsletter from './Newsletter';
import Applications from './Applications';
import { Features } from './Features';
import Learn from './Learn';

export const MarketingContent = () => {
  return (
    <>
      <Applications />
      <Features />
      <Learn />
      <PricingTable />
      <Newsletter />
    </>
  )
}

export default MarketingContent;