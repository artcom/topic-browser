import React from "react"

export default function ConfirmationButtons({ onConfirm, onCancel }) {
  return (
    <span>
      <div className="icon icon-error pointer" onClick={ onCancel }>Cancel</div>
      <div className="icon icon-success pointer" onClick={ onConfirm }>Confirm</div>
    </span>
  )
}
