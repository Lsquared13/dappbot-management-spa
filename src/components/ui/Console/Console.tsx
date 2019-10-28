import * as React from "react";
import StyledConsole from "./StyledConsole";
import ConsoleText from "./ConsoleText";

export const Console: React.SFC = props => (
  <StyledConsole>
    <p className="line1">
      {ConsoleText.line1}<span className="cursor1">_</span>
    </p>
    <p className="line2">
      {ConsoleText.line2}<span className="cursor2">_</span>
    </p>
    <p className="line3">
      {ConsoleText.line3a}<span className="cursor3">_</span>
    </p>
    <p className="line3">
      {ConsoleText.line3b}<span className="cursor3">_</span>
    </p>

    <p className="line3">
      {ConsoleText.line3c} <span className="cursor3">_</span>
    </p>

    <p className="line3">
      {ConsoleText.line3d} <span className="cursor3">_</span>
    </p>
    <p className="line4-heading">
      {ConsoleText.line4heading}
      <span className="cursor4">_</span>
    </p>

    <p className="line4">
      {ConsoleText.line4a} <span className="cursor4">_</span>
    </p>
    <p className="line4">
      {ConsoleText.line4b} <span className="cursor4">_</span>
    </p>
    <p className="line4">
      {ConsoleText.line4c} <span className="cursor4">_</span>
    </p>

    <p className="line5-heading">
      {ConsoleText.line5heading}
      <span className="cursor5">_</span>
    </p>
    <p className="line5">
      {ConsoleText.line5} <span className="cursor5">_</span>
    </p>
    <p className="line6">
      {ConsoleText.line6}
      <span className="cursor6">_</span>
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
      <span className="cursor7">_</span>
    </p>
    <p className="line7">
      <span className="cursor7">...</span>
    </p>

    <p className="line8-heading"> {ConsoleText.line8heading}</p>
    <p className="line8">{ConsoleText.line8a}</p>
    <p className="line8">{ConsoleText.line8b} </p>
    <p className="line8">{ConsoleText.line8c} </p>
    <p className="line8">
      {ConsoleText.line8d}
      <span className="cursor8">_</span>
    </p>
    <p className="line8">
      <span className="cursor8">...</span>
    </p>
    <p className="line9"> {ConsoleText.finalLineDynamic}</p>
  </StyledConsole>
);
export default Console;
