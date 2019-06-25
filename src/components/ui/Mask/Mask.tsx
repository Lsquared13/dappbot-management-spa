import * as React from "react";
import classnames from "classnames";

import StyledMask from "./StyledMask";

export interface MaskProps {
  /**
   * React.ReactNode, React node as childeren
   **/
  children?: React.ReactNode;
  /**
   * number | string, define the height of mask
   **/
  height?: number | string;
  /**
   * String, mask shape
   * options include: "circle" | "rounded" | "square"
   * @default "square"
   **/
  shape?: "circle" | "rounded" | "square";
  /**
   * number | string, define the width of mask
   **/
  width?: number | string;
  /**
   * boolean, If you expect the masked content to be nearly white, you can apply a wash to emphasize the edge of the mask
   * @default false
   **/
  wash?: boolean;
}

const Mask: React.SFC<MaskProps> = props => {
  const { children, shape, width, height, wash } = props;
  return (
    <StyledMask className={classnames("Mask", shape)} style={{ width, height }}>
      {children}
      {wash && <div className="wash" />}
    </StyledMask>
  );
};

Mask.defaultProps = {
  shape: "square",
  wash: false
};

Mask.displayName = "Mask";

export default Mask;
