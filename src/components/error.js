import React from "react"

export default function Error({ msg }) {
  return (
    <div className="notification notification-negative">
      <div className="notification-content">
        <div className="notification-heading">{ msg.error }</div>
        Topic <strong>{ msg.topic }</strong> does not exist.
      </div>
    </div>
  )
}
