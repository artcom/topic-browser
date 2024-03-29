import { connect } from "react-redux"
import React from "react"

import TopicLink from "./topicLink"
import { levelsToTopic, topicToLevels } from "../topic"

function TopicTitle({ topic }) {
  return (
    <div className="topic-title-headline">
      { renderTopic(topic) }
    </div>
  )
}

function renderTopic(topic) {
  const root =
    <TopicLink topic="" key="root">
      <div className="icon icon-home" />
    </TopicLink>

  const levels = topicToLevels(topic)

  const links = levels.map((level, i) => {
    const subTopic = levelsToTopic(levels.slice(0, i + 1))
    return <TopicLink topic={ subTopic } key={ subTopic } />
  })

  return [root, " ", ...links]
}

export default connect(
  state => state
)(TopicTitle)
