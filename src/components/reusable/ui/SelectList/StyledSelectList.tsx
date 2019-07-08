import styled, { StyledComponentClass } from "styled-components";

export const StyledSelectList: StyledComponentClass<
  React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >,
  any,
  React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >
> = styled.select`
  &.drp{
    
    z-index: 1;
    /* color: red; */
    position: absolute;
    top: 79.5%;
    right: 78.5%;
    font-size: 30px;
  }
  &.select {
    font-size: var(--font-size-3);
    color: var(--darkGray);
    cursor: pointer;
    position: relative;
    min-height: 40px;
    background-color: transparent;
    width: calc(12 / var(--ncols) * 100%);
    appearance: none;
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    padding: 0 35px 0 14px;
  }

  &.select:focus {
    box-shadow: 0 0 0 4px rgba(0, 132, 255, 0.5);
    outline: 0;
  }

  &.select::-ms-expand {
    display: none;
  }

  &.normal {
    border-color: #E0E3E8;
  }

  &.errored {
    border-color: #e3780c;
  }

  &.enabled {
    color: var(--darkGray);
    background-color: var(--white);
  }

  &.disabled {
    color: var(--gray);
    background-color: var(--lightGray);
  }


`;
export default StyledSelectList;
