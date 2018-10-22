import React from "react"

export default function ConfirmationButtons({ onConfirm, onCancel }) {
  return (
    <span>
      <div className="pointer" onClick={ onCancel }>✖</div>
      <div className="pointer" onClick={ onConfirm }>✔</div>
    </span>
  )
}
