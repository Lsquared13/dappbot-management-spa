import styled, { StyledComponentClass } from "styled-components";

export const StyledSearchInput: StyledComponentClass<
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
    width: 100%;
    appearance: none;
    background-color: var(--color-neutral-3, #f0f2f4);
    border: var(--border-width) solid var(--border-color);
    border-radius: var(--border-radius, 6px);
    box-sizing: border-box;
    color: var(--color-neutral-12, #2d323b);
    font-size: var(--font-size-3, 16px);
    font-family: var(--font-InterUI, "Inter UI");
    min-height: 40px;
    padding: 8px calc(16px + (2 * 8px)) 8px calc(16px + (2 * 16px));
  }

  &.input:focus {
    /* box-shadow: 0 0 0 4px rgba(0, 132, 255, 0.5); */
    outline: 0;
  }

  &.input::-ms-clear {
    display: none;
  }

  &.input::placeholder {
    color: var(--color-neutral-9, #888f9a);
  }

  &.input::-webkit-search-decoration,
  &.input::-webkit-search-cancel-button,
  &.input::-webkit-search-results-button,
  &.input::-webkit-search-results-decoration {
    appearance: none;
  }

  .input:focus {
    background-color: var(--color-neutral-3, #f0f2f4);
  }
`;

export const StyledSearchClearButton: StyledComponentClass<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  any,
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> = styled.button`
  &.clear {
    border: 0;
    cursor: pointer;
    font-size: var(--font-size-3, 16px);
    padding-left: calc(var(--bt) * 3);
    padding-right: calc(var(--bt) * 3);
    padding-top: calc(var(--bt) * 3);
    padding-bottom: calc(var(--bt) * 3);
    position: relative;
    background-color: transparent;
    outline: none;
  }
`;

export default StyledSearchInput;
