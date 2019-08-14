import React, { FC } from "react";

export interface AppBaseProps {

}

export const AppBase: FC<AppBaseProps> = (props) => {
  // Alert must only be mounted once and must stay mounted for the 
  // life of the application.
  return (
    <div className="App" id="appBase">
      {props.children}
    </div>
  );
};

export default AppBase;
