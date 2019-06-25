import * as React from "react";
import StyledStaticConsole from "./StyledStaticConsole";
export const StaticConsole: React.SFC = props => (
  <StyledStaticConsole>
    <p className="line1">
      $ dappsmith create --dapp
    </p>
    <p className="line2">
      this tool will parse your ABI and create and host a dapp at the specified
      subdomain. The process takes around 5 minutes to build and deploy. Happy
      hacking!
    </p>
    <p className="line3">
      [+] Fetching Dapp Seed
    </p>
    <p className="line3">
      [+] Loading ...
    </p>

    <p className="line3">
      [+] Complete, cleaning up resources... 
    </p>

    <p className="line3">
      [+] Ready, to build some dapps... 
    </p>
    <p className="line4-heading">
      > Building Dapp this will take some time, (DO NOT REFRESH THE PAGE)
      
    </p>

    <p className="line4">
      [+] Fetching Pythons ... 
    </p>
    <p className="line4">
      [+] Calling Snake Charmers ... 
    </p>
    <p className="line4">
      [+] Playing a tune... 
    </p>

    <p className="line5-heading">
      > CodeGen in progress (DO NOT REFRESH THE PAGE)
      
    </p>
    <p className="line5">
      [+] [2/519] Generating Models ... 
    </p>
    <p className="line6">
      [+] [30/519] Generating Views & Controllers ...

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
  
    </p>
    <p className="line7">
      <span className="cursor7">...</span>
    </p>

    <p className="line8-heading"> Dapp Built and available</p>
    <p className="line8">[+] [416/519] Reserving Subdomain ...</p>
    <p className="line8">[+] [487/519] Configuring CNAME record... </p>
    <p className="line8">[+] [503/519] Setting up https... </p>
    <p className="line8">
      DONE!
     
    </p>
    <p className="line8">
    
    </p>
  </StyledStaticConsole>
);
export default StaticConsole;
