export function hashToTopic(path) {
  return decodeURI(path.slice(1))
}

export function topicToHash(topic) {
  return `#${encodeURI(topic)}`
}

export function topicName(topic) {
  return topicToLevels(topic).pop()
}

export function topicToLevels(topic) {
  return topic.split("/").reduce((levels, level) => {
    if (levels.length === 0) {
      return [level]
    } else if (levels.length === 1 && levels[0] === "") {
      return [`/${level}`]
    } else {
      return [...levels, `/${level}`]
    }
  }, [])
}

export function levelsToTopic(levels) {
  return levels.join("")
}
