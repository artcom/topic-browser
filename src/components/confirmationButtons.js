import React from "react"

export default function ConfirmationButtons({ onConfirm, onCancel }) {
  return (
    <span className="confirm-cancel">
      <div className="pointer icon-confirm" onClick={ onConfirm } />
      <div className="pointer icon-cancel" onClick={ onCancel } />
    </span>
  )
}
