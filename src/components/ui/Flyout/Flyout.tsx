import React, { FC, ReactNode, useRef } from "react";
import "@reach/tooltip/styles.css"
// @ts-ignore Don't worry about missing export
import { useTooltip, TooltipPopup } from "@reach/tooltip";

export interface FlyoutProps {
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
  ariaLabel: string
}

export const Flyout:FC<FlyoutProps> = ({children, label, ariaLabel, ...props}) => {
  // @ts-ignore TS doesn't understand that ref values are intentionally mutable across types.
  const triggerRef = useRef()
  const [trigger, tooltip] = useTooltip({ref:triggerRef});

  const { triggerRect } = tooltip;

  function centered(triggerRect:any, tooltipRect:any){
    const triggerCenter = triggerRect.left + triggerRect.width / 2;
    const left = triggerCenter - tooltipRect.width / 2;
    const maxLeft = window.innerWidth - tooltipRect.width - 2;
    let centeredPosition = {
      left: Math.min(Math.max(2, left), maxLeft) + window.scrollX,
      top: triggerRect.bottom + 8 + window.scrollY,
      display: 'absolute'
    }
    return centeredPosition;
  }
  
  let popup;
  let popupProps = {
    ...tooltip, label, ariaLabel,
    position : centered,
    style : {
      background: 'black',
      color: 'white',
      border: 'none',
      borderRadius: '3px',
      padding: '0.5em 1em'
    }
  }
  
  if (triggerRect !== null){
    popup = <TooltipPopup {...popupProps} />
  }
  return (
    // @ts-ignore
    <span {...trigger} >
      { children }
      { popup }
    </span>
  );
}

export default Flyout;
