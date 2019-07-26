import * as React from 'react';
import ModalTitle from './ModalTitle';
import ButtonClose from './ButtonClose';
export function prefix(baseClass: any, style: string) {
  return baseClass + (style ? "-" + style : "");
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

export interface ModalHeaderProps {
  /**
   * func, Event --> called when close button is clicked
   **/
  onCloseClick?: () => void
  /**
   * boolean, show(true)/hide(false) close button
   * @default false
   **/
  closeButton?: boolean
  /**
    * string, custom class prefix for css
    * @default modal-header
    **/
  customClass?: string
}

class ModalHeader extends React.Component<ModalHeaderProps> {

  static defaultProps = {
    customClass : 'modal-header'
  }

  getChildren() {
    const { children, customClass} = this.props;
    return React.Children.map(children, (child: any) => {
      if (child.type == ModalTitle) {
        child = React.cloneElement(child, {
          customClass: customClass
        });
      } else {
        child = null
      }
      return child
    });
  }

  render() {
    const { customClass, closeButton, onCloseClick } = this.props;
    let className = prefix(customClass, ModalStyles.header);
    const boundChildren = this.getChildren();
    return (
      <div className={className}>
        {boundChildren}
        {closeButton ? <ButtonClose onClick={onCloseClick} /> : null}
      </div>
    );
  }
}

export default ModalHeader;
