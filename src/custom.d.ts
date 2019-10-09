/// <reference types="react-scripts" />

declare module "react-floating-button-menu";
declare module "react-copy-to-clipboard";
declare module "*.svg" {
  const value: any;
  export default value;
}
declare module 'react-icons/lib/fa/close';
// declare module '*.svg'

import Analytics from  '@segment/analytics.js-core';
export import analytics = Analytics;

declare global {
  interface Window { analytics: analytics }
}