
import { Box, Text, TextProps, Link, LinkProps, EXCAddressProps, Icon } from "../components/ui";
import { ReactComponent as LinkIcon } from "../assets/images/link.svg";
import { ReactComponent as CheckIcon } from "../assets/images/check.svg";
import { ReactComponent as WarnIcon } from "../assets/images/warning.svg";
import PulseLoader from 'react-spinners/PulseLoader';
import { Dapp } from "@eximchain/dappbot-types";
import { RouteComponentProps, navigate, Link as RouterLink } from "@reach/router";

import * as React from "react";
import copy from 'copy-to-clipboard';
import Alert from 'react-s-alert';
import EXCAddress from '../components/ui/EXCAddress/index';
import { Payment } from "@eximchain/dappbot-types/spec/methods";

const eximchainBlueColor = '#267EDC';

export const copyAndAlert = (val: string, timeout: number=3800) => {
  copy(val)
  Alert.success("Successfully copied to your clipboard!", {
    timeout: timeout , offset: -20, 
  });
  return;
}

export const EXCAddressLink: React.FC<EXCAddressProps> = props => {
  let {address,short} = props
 
  return  <Box display={"inlineBlock"}>
            <Box display={"inlineBlock"} marginRight={1}> 
              <EXCAddress  size="sm"  short={short} onClick={()=>{handleCopy2Clipboard(address)}} address={address}></EXCAddress>
            </Box>
            <Icon icon="copy" color="blue" />
          </Box>
}
const handleCopy2Clipboard = (val: string) => {
    copyAndAlert(val);
    return
}


export const LayoutContainer: React.SFC = props => (
  <Box
    dangerouslySetInlineStyle={{
      __style: {
        border: "1px solid #E6EAEE"
      }
    }}
    minHeight={475}
    shape="rounded"
    padding={8}
    marginLeft={5}
    marginRight={5}
  >
    {props.children}
  </Box>
);

export const InputGroup: React.SFC = props => (
  <Box marginBottom={11}>{props.children}</Box>
);

export const InputTitle: React.SFC<TextProps> = props => (
  <Text
    bold
    size="sm"
    smSize="sm"
    mdSize="sm"
    lgSize="sm"
    textTransform="capitalize"
    {...props}
  >
    {props.children}
  </Text>
);

export const InputContainer: React.SFC = props => (
  <Box display="flex" wrap={true} marginTop={2} marginBottom={3}>
    {props.children}
  </Box>
);

export const ButtonText: React.SFC = props => (
  <Text color="inherit" inline size="sm" smSize="sm" mdSize="sm" lgSize="sm">
    {props.children}
  </Text>
);

export const Description: React.SFC = props => (
  <Text color="gray" size="xs" smSize="xs" mdSize="xs" lgSize="xs">
    {props.children}
  </Text>
);

export const ReferenceLink: React.SFC<LinkProps> = props => {
  return (
    
    <Box marginTop={1}>
      <Text  color="blue" size="xs" smSize="xs" mdSize="xs" lgSize="xs">
        <Link {...props} >
          <Box display={"inlineBlock"}>
              <Box display={"inlineBlock"} marginRight={1}>  {props.href} </Box>
              {/* <LinkIcon /> */}
            </Box>
        </Link>
      </Text>
    </Box>
  );
};

export const ReferenceLinkOLD: React.SFC<LinkProps> = props => {
  return (
    <Box marginTop={1}>
      <Text color="blue" size="xs" smSize="xs" mdSize="xs" lgSize="xs">
        <Link {...props} />
      </Text>
    </Box>
  );
};

export const FancyLink: React.SFC<LinkProps> = props => {
  return (
    
    <Box marginTop={1} marginBottom={1}>
      <Text  color="blue" size="sm" smSize="sm" mdSize="sm" lgSize="sm">
        <Link target="blank" {...props} >
          <Box display={"inlineBlock"}>
              <Box display={"inlineBlock"} marginRight={1}>  {props.children}</Box>
              <LinkIcon />
            </Box>
        </Link>
      </Text>
    </Box>
  );
};


const handleCopy = (val: React.SyntheticEvent<HTMLAnchorElement>) => {
  val.preventDefault()
  copyAndAlert(val.currentTarget.href, 3900);
  return
}

const Content: React.SFC<TextProps> = props => (
  <Text {...props} size="sm" smSize="sm" mdSize="sm" lgSize="sm">
    {props.children}
  </Text>
);


export interface DappDetailLinkProps {
  dappName: string;
};

export const DappDetailLink: React.FC<DappDetailLinkProps> = ({dappName, ...props}) =>{
  const handleDappDetailTransition = (val: string) => {
    navigate(`/home/${val}`)
    return
  }

  return (
    <Content>
       <RouterLink to={`/home/${dappName}`}>
       <Text bold color="blue" size="sm" smSize="sm" mdSize="sm" lgSize="sm">
        <Box display={"inlineBlock"}>
          <Box display={"inlineBlock"} marginRight={1}> {dappName} </Box>
          {/* <LinkIcon /> */}
        </Box>
       </Text>
       
       </RouterLink>
    </Content>
  )
  // return ;
}

export interface DappStateIndicatorProps {
  dappState: Dapp.States;
};

export const DappStateIndicator: React.FC<DappStateIndicatorProps> = ({dappState, ...props}) =>{
  let displayState:string = dappState;
  // Default icon for unexpected state.  Should never be displayed in prod.
  let icon = (<WarnIcon height={20} width={20} />);

  switch (dappState) {
    case Dapp.States.AVAILABLE:
      icon = (<CheckIcon height={20} width={20} />);
      break;
    case Dapp.States.BUILDING_DAPP:
      displayState = 'BUILDING DAPP';
    case Dapp.States.CREATING:
    case Dapp.States.DELETING:
      icon = (<PulseLoader size={6} sizeUnit={"px"} color={eximchainBlueColor} />);
      break;
    case Dapp.States.DEPOSED:
    case Dapp.States.FAILED:
      icon = (<WarnIcon height={20} width={20} />);
      break;
    default:
      displayState = 'UNEXPECTED STATE';
      break;
  }

  return (
    <Box marginLeft={-5}display="flex" alignItems="start" justifyContent="center" >
      <Box marginRight={2}>
        { icon }
      </Box>
          
      <Content textTransform="capitalize">{displayState}</Content>
    </Box>
  )
}


export const NetworkReferenceLink: React.SFC<LinkProps> = props => {
  let href = props.href
  let network = "custom"
  var isEthMainnet = /[hHtTpPsS.]*[:\/w]*mainnet.infura[\w.\/\d\D]*/gm
  var isRopsten = /[hHtTpPsS.]*[:\/w]*ropsten.infura[\w.\/\d\D]*/gm
  var isKovan = /[hHtTpPsS.]*[:\/w]*kovan.infura[\w.\/\d\D]*/gm
  var isRinkeby = /[hHtTpPsS.]*[:\/w]*rinkeby.infura[\w.\/\d\D]*/gm
  var isgoerli = /[hHtTpPsS.]*[:\/w]*goerli.infura[\w.\/\d\D]*/gm
  var isEximchain = /[hHtTpPsS.]*[:\/w]*eximchain[\w.\/\d\D]*/gm
 
  if (isEthMainnet.test(href.toLowerCase())){
    network = "Ethereum  "
  }
  else if (isRopsten.test(href.toLowerCase())){
    network = "Ropsten  "
  }
  else if (isKovan.test(href.toLowerCase())){
    network = "Kovan  "
  }
  else if (isRinkeby.test(href.toLowerCase())){
    network = "Rinkeby  "
  }
  else if (isgoerli.test(href.toLowerCase())){
    network = "Görli  "
  }
  else if (isEximchain.test(href.toLowerCase())){
    network = "Eximchain  "
  }

  
  return (
    <Box marginTop={1} marginBottom={1}>
      <Text size="sm" smSize="sm" mdSize="sm" lgSize="sm">
        <Link onClick={handleCopy}{...props}>
          <Box display={"inlineBlock"}>
            <Box display={"inlineBlock"} marginRight={1}> {network} </Box>
            <Icon icon="copy" color="blue" />
          </Box>
        </Link>
        
      </Text>
    </Box>
  );
};

export const PLAN_PRICES = {
  standard : 10,
  professional : 100,
  enterprise : 150
}

export function monthlyDappCost(numStandardDapps:number) {
  return Math.max((numStandardDapps - Payment.freeTierStripePlan().standard) * PLAN_PRICES.standard, 0);
}