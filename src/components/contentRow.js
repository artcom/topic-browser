import React from "react"
import Editor from "./editor"
import ConfirmationButtons from "./confirmationButtons"

import {
  deleteTopic,
  cancelTopicDeletion,
  editPayload,
  cancelPayloadEditing,
  publishTopic
} from "../actionCreators"

export default function ContentRow(props) {
  const [payload, button] = renderPayloadAndButtons(props)

  return (
    <li className="topic-row" key={ props.topic }>
      <div className="topic-column">{ props.name }</div>
      <div className="payload-column">{ payload }</div>
      <div className="button-column text-right">{ button }</div>
    </li>
  )
}

function renderPayloadAndButtons(props) {
  const { mqttClient, httpClient, dispatch } = props

  if (props.toEdit) {
    return [
      renderEditor(props.toEdit.topic, props.toEdit.payload, mqttClient, httpClient, dispatch),
      renderEditorButtons(props.toEdit.topic, props.toEdit.payload, mqttClient, httpClient, dispatch)
    ]
  } else if (props.toDelete) {
    return [
      renderPayload(props.topic, props.payload),
      renderConfirmDeletionButtons(
        props.topic, props.unpublishTopic, mqttClient, httpClient, dispatch
      )
    ]
  } else if (props.publishing) {
    return [
      renderPayloadInProgress(props.publishing.payload),
      renderPublishing()
    ]
  } else if (props.deleting) {
    return [
      renderPayloadInProgress(props.payload),
      renderDeleting()
    ]
  } else {
    return [
      renderPayload(props.topic, props.payload, dispatch),
      renderDeleteButton(props.topic, dispatch)
    ]
  }
}

function renderEditor(topic, payload, mqttClient, httpClient, dispatch) {
  const prettyPayload = getPrettyPayload(payload)
  return (
    <Editor
      name={ topic }
      value={ prettyPayload || payload }
      focus
      onChange={ data => dispatch(editPayload(topic, data)) }
      onConfirm={ () => dispatch(publishTopic(topic, payload, mqttClient, httpClient)) }
      onCancel={ () => dispatch(cancelPayloadEditing(topic)) } />
  )
}

function renderEditorButtons(topic, payload, mqttClient, httpClient, dispatch) {
  return (
    <ConfirmationButtons
      onConfirm={ () => dispatch(publishTopic(topic, payload, mqttClient, httpClient)) }
      onCancel={ () => dispatch(cancelPayloadEditing(topic)) } />
  )
}

function renderPayloadInProgress(payload) {
  const style = { color: "grey" }
  const pretty = getPrettyPayload(payload)
  return pretty ? <pre style={ style }>{ pretty }</pre> : <pre style={ style }>{ payload }</pre>
}

function renderPayload(topic, payload, dispatch) {
  const pretty = getPrettyPayload(payload)
  if (pretty) {
    return <pre onDoubleClick={ () => dispatch(editPayload(topic, payload)) }>{ pretty }</pre>
  } else {
    return (
      <pre
        onDoubleClick={ () => dispatch(editPayload(topic, payload)) }
        className="invalid">
        { payload }
      </pre>
    )
  }
}

function getPrettyPayload(payload) {
  try {
    const json = JSON.parse(payload)
    return JSON.stringify(json, null, 2)
  } catch (e) {
    return null
  }
}

function renderDeleteButton(topic, dispatch) {
  return (
    <div className="pointer icon-delete" onClick={ () => dispatch(deleteTopic(topic)) } />
  )
}

function renderConfirmDeletionButtons(topic, unpublishTopic, mqttClient, httpClient, dispatch) {
  return (
    <ConfirmationButtons
      onConfirm={ () => dispatch(unpublishTopic(topic, mqttClient, httpClient)) }
      onCancel={ () => dispatch(cancelTopicDeletion(topic)) } />
  )
}

function renderDeleting() {
  return <div className="icon icon-right icon-load rotate" />
}

function renderPublishing() {
  return <div className="icon icon-right icon-load rotate" />
}
