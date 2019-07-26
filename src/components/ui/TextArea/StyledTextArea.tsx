import styled, { StyledComponentClass } from "styled-components";

export const StyledTextArea: StyledComponentClass<
  React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >,
  any,
  React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >
> = styled.textarea`
  &.textArea {
    box-sizing: border-box;
    width: calc(12 / var(--ncols) * 100%);
    line-height: 1.5;
    font-size: var(--font-size-3);
    appearance: none;
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    padding: 10px 14px;
    resize: none;
  }

  &.textArea:focus {
    background-color: #fff;
    box-shadow: 0 0 0 4px rgba(0, 132, 255, 0.5);
    outline: 0;
  }

  &.textArea::placeholder {
    color: #8e8e8e;
  }

  &.normal {
    border-color: #8e8e8e;
  }

  &.errored {
    border-color: #e3780c;
  }

  &.enabled {
    color: var(--darkGray);
    background-color: var(--white);
    cursor: text;
  }

  &.disabled {
    color: var(--darkGray);
    background-color: var(--lightGray);
  }
`;
export default StyledTextArea;
