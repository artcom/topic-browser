import React from "react"

export default function Legend() {
  return (
    <ul className="tip">
      <li>
        Use <b>double-click</b> to edit <i>payload</i>.
      </li>
      <li>
        <b>[SHIFT]</b> + <b>[ENTER]</b> to publish and <b>[ESC]</b> to cancel.
      </li>
      <li>
        Use <kbd>/</kbd> in the topic field to create subtopics, e.g. <i>foo/bar</i>.
      </li>
    </ul>
  )
}
