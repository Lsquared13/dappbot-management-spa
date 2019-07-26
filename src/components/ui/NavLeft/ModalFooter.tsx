import * as React from 'react';
import Button from './Button';

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
export interface ModalFooterProps {
  /**
   * func, Event --> called when cancel button clicked
   **/
  onCancelClick?: () => void;
  /**
   * func, Event --> called when confirm button clicked
   **/
  onConfirmClick?: () => void;
  /**
   * boolean, show/hide cancel button
   **/
  cancelButton?: boolean
  /**
   * boolean, show/hide confirm button
   **/
  confirmButton?: boolean
  /**
    * string, custom class prefix for css
    * @default modal-footer
    **/
  customClass?: string
}

class ModalFooter extends React.Component<ModalFooterProps> {

  static defaultProps = {
    customClass: 'modal-footer'
  }

  render() {
    const { children, customClass, cancelButton, confirmButton, onCancelClick, onConfirmClick} = this.props;
    let className = prefix(customClass, ModalStyles.footer);
    return (
      <div className={className}>
        {cancelButton && <Button primary onClick={onCancelClick}>cancel</Button>}
        {confirmButton && <Button primary onClick={onConfirmClick}>confirm</Button>}
        {children}
      </div>
    );
  }
}

export default ModalFooter;
