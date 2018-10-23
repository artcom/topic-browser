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
      className="topic-row"
      onKeyDown={ e => onKeyDown(e, data, onPublish, onCancel) }>
      <div className="topic-column">
        <input
          ref={ input => focusTopicInput(input, data) }
          value={ subTopic }
          onChange={
            event => onCreate(getTopic(parentTopic, event.target.value), data.payload)
          } />
      </div>
      <div className="payload-column">
        <Editor
          name="newTopic"
          value={ data.payload }
          onChange={ value => onCreate(data.topic, value) } />
      </div>
      <div className="button-column">
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
    <li className="topic-row">
      <div
        className="pointer icon-add"
        onClick={ () => onCreate(getTopic(parentTopic, ""), "") } />
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
