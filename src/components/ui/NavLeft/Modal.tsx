import * as React from 'react';
import classnames from 'classnames';
import ModalDialog from './ModalDialog';
import ModalHeader from './ModalHeader';
import ModalTitle from './ModalTitle';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import './Modal.css';

export type ModalSizeOptions = "small" | "medium" | "large";
export const SizeMap = {
  small: 'small',
  large: 'large',
  medium: 'medium'
}
export const ModalStyles = {
  backdrop: 'backdrop',
  header : 'header',
  body: 'body',
  dialog: 'dialog',
  footer: 'footer',
  title: 'title',
  content: 'content'
}

export function prefix(baseClass: any, style: string) {
  return baseClass + (style ? "-" + style : "");
}

export interface Props {
  /**
   * func, Event --> called when modal hide
   **/
  onHide?: () => void;
  /**
   * ReactNode, custom element
   **/
  backdrop?: React.ReactNode
  /**
   * boolean, whether to close modal on outside click
   * @default true
   **/
  closeOnOutsideClick?: boolean
  /**
   * boolean, When true The modal will show itself.
   * @default false
   **/
  show: boolean
  /**
   * string, modal size on of "small" | "medium" | "large"
   * @default medium
   **/
  size?: ModalSizeOptions;
  /**
    * string, custom class prefix for css
    * @default modal
    **/
  customClass?: string;
  /**
   * string, class to apply on component
   **/
  className?: string;
}

export interface State {
  show?: boolean;
}

export class Modal extends React.Component<Props, State> {
  static Dialog = ModalDialog;
  static Header = ModalHeader;
  static Title = ModalTitle;
  static Body = ModalBody;
  static Footer = ModalFooter;

  static defaultProps = {
    customClass: 'modal',
    size: 'medium',
    closeOnOutsideClick: true
  }

  constructor(props: any) {
    super(props);
    this.state = {
      show: this.props.show
    };
    this.onCloseClick = this.onCloseClick.bind(this);
    this.onBackdropClick = this.onBackdropClick.bind(this);
    this.escFunction = this.escFunction.bind(this);
  }

  hideModal() {
    this.setState({
      show: !this.state.show
    });
    this.props.onHide && this.props.onHide();
  }

  onBackdropClick(event: any) {
    if (this.props.closeOnOutsideClick)
      this.hideModal();
  }

  onCloseClick(event: any) {
    this.hideModal();
  }

  getClasses() {
    let { customClass, size, className } = this.props;
    let sizeClasses = '';
    if (size && SizeMap[size])
      sizeClasses = prefix(customClass, SizeMap[size]);
    return classnames(customClass, sizeClasses, className)
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.show !== this.state.show) {
      this.setState({ show: nextProps.show });
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }

  escFunction(event: any) {
    if (event.keyCode === 27 && this.state.show) {
      this.hideModal();
    }
  }

  getChildren() {
    let { children, customClass } = this.props;
    return React.Children.map(children, (child: any) => {
      if (child.type == ModalHeader) {
        child = React.cloneElement(child, {
          customClass: customClass,
          onCloseClick: this.onCloseClick
        });
      }
      else {
        child = React.cloneElement(child, {
          customClass: customClass
        });
      }
      return child
    });
  }

  render() {
    let { customClass, backdrop } = this.props;
    let className = this.getClasses();
    let boundChildren = this.getChildren();
    let backdropClass = prefix(customClass, ModalStyles.backdrop);
    let contentClass = prefix(customClass, ModalStyles.content);
    return (
      <div className={className} style={this.state.show ? { display: 'block' } : {}}>
        {backdrop ? backdrop : <div className={backdropClass} onClick={this.onBackdropClick}></div>}
        <div className={contentClass}>
          {boundChildren}
        </div>
      </div>
    )
  }
}

export default Modal;
