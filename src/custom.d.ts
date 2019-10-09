/// <reference types="react-scripts" />

// Below syntax allows you to load global types without actually
// attaching them to an import -- they're just attached to the
// window.  Discovered this from the below GitHub issue comment:
//
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/17996#issuecomment-314911875
//
/// <reference path="../node_modules/@types/segment-analytics/index.d.ts" />


declare module "react-floating-button-menu";
declare module "react-copy-to-clipboard";
declare module "*.svg" {
  const value: any;
  export default value;
}
declare module 'react-icons/lib/fa/close';