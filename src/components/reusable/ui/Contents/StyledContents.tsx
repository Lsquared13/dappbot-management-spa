import styled from "styled-components";
const StyledContents = styled.div`
  &.container {
    position: relative;
  }

  & .contents {
    position: absolute;
    display: block;
    box-sizing: border-box;
    border-radius: var(--border-radius);
    border-radius: var(--border-radius);
    border: 1px solid black;
  }

  & .contents:focus {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.18);
    outline: none;
  }

  & .dimensions {
    max-height: 90vh;
    max-width: 90vw;
    min-height: 40px;
  }

  & .innerContents {
    display: flex;
    overflow: auto;
    border-radius: var(--border-radius);
  }

  & .caret {
    position: absolute;
    fill: black;
    height: 24px;
    pointer-events: none;
  }
`;
export default StyledContents;
