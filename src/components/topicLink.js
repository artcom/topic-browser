import React from "react"

import { topicName, topicToHash } from "../topic"

export default function TopicLink({ topic, children }) {
  return <a href={ topicToHash(topic) }>{ children || topicName(topic) }</a>
}
