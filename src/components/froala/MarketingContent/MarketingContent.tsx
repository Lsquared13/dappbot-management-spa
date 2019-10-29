import React from 'react';
import PricingTable from './PricingTable';
import './../bootstrap.min.css';
import './../froala_blocks.min.css';
import Newsletter from './Newsletter';
import Applications from './Applications';
import Infographic from './Infographic';
import { Features } from './Features';
import Learn from './Learn';

export const MarketingContent = () => {
  return (
    <>
      <Features />
      <Infographic/>
      <PricingTable />
      <Applications />
      <Learn />
      <Newsletter />
    </>
  )
}

export default MarketingContent;