import sortBy from "lodash.sortby"
import trimStart from "lodash.trimstart"
import { unpublishRecursively } from "@artcom/mqtt-topping"

import * as types from "./actionTypes"

export function fetchRetainedTopic(topic, mqttClients) {
  return dispatch => {
    dispatch(requestRetainedTopic(topic))

    const fetchTopicData = topic === "" ? fetchRoot(mqttClients) : fetchTopic(topic, mqttClients)

    return fetchTopicData
      .then(topicData => {
        dispatch(updateTopic(topicData))
      })
      .catch(error => {
        console.log(error)
        dispatch(updateTopic(error))
      })
  }
}

function fetchRoot(mqttClients) {
  return mqttClients.httpClient.queryBatch([
    { topic: null, depth: 1, parseJson: false },
    { topic: "", depth: 1, parseJson: false }
  ]).then(([root, slashRoot]) => {
    if (!root.children) {
      return root
    }

    const children = root.children.filter(child => child.topic !== "")
    const slashChildren = slashRoot.children || []

    return {
      topic: "",
      children: sortBy([...children, ...slashChildren], child => trimStart(child.topic, "/"))
    }
  })
}

function fetchTopic(topic, mqttClients) {
  return mqttClients.httpClient.query({ topic, depth: 1, parseJson: false })
}

export function requestRetainedTopic(topic) {
  return {
    type: types.REQUEST_TOPIC,
    topic
  }
}

export function updateTopic(topicData) {
  return {
    type: types.UPDATE_TOPIC,
    topicData
  }
}

export function deleteTopic(topic) {
  return {
    type: types.DELETE_TOPIC,
    topic
  }
}

export function cancelTopicDeletion(topic) {
  return {
    type: types.CANCEL_TOPIC_DELETION,
    topic
  }
}

export function unpublishTopic(topic, mqttClients) {
  return (dispatch, getState) => {
    dispatch(startTopicDeletion(topic))
    return mqttClients.wsClient.unpublish(topic)
      .then(() => dispatch(fetchRetainedTopic(getState().topic, mqttClients)))
      .then(() => dispatch(finishTopicDeletion(topic)))
      .catch(error => {
        console.log(error)
        dispatch(finishTopicDeletion(null))
      })
  }
}

export function unpublishTopicRecursively(topic, mqttClients) {
  return (dispatch, getState) => {
    dispatch(startTopicDeletion(topic))
    return unpublishRecursively(mqttClients.wsClient, mqttClients.httpClient, topic)
      .then(() => dispatch(fetchRetainedTopic(getState().topic, mqttClients)))
      .then(() => dispatch(finishTopicDeletion(topic)))
      .catch(error => {
        console.log(error)
        dispatch(finishTopicDeletion(null))
      })
  }
}

export function startTopicDeletion(topic) {
  return {
    type: types.START_TOPIC_DELETION,
    topic
  }
}

export function finishTopicDeletion(topic) {
  return {
    type: types.FINISH_TOPIC_DELETION,
    topic
  }
}

export function editPayload(topic, payload) {
  return {
    type: types.EDIT_PAYLOAD,
    topic,
    payload
  }
}

export function cancelPayloadEditing(topic) {
  return {
    type: types.CANCEL_PAYLOAD_EDITING,
    topic
  }
}

export function createTopic(topic, payload) {
  return {
    type: types.CREATE_TOPIC,
    topic,
    payload
  }
}

export function cancelTopicCreation() {
  return {
    type: types.CANCEL_TOPIC_CREATION
  }
}

export function publishTopic(topic, payload, mqttClients) {
  return (dispatch, getState) => {
    dispatch(startTopicPublication(topic, payload))
    return mqttClients.wsClient.publish(topic, payload, { stringifyJson: false })
      .then(() => dispatch(fetchRetainedTopic(getState().topic, mqttClients)))
      .then(() => dispatch(finishTopicPublication(topic)))
      .catch(error => {
        console.log(error)
        dispatch(finishTopicPublication(null))
      })
  }
}

export function startTopicPublication(topic, payload) {
  return {
    type: types.START_TOPIC_PUBLICATION,
    topic,
    payload
  }
}

export function finishTopicPublication(topic) {
  return {
    type: types.FINISH_TOPIC_PUBLICATION,
    topic
  }
}
