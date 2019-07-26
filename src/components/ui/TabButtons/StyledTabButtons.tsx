import styled, { StyledComponentClass } from "styled-components";

export const StyledTabButtons: StyledComponentClass<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  any,
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = styled.div`
  &.tab-buttons {
    display: flex;
    width: 100%;
  }

  &.small {
    --btn-font: var(
      --typography-btn-small-primary,
      normal 500 15px / normal "Inter UI"
    );
  }
`;

export const StyledTabButton: StyledComponentClass<
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
  /**** Main Tab button ****/
  &.tab-button {
    flex: 1;
    position: relative;
    cursor: pointer;
    padding: 10px 14px;
    outline: none;
    box-shadow: none;
    color: var(--color-blue-7, #267edc);
    background-color: var(--color-neutral-1, #ffffff);
    border-top: 1px solid var(--color-blue-7, #267edc);
    border-right: 1px solid var(--color-blue-7, #267edc);
    border-bottom: 1px solid var(--color-blue-7, #267edc);
    border-left: 1px solid var(--color-blue-7, #267edc);
    font: var(--btn-font, normal 500 17px / normal "Inter UI");
  }

  /**** TabButton selected ****/
  &.tab-button.selected {
    color: var(--color-neutral-1, #ffffff);
    background-color: var(--color-blue-7, #267edc);
  }

  &:first-of-type {
    border-left: 1px solid var(--btn-border-color, #267edc);
    border-top-left-radius: var(--border-radius-btn, 6px);
    border-bottom-left-radius: var(--border-radius-btn, 6px);
  }

  &:last-of-type {
    border-left: none;
    border-right: 1px solid var(--btn-border-color, #267edc);
    border-top-right-radius: var(--border-radius-btn, 6px);
    border-bottom-right-radius: var(--border-radius-btn, 6px);
  }

  &:not(first-of-type),
  &:not(last-of-type) {
    border-left: none;
  }

  &:hover {
    color: var(--color-blue-6, #529bea);
    background-color: var(--color-blue-1, #f0f6fd);
    border-color: var(--color-blue-6, #529bea);
  }

  &:active {
    color: var(--color-blue-8, #256fc7);
    background-color: var(--color-neutral-1, #ffffff);
    border-color: var(--color-blue-8, #256fc7);
  }

  &:disabled,
  &[disabled] {
    color: var(--color-neutral-8, #9ca3ae);
    background-color: var(--color-neutral-3, #f0f2f4);
    border-color: var(--color-neutral-4, #e3e5e8);
    cursor: not-allowed;
  }

  &:focus::after {
    position: absolute;
    content: "";
    width: calc(100% - 6px);
    height: calc(100% - 6px);
    left: 2px;
    top: 2px;
    outline: none;
    box-shadow: none;
    border: 1px solid var(--color-blue-7, #267edc);
  }

  &:first-of-type:focus::after {
    border-top-left-radius: var(--border-radius-btn, 6px);
    border-bottom-left-radius: var(--border-radius-btn, 6px);
  }

  &:last-of-type:focus::after {
    border-top-right-radius: var(--border-radius-btn, 6px);
    border-bottom-right-radius: var(--border-radius-btn, 6px);
  }
`;

export default StyledTabButtons;
