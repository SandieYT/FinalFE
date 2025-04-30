import React from "react";
import { UpdateForm, AddForm } from "../../components";
import { IoMdRemove } from "react-icons/io";
import "./modal.css";

export default function Modal({
  show,
  onClose,
  userId,
  type,
  onUpdateSuccess,
}) {
  return (
    <div className={`main-container modal ${show ? "show" : ""}`}>
      <div className="modal_content">
        {type === "edit" ? (
          <UpdateForm
            userId={userId}
            onUpdateSuccess={() => {
              onUpdateSuccess?.();
              onClose();
            }}
          />
        ) : (
          <AddForm
            onSuccess={() => {
              onUpdateSuccess?.();
              onClose();
            }}
          />
        )}
        <button className="modal_button" onClick={onClose}>
          <IoMdRemove />
        </button>
      </div>
    </div>
  );
}
