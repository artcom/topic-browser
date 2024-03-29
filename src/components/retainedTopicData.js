import React from "react"

import ContentRow from "./contentRow"
import NewSubtopicRow from "./newSubtopicRow"
import TopicLink from "./topicLink"

import {
  createTopic,
  cancelTopicCreation,
  publishTopic,
  unpublishTopic,
  unpublishTopicRecursively
} from "../actionCreators"

export default function RetainedTopicData(props) {
  return (
    <div>
      { renderPayloadRow(props) }
      { renderSubTopicRows(props) }
      { renderNewSubtopicRow(props) }
    </div>
  )
}

function renderPayloadRow(props) {
  if (props.topicData.payload) {
    return renderRow(
      props.topicData.topic,
      props.topicData.payload,
      "PAYLOAD",
      unpublishTopic,
      props
    )
  } else {
    return null
  }
}

function renderSubTopicRows(props) {
  return (props.topicData.children || []).map(child => {
    const topic = child.topic
    const link = <TopicLink topic={ topic } />
    return renderRow(topic, child.payload, link, unpublishTopicRecursively, props)
  })
}

function renderRow(topic, payload, name, unpublish, props) {
  return (
    <ContentRow
      key={ topic }
      name={ name }
      topic={ topic }
      payload={ payload }
      toDelete={ props.topicToDelete === topic }
      toEdit={ props.topicToEdit && props.topicToEdit.topic === topic ? props.topicToEdit : null }
      deleting={ props.deleting === topic }
      publishing={ props.publishing && props.publishing.topic === topic ? props.publishing : null }
      unpublishTopic={ unpublish }
      dispatch={ props.dispatch }
      mqttClient={ props.mqttClient }
      httpClient={ props.httpClient } />
  )
}

function renderNewSubtopicRow(props) {
  return (
    <NewSubtopicRow
      parentTopic={ props.topicData.topic || "" }
      data={ props.topicToCreate }
      onCreate={ (topic, payload) => props.dispatch(createTopic(topic, payload)) }
      onPublish={ (topic, payload) => props.dispatch(
        publishTopic(topic, payload, props.mqttClient, props.httpClient))
      }
      onCancel={ () => props.dispatch(cancelTopicCreation()) } />
  )
}
