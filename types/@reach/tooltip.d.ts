declare module "@reach/tooltip" {

  import {ReactNode, Component} from 'react';

  export interface BaseTooltipProps {
    children: React.ReactNode
    label: React.ReactNode
    ariaLabel?: string
  }

  export interface TooltipProps<A = React.HTMLAttributes<HTMLDivElement>> extends BaseTooltipProps & A {
    children: ReactNode
  }

  export default class Tooltip extends Component<TooltipProps> {}
  
}