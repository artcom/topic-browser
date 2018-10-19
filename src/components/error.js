import React from "react"

export default function Error({ msg }) {
  return (
    <div>
      <div>
        <div>{ msg.error }</div>
        Topic <strong>{ msg.topic }</strong> does not exist.
      </div>
    </div>
  )
}
