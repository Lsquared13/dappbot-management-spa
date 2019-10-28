import * as React from "react";
import StyledStaticConsole from "./StyledStaticConsole";
import ConsoleText from "./ConsoleText";

export const StaticConsole: React.SFC = props => (
  <StyledStaticConsole>
    <p className="line1">
      {ConsoleText.line1}
    </p>
    <p className="line2">
      {ConsoleText.line2}
    </p>
    <p className="line3">
      {ConsoleText.line3a}
    </p>
    <p className="line3">
      {ConsoleText.line3b}
    </p>

    <p className="line3">
      {ConsoleText.line3c} 
    </p>

    <p className="line3">
      {ConsoleText.line3d} 
    </p>
    <p className="line4-heading">
      {ConsoleText.line4heading}
      
    </p>

    <p className="line4">
      {ConsoleText.line4a} 
    </p>
    <p className="line4">
      {ConsoleText.line4b} 
    </p>
    <p className="line4">
      {ConsoleText.line4c} 
    </p>

    <p className="line5-heading">
      {ConsoleText.line5heading}
      
    </p>
    <p className="line5">
      {ConsoleText.line5} 
    </p>
    <p className="line6">
      {ConsoleText.line6}

    </p>
    <p className="line6">
      <span className="cursor6">...</span>
    </p>

    <p className="line7-heading"> {ConsoleText.line7heading}</p>
    <p className="line7">{ConsoleText.line7a}</p>
    <p className="line7">{ConsoleText.line7b} </p>
    <p className="line7">{ConsoleText.line7c} </p>
    <p className="line7">
      {ConsoleText.line7d}
  
    </p>
    <p className="line7">
      <span className="cursor7">...</span>
    </p>

    <p className="line8-heading"> {ConsoleText.line8heading}</p>
    <p className="line8">{ConsoleText.line8a}</p>
    <p className="line8">{ConsoleText.line8b} </p>
    <p className="line8">{ConsoleText.line8c} </p>
    <p className="line8">
      {ConsoleText.finaLineStatic}
     
    </p>
    <p className="line8">
    
    </p>
  </StyledStaticConsole>
);
export default StaticConsole;
