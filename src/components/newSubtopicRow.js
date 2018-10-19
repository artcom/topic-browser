import React from "react"
import Editor from "./editor"
import ConfirmationButtons from "./confirmationButtons"

export default function NewSubtopicRow({ parentTopic, data, onCreate, onCancel, onPublish }) {
  if (data) {
    return renderEditRow(parentTopic, data, onPublish, onCancel, onCreate)
  } else {
    return renderAddRow(parentTopic, onCreate)
  }
}

function renderEditRow(parentTopic, data, onPublish, onCancel, onCreate) {
  const subTopic = data.topic.substring(parentTopic.length)

  return (
    <li
      className="content-list-item topic-row"
      onKeyDown={ e => onKeyDown(e, data, onPublish, onCancel) }>
      <div className="topic-column">
        <input
          ref={ input => focusTopicInput(input, data) }
          value={ subTopic }
          onChange={
            event => onCreate(getTopic(parentTopic, event.target.value), data.payload)
          } />
      </div>
      <div className="payload-column offset-left-1 offset-right-1">
        <Editor
          name="newTopic"
          value={ data.payload }
          onChange={ value => onCreate(data.topic, value) } />
      </div>
      <div className="button-column text-right">
        <ConfirmationButtons
          onConfirm={ () => onPublish(data.topic, data.payload) }
          onCancel={ onCancel } />
      </div>
    </li>
  )
}

function focusTopicInput(input, data) {
  if (input && data.payload === "") {
    input.focus()
    input.setSelectionRange(input.value.length, input.value.length)
  }
}

function renderAddRow(parentTopic, onCreate) {
  return (
    <li className="content-list-item topic-row">
      <div
        className="icon icon-add pointer"
        onClick={ () => onCreate(getTopic(parentTopic, ""), "") }>
        +
      </div>
    </li>
  )
}

function getTopic(parentTopic, subTopic) {
  if (parentTopic === "") {
    return subTopic
  }

  const separator = subTopic.startsWith("/") ? "" : "/"
  return parentTopic + separator + subTopic
}

function onKeyDown(e, data, onPublish, onCancel) {
  switch (e.which) {
    case 13: // ENTER
      if (e.shiftKey) {
        onPublish(data.topic, data.payload)
      }

      break
    case 27: // ESC
      onCancel()
      break
    default:
      return
  }
}
