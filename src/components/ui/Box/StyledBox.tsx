import styled from "styled-components";
import { breakpoints, maxBreakpoints } from "./../globalStyles";
export const StyledBox = styled.div`
  &.box {
    box-sizing: border-box;
  }
  &.marginRight10 {
    margin-right: 10%;
  }
  
  &.box:focus {
    box-shadow: 0 0 0 4px rgba(0, 132, 255, 0&.5);
    outline: 0;
  }

  /* Display */

  &.xsDisplayNone {
    display: none;
  }

  &.xsDisplayFlex {
    display: flex;
    flex-direction: row;
  }

  &.xsDisplayBlock {
    display: block;
  }

  &.xsDisplayInlineBlock {
    display: inline-block;
  }

  &.xsDisplayVisuallyHidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
  @media (${maxBreakpoints.sm}) {
    &.smDisplayNone {
      display: none;
    }
  }
  @media (${maxBreakpoints.md}) {
    &.mdDisplayNone {
      display: none;
    }
  }
  @media (${maxBreakpoints.lg}) {
    &.lgDisplayNone {
      display: none;
    }
  }
  @media (${breakpoints.sm}) {
   

    &.smDisplayFlex {
      display: flex;
      flex-direction: row;
    }

    &.smDisplayBlock {
      display: block;
    }

    &.smDisplayInlineBlock {
      display: inline-block;
    }

    &.smDisplayVisuallyHidden {
      border: 0;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      padding: 0;
      position: absolute;
      white-space: nowrap;
      width: 1px;
    }
  }

  @media (${breakpoints.md}) {

    &.mdDisplayFlex {
      display: flex;
      flex-direction: row;
    }

    &.mdDisplayBlock {
      display: block;
    }

    &.mdDisplayInlineBlock {
      display: inline-block;
    }

    &.mdDisplayVisuallyHidden {
      border: 0;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      padding: 0;
      position: absolute;
      white-space: nowrap;
      width: 1px;
    }
  }

  @media (${breakpoints.lg}) {
  
    &.lgDisplayFlex {
      display: flex;
      flex-direction: row;
    }

    &.lgDisplayBlock {
      display: block;
    }

    &.lgDisplayInlineBlock {
      display: inline-block;
    }

    &.lgDisplayVisuallyHidden {
      border: 0;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      padding: 0;
      position: absolute;
      white-space: nowrap;
      width: 1px;
    }
  }

  /* Direction */

  &.xsDirectionRow {
    flex-direction: row;
  }

  &.xsDirectionColumn {
    flex-direction: column;
  }

  @media (${breakpoints.sm}) {
    &.smDirectionRow {
      flex-direction: row;
    }

    &.smDirectionColumn {
      flex-direction: column;
    }
  }

  @media (${breakpoints.md}) {
    &.mdDirectionRow {
      flex-direction: row;
    }

    &.mdDirectionColumn {
      flex-direction: column;
    }
  }

  @media (${breakpoints.lg}) {
    &.lgDirectionRow {
      flex-direction: row;
    }

    &.lgDirectionColumn {
      flex-direction: column;
    }
  }

  /* Column */

  &.xsCol0 {
    width: 0;
  }

  @media (${breakpoints.sm}) {
    &.smCol0 {
      width: 0;
    }
  }

  @media (${breakpoints.md}) {
    &.mdCol0 {
      width: 0;
    }
  }

  @media (${breakpoints.lg}) {
    &.lgCol0 {
      width: 0;
    }
  }

  /* Flex - Alignment */

  &.itemsFlexEnd {
    align-self: flex-end;
  }

`;

export default StyledBox;
