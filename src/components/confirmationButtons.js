import React from "react"

export default function ConfirmationButtons({ onConfirm, onCancel }) {
  return (
    <span>
      <div className="pointer" onClick={ onCancel }>Cancel</div>
      <div className="pointer" onClick={ onConfirm }>Confirm</div>
    </span>
  )
}
