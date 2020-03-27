import React from 'react';
import ReactDOM from 'react-dom';


export interface Props {
  children: React.ReactNode
  isShowing: boolean
  hide: React.MouseEventHandler
}

const Modal = ({ children, isShowing, hide }: Props) => isShowing ? ReactDOM.createPortal(
  <>
    <div className="modal-overlay" />
    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="modal">
        <div className="modal-header">
          <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        {children}
      </div>
    </div>
  </>, document.body
) : null;

export default Modal;
