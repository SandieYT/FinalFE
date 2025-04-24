import React from "react";
import { IoMdRemove } from "react-icons/io";
import "./modal.css";

export default function Modal({ show, onClose }) {
  return (
    <div id="main-modal" className={`modal ${show ? "show" : ""}`}>
      <div className="modal_container">
        <div className="modal_content">
          <h2 className="modal_title">UpdateUser</h2>
          <button className="modal_button" onClick={onClose}>
            <IoMdRemove color="#fff" />
          </button>
        </div>
      </div>
    </div>
  );
}
