import React from "react"

export default function Legend() {
  return (
    <ul className="tip">
      <li>
        Use double-click to edit payload.
      </li>
      <li>
        <i>[SHIFT]</i> + <i>[ENTER]</i> to publish and <i>[ESC]</i> to cancel.
      </li>
      <li>
        Use <kbd>/</kbd> in the topic field to create subtopics, e.g. foo/bar.
      </li>
    </ul>
  )
}
