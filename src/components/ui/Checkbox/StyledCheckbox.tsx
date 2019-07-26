import styled, { StyledComponentClass } from "styled-components";

export const StyledCheckboxInput: StyledComponentClass<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  any,
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
> = styled.input`
  &.input {
    --red: #e60023;
    --size-sm: 16px;
    --size-md: 24px;
    position: absolute;
    margin: calc(var(--vbt) * 0) calc(var(--hbt) * 0);
    appearance: none;
    opacity: 0;
    outline: 0;
  }

  &.inputEnabled {
    cursor: pointer;
  }

  &.inputSm {
    height: var(--size-sm);
    width: var(--size-sm);
  }

  &.inputMd {
    height: var(--size-md);
    width: var(--size-md);
  }
`;

export const StyledCheckboxCheck: StyledComponentClass<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  any,
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = styled.div`
  &.border {
    border-color: #8e8e8e;
  }

  &.borderError {
    border-color: #e3780c;
  }

  &.borderDark {
    border-color: #333;
  }

  &.check {
    --red: #e60023;
    --size-sm: 16px;
    --size-md: 24px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    border-style: solid;
    border-width: 1px;
  }

  &.checkEnabled {
    cursor: pointer;
  }

  &.checkFocused {
    box-shadow: 0 0 0 4px rgba(0, 132, 255, 0.5);
    outline: 0;
  }

  &.checkSm {
    border-radius: 3px;
    height: var(--size-sm);
    width: var(--size-sm);
  }

  &.checkMd {
    border-radius: 4px;
    height: var(--size-md);
    width: var(--size-md);
  }
`;
