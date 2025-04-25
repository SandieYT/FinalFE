import React from "react";
import { UpdateForm } from "../../components";
import { IoMdRemove } from "react-icons/io";
import "./modal.css";

export default function Modal({ show, onClose, userId, onUpdateSuccess }) {
  return (
    <div className={`main-container modal ${show ? "show" : ""}`}>
      <div className="modal_content">
        <UpdateForm
          userId={userId}
          onUpdateSuccess={() => {
            onUpdateSuccess?.();
            onClose();
          }}
        />
        <button className="modal_button" onClick={onClose}>
          <IoMdRemove />
        </button>
      </div>
    </div>
  );
}
