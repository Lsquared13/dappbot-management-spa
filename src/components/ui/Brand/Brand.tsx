import * as React from "react";
import classnames from "classnames";

import { StyledBrand } from "./StyledBrand";

export interface BrandProps {
  /**
   * string, class to apply on component
   **/
  className?: string;
  /**
   * string, theme option
   **/
  theme:
    | "dark"
    | "dark-on-white"
    | "blue"
    | "blue-on-white"
    | "white"
    | "white-on-blue"
    | "white-on-dark";
  /**
   * string, brand type
   * "lettermark" | "token" | "wordmark"
   **/
  type: "lettermark" | "token" | "wordmark";
}

export const Brand: React.SFC<BrandProps> = props => {
  const { className, theme, type } = props;
  const classes = classnames("brand", type, theme, className);
  return <StyledBrand className={classes} />;
};

Brand.displayName = "Brand";

export default Brand;
