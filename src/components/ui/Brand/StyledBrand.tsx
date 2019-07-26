import styled, { StyledComponentClass } from "styled-components";
var wordmarkBlue = require("../../../../images/brand/wordmark/blue.svg")
//import * as wordmarkBlue from "../../../../images/brand/wordmark/blue.svg";
var wordmarkDark = require("../../../../images/brand/wordmark/dark.svg");
var wordmarkWhite = require("../../../../images/brand/wordmark/white.svg");
var lettermarkBlue = require("../../../../images/brand/lettermark/blue.svg");
var lettermarkDark=require("../../../../images/brand/lettermark/dark.svg");
var lettermarkWhite= require("../../../../images/brand/lettermark/white.svg");
var tokenBlue=require("../../../../images/brand/token/blue.svg");
var tokenDark=require("../../../../images/brand/token/dark.svg");
var tokenWhite=require("../../../../images/brand/token/white.svg");
var tokenBlueOnWhite=require("../../../../images/brand/token/blue-on-white.svg");
var tokenDarkOnWhite=require("../../../../images/brand/token/dark-on-white.svg");
var tokenWhiteOnBlue=require("../../../../images/brand/token/white-on-blue.svg");
var tokenWhiteOnDark=require("../../../../images/brand/token/white-on-dark.svg");
// import * as lettermarkBlue from "../../../../images/brand/lettermark/blue.svg";
// import * as lettermarkDark from "../../../../images/brand/lettermark/dark.svg";
// import * as lettermarkWhite from "../../../../images/brand/lettermark/white.svg";
// import * as tokenBlue from "../../../../images/brand/token/blue.svg";
// import * as tokenDark from "../../../../images/brand/token/dark.svg";
// import * as tokenWhite from "../../../../images/brand/token/white.svg";
// import * as tokenBlueOnWhite from "../../../../images/brand/token/blue-on-white.svg";
// import * as tokenDarkOnWhite from "../../../../images/brand/token/dark-on-white.svg";
// import * as tokenWhiteOnBlue from "../../../../images/brand/token/white-on-blue.svg";
// import * as tokenWhiteOnDark from "../../../../images/brand/token/white-on-dark.svg";

export const StyledBrand: StyledComponentClass<
  React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >,
  any,
  React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
> = styled.a`
  /** base class **/
  &.brand {
    display: inline-block;
    text-decoration: none;
    background-repeat: no-repeat;
    background-size: contain;
    cursor: pointer;
  }

  &:focus,
  &:hover {
    text-decoration: none;
    outline: none;
  }

  /** wordmark **/
  &.brand.wordmark {
    min-height: 26px;
    min-width: 200px;
  }
  &.brand.wordmark.blue {
    background-image: url(${wordmarkBlue});
  }
  &.brand.wordmark.dark {
    background-image: url(${wordmarkDark});
  }
  &.brand.wordmark.white {
    background-image: url(${wordmarkWhite});
  }

  /** lettermark **/
  &.brand.lettermark {
    min-height: 21px;
    min-width: 73px;
  }
  &.brand.lettermark.blue {
    background-image: url(${lettermarkBlue});
  }
  &.brand.lettermark.dark {
    background-image: url(${lettermarkDark});
  }
  &.brand.lettermark.white {
    background-image: url(${lettermarkWhite});
  }

  /** token **/
  &.brand.token {
    min-height: 28px;
    min-width: 28px;
  }
  &.brand.token.blue {
    background-image: url(${tokenBlue});
  }
  &.brand.token.dark {
    background-image: url(${tokenDark});
  }
  &.brand.token.white {
    background-image: url(${tokenWhite});
  }
  &.brand.token.blue-on-white {
    background-image: url(${tokenBlueOnWhite});
  }
  &.brand.token.dark-on-white {
    background-image: url(${tokenDarkOnWhite});
  }
  &.brand.token.white-on-blue {
    background-image: url(${tokenWhiteOnBlue});
  }
  &.brand.token.white-on-dark {
    background-image: url(${tokenWhiteOnDark});
  }
`;

export default StyledBrand;
