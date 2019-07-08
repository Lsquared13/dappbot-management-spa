import styled, { StyledComponentClass } from "styled-components";

const StyledMask: StyledComponentClass<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  any,
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = styled.div`
  &.Mask {
    overflow: hidden;
    position: relative;
    will-change: transform;
  }

  &.square {
    border-radius: 0;
  }

  &.rounded {
    border-radius: var(--border-radius);
  }

  &.circle {
    border-radius: 50%;
  }

  & .wash {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.03);
    pointer-events: none;
  }
`;

export default StyledMask;
