import React from "react"

export default function Legend() {
  return (
    <ul className="tip">
      <li>
        Use double-click to edit payload.
      </li>
      <li>
        <kbd>&#x21E7;</kbd> + <kbd>&#x23ce;</kbd> to publish and <kbd>esc</kbd> to cancel.
      </li>
      <li>
        Use <kbd>/</kbd> in the topic field to create subtopics, e.g. foo/bar.
      </li>
    </ul>
  )
}
