import * as types from "./actionTypes"

export function topic(state = "", action) {
  switch (action.type) {
    case types.REQUEST_TOPIC:
      return action.topic
    default:
      return state
  }
}

export function loading(state = true, action) {
  switch (action.type) {
    case types.REQUEST_TOPIC:
      return true
    case types.UPDATE_TOPIC:
      return false
    default:
      return state
  }
}

export function topicData(state = {}, action) {
  switch (action.type) {
    case types.REQUEST_TOPIC:
      return Object.assign({}, state, {
        [action.topic]: {}
      })
    case types.UPDATE_TOPIC:
      return Object.assign({}, state, {
        [action.topicData.topic]: action.topicData
      })
    default:
      return state
  }
}

export function topicToDelete(state = null, action) {
  switch (action.type) {
    case types.DELETE_TOPIC:
      return action.topic
    case types.CANCEL_TOPIC_DELETION:
    case types.START_TOPIC_DELETION:
      return null
    default:
      return state
  }
}

export function deleting(state = null, action) {
  switch (action.type) {
    case types.START_TOPIC_DELETION:
      return action.topic
    case types.FINISH_TOPIC_DELETION:
      return null
    default:
      return state
  }
}

export function topicToCreate(state = null, action) {
  switch (action.type) {
    case types.CREATE_TOPIC:
      return { topic: action.topic, payload: action.payload }
    case types.CANCEL_TOPIC_CREATION:
    case types.START_TOPIC_PUBLICATION:
    case types.EDIT_PAYLOAD:
    case types.REQUEST_TOPIC:
      return null
    default:
      return state
  }
}

export function topicToEdit(state = null, action) {
  switch (action.type) {
    case types.EDIT_PAYLOAD:
      return { topic: action.topic, payload: action.payload }
    case types.CANCEL_PAYLOAD_EDITING:
    case types.START_TOPIC_PUBLICATION:
    case types.CREATE_TOPIC:
      return null
    default:
      return state
  }
}

export function publishing(state = null, action) {
  switch (action.type) {
    case types.START_TOPIC_PUBLICATION:
      return { topic: action.topic, payload: action.payload }
    case types.FINISH_TOPIC_PUBLICATION:
      return null
    default:
      return state
  }
}
