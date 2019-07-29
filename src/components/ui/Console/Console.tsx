import * as React from "react";
import StyledConsole from "./StyledConsole";
export const Console: React.SFC = props => (
  <StyledConsole>
    <p className="line1">
      $ dappsmith create --dapp<span className="cursor1">_</span>
    </p>
    <p className="line2">
      this tool will parse your ABI and create and host a dapp at the specified
      subdomain. The process takes around 5 minutes to build and deploy. Happy
      hacking!<span className="cursor2">_</span>
    </p>
    <p className="line3">
      [+] Fetching Dapp Seed<span className="cursor3">_</span>
    </p>
    <p className="line3">
      [+] Loading ...<span className="cursor3">_</span>
    </p>

    <p className="line3">
      [+] Complete, cleaning up resources... <span className="cursor3">_</span>
    </p>

    <p className="line3">
      [+] Ready, to build some dapps... <span className="cursor3">_</span>
    </p>
    <p className="line4-heading">
      > Building Dapp this will take some time, (DO NOT REFRESH THE PAGE)
      <span className="cursor4">_</span>
    </p>

    <p className="line4">
      [+] Fetching Pythons ... <span className="cursor4">_</span>
    </p>
    <p className="line4">
      [+] Calling Snake Charmers ... <span className="cursor4">_</span>
    </p>
    <p className="line4">
      [+] Playing a tune... <span className="cursor4">_</span>
    </p>

    <p className="line5-heading">
      > CodeGen in progress (DO NOT REFRESH THE PAGE)
      <span className="cursor5">_</span>
    </p>
    <p className="line5">
      [+] [2/519] Generating Models ... <span className="cursor5">_</span>
    </p>
    <p className="line6">
      [+] [30/519] Generating Views & Controllers ...
      <span className="cursor6">_</span>
    </p>
    <p className="line6">
      <span className="cursor6">...</span>
    </p>

    <p className="line7-heading"> Inject blockchain capabilities</p>
    <p className="line7">[+] [156/519] Injecting web3 ...</p>
    <p className="line7">[+] [168/519] Injecting metamask... </p>
    <p className="line7">[+] [232/519] Setting up smart contract... </p>
    <p className="line7">
      [+] [232/519] Generate a component for each smart contract method...
      <span className="cursor7">_</span>
    </p>
    <p className="line7">
      <span className="cursor7">...</span>
    </p>

    <p className="line8-heading"> Configure Web Infrastructure</p>
    <p className="line8">[+] [416/519] Reserving Subdomain ...</p>
    <p className="line8">[+] [487/519] Configuring CNAME record... </p>
    <p className="line8">[+] [503/519] Setting up https... </p>
    <p className="line8">
      [+] [518/519] Propagating DNS record [ T - 3 min ]...
      <span className="cursor8">_</span>
    </p>
    <p className="line8">
      <span className="cursor8">...</span>
    </p>
    <p className="line9"> DONE, RETURNING TO DASHBOARD PAGE</p>
  </StyledConsole>
);
export default Console;
