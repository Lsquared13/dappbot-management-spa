declare module "@reach/tooltip" {

  import {ReactNode, Component, ReactChildren} from 'react';

  export interface BaseTooltipProps {
    children?: React.ReactNode
    label?: React.ReactNode
    ariaLabel?: string
  }

  export interface TooltipProps<A extends BaseTooltipProps = React.HTMLAttributes<HTMLDivElement>> {
    children: ReactChildren
  }

  export default class Tooltip extends Component<TooltipProps> {}

}