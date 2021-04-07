import React from "react"
import ReactDOM from "react-dom"
import { createLogger } from "redux-logger"
import { applyMiddleware, createStore, combineReducers } from "redux"
import thunk from "redux-thunk"
import { Provider } from "react-redux"
import { connectAsync, HttpClient } from "@artcom/mqtt-topping"

import TopicTitle from "./components/topicTitle"
import TopicData from "./components/topicData"
import { fetchRetainedTopic } from "./actionCreators"
import { loadConfig } from "./config"
import * as reducers from "./reducers"
import { hashToTopic } from "./topic"

async function render() {
  const { wsBrokerUri, httpBrokerUri, username, password } = await loadConfig()
  console.log(wsBrokerUri, httpBrokerUri)

  const logger = createLogger()
  const createStoreWithMiddleWare = applyMiddleware(thunk, logger)(createStore)
  const store = createStoreWithMiddleWare(combineReducers(reducers))

  const clientOptions = {
    clientId: `topicBrowser-${Math.random().toString(16).substr(2, 8)}`,
    keepalive: 60,
    username,
    password
  }

  const mqttClient = await connectAsync(wsBrokerUri, clientOptions)
  const httpClient = new HttpClient(httpBrokerUri)

  mqttClient.on("connect", () => {
    console.log(wsBrokerUri, clientOptions.clientId, "Connected with broker")
  })

  updateTopic()
  window.addEventListener("hashchange", updateTopic)

  function updateTopic() {
    store.dispatch(fetchRetainedTopic(hashToTopic(window.location.hash), httpClient))
  }

  ReactDOM.render(
    <div>
      <Provider store={ store }>
        <div className="container-fixed">
          <TopicTitle />
          <TopicData
            mqttClient={ mqttClient }
            httpClient={ httpClient } />
        </div>
      </Provider>
    </div>,
    document.getElementById("app")
  )
}

render()
