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
  &.select {
    font-size: var(--font-size-2);
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
    padding: 0 0px 0 14px;
  }

  &.select:focus {
    /* box-shadow: 0 0 0 4px rgba(0, 132, 255, 0.5); */
    outline: 0;
  }

  &.select::-ms-expand {
    display: none;
  }

  &.normal {
    border-color: #e0e3e8;
  }

  &.errored {
    border-color: #e3780c;
  }

  &.enabled {
    color: var(--darkGray);
    background-color: transparent;
  }

  &.disabled {
    color: var(--gray);
    background-color: var(--lightGray);
  }

  &.drp {
    z-index: 1;
    /* color: red; */
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 30px;
  }
`;
export default StyledSelectList;
