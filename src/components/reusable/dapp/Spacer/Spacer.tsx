import * as React from "react";

export interface SpacerProps {}

export const Spacer: React.SFC<SpacerProps> = props => {
  return (
    <div
      style={{
        backgroundColor: `grey`,
        padding: "100px"
      }}
    />
  );
};

Spacer.displayName = "Spacer";

export default Spacer;
