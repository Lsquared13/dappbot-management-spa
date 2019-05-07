import React, { FC, SFC, cloneElement, ReactNode, ReactElement, useRef, MutableRefObject } from "react";
import { createPortal } from 'react-dom';
import Controller from "./../Controller";
// @ts-ignore
import Tooltip, { useTooltip, TooltipPopup } from "@reach/tooltip"

const centered = (triggerRect:any, tooltipRect:any) => {
  const triggerCenter = triggerRect.left + triggerRect.width / 2;
  const left = triggerCenter - tooltipRect.width / 2;
  const maxLeft = window.innerWidth - tooltipRect.width - 2;
  return {
    left: Math.min(Math.max(2, left), maxLeft) + window.scrollX,
    top: triggerRect.bottom + 8 + window.scrollY
  }
}

export interface FlyoutProps {
  /**
   * HTMLElement, Ref for the element that the Flyout will attach to
   **/
  anchor?: HTMLElement;
  /**
   * React.ReactNode, React node as childeren
   **/
  children: ReactNode;
  /**
   * String, Preferred direction for the Flyout to open
   * Options includes : "up" | "right" | "down" | "left"
   **/
  idealDirection?: "up" | "right" | "down" | "left";
  /**
   * function, Event called when flyout dismissed
   **/
  onDismiss?: () => void;
  /**
   * boolean, Depicts if the Flyout shares a relative root with the anchor element
   * @default true
   **/
  positionRelativeToAnchor?: boolean;
  /**
   * boolean, The background color of the Flyout: orange matches other baked-in error flyouts
   * @default white
   **/
  color?: "blue" | "orange" | "white" | "darkGray";
  /**
   * boolean, Focus on the flyout when opened
   * @default true
   **/
  shouldFocus?: boolean;
  /**
   * string | number, Size of flyout xs: 185px, sm: 230px, md: 284px, lg: 320px, xl:375px
   * @default sm
   **/
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;

  label: string,
  ariaLabel: string,
  isVisible?: boolean
}

export const Flyout: FC<FlyoutProps> = ({ children, label, ariaLabel, ...props }) => {
  const triggerRef:MutableRefObject<Element> = useRef(new Element());
  const [trigger, tooltip] = useTooltip();
  const { isVisible, triggerRect } = tooltip;
  let portal = null;
  const newElt = (
    <>
      { cloneElement(children as ReactElement, {trigger, ref:triggerRef}) }
      {isVisible && portal}
      <TooltipPopup {...tooltip}
        style={{
          background: 'black',
          color: 'white',
          border: 'none',
          borderRadius: '3px',
          padding: '0.5em 1em'
        }} 
        isVisible={props.isVisible ? props.isVisible : null}
        label={label} 
        position={centered}
        ariaLabel={ariaLabel} />
    </>
  )
  portal = createPortal(
    <div style={{
      position: 'absolute',
      left : triggerRect && triggerRect.left - 10 + triggerRect.width / 2,
      top : triggerRect && triggerRect.bottom + window.scrollY,
      width : 0,
      height : 0,
      borderLeft: '10px solid transparent',
      borderRight: '10px solid transparent',
      borderBottom: '10px solid black'
    }} />, triggerRef.current)
  return newElt;
}

// export const OldFlyout: SFC<FlyoutProps> = props => {
//   const {
//     anchor,
//     children,
//     idealDirection,
//     onDismiss,
//     positionRelativeToAnchor = true,
//     color = "white",
//     shouldFocus = true,
//     size
//   } = props;

//   if (!anchor) {
//     return null;
//   }

//   return (
//     <Controller
//       anchor={anchor}
//       bgColor={color}
//       idealDirection={idealDirection}
//       onDismiss={onDismiss}
//       positionRelativeToAnchor={positionRelativeToAnchor}
//       shouldFocus={shouldFocus}
//       size={size}
//     >
//       {children}
//     </Controller>
//   );
// };

// Flyout.defaultProps = {
//   color: "white",
//   positionRelativeToAnchor: true,
//   shouldFocus: true,
//   size: "sm"
// };

// Flyout.displayName = "Flyout";

export default Flyout;
