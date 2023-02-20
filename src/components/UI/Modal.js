import classes from "./Modal.module.css";
import React from "react";
import ReactDom from "react-dom";
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal} onClick={props.onClick}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  const portalElement = document.getElementById("overlays");

  return (
    <React.Fragment>
      {ReactDom.createPortal(
        <Backdrop onClose={props.onClose}></Backdrop>,
        portalElement
      )}
      {ReactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
      {}
    </React.Fragment>
  );
};

export default Modal;
