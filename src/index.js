import React from "react"
import ReactDOM from "react-dom"
import { createLogger } from "redux-logger"
import { applyMiddleware, createStore, combineReducers } from "redux"
import thunk from "redux-thunk"
import { Provider } from "react-redux"
import topping from "mqtt-topping"

import TopicTitle from "./components/topicTitle"
import TopicData from "./components/topicData"
import { fetchRetainedTopic } from "./actionCreators"
import { loadConfig } from "./config"
import * as reducers from "./reducers"
import { hashToTopic } from "./topic"

async function render() {
  const { wsBrokerUri, httpBrokerUri } = await loadConfig()
  console.log(wsBrokerUri, httpBrokerUri)

  const logger = createLogger()
  const createStoreWithMiddleWare = applyMiddleware(thunk, logger)(createStore)
  const store = createStoreWithMiddleWare(combineReducers(reducers))

  const clientId = `topicBrowser-${Math.random().toString(16).substr(2, 8)}`
  const mqttClient = topping.connect(wsBrokerUri, httpBrokerUri, { clientId })

  mqttClient.on("connect", () => console.log({ wsBrokerUri, clientId }, "Connected with broker"))

  updateTopic()
  window.addEventListener("hashchange", updateTopic)

  function updateTopic() {
    store.dispatch(fetchRetainedTopic(hashToTopic(window.location.hash), mqttClient))
  }

  ReactDOM.render(
    <div>
      <Provider store={ store }>
        <div className="container-fixed">
          <TopicTitle />
          <TopicData mqttClient={ mqttClient } />
        </div>
      </Provider>
    </div>,
    document.getElementById("app")
  )
}

render()
