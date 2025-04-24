import React from "react";
import UpdateForm from "../UpdateFormComponent/UpdateForm";
import { IoMdRemove } from "react-icons/io";
import "./modal.css";

export default function Modal({ show, onClose }) {
  return (
    <div className={`main-container modal ${show ? "show" : ""}`}>
      <div className="modal_content">
        <UpdateForm />
        <button className="modal_button" onClick={onClose}>
          <IoMdRemove />
        </button>
      </div>
    </div>
  );
}
