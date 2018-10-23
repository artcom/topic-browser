import React from "react"

export default function ConfirmationButtons({ onConfirm, onCancel }) {
  return (
    <span>
      <div className="pointer icon-cancel" onClick={ onCancel } />
      <div className="pointer icon-confirm" onClick={ onConfirm } />
    </span>
  )
}
