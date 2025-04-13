import React from "react";
import stayles from "./Modal.module.css";

const modalContent = {
  background: "white",
  padding: "10px",
  borderRadius: "3px",
};

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const Modal = (props) => {
  const closeModal = () => {
    props.setShowModal(false);
  };

  return (
    <>
      {props.showFlag ? (
        <div id="overlay" style={overlay}>
          <div id="modalContent" style={modalContent}>
            <p>{props.content}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Modal;
