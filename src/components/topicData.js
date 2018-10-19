import { connect } from "react-redux"
import React from "react"
import omit from "lodash.omit"

import Legend from "./legend"
import Loading from "./loading"
import RetainedTopicData from "./retainedTopicData"
import Error from "./error"

function TopicData(props) {
  if (props.loading) {
    return <Loading />
  }

  if (props.topicData.error) {
    return <Error msg={ props.topicData } />
  } else {
    return (
      <div>
        <div className="row">
          <div className="col-12">
            <RetainedTopicData
              topicData={ props.topicData }
              topicToDelete={ props.topicToDelete }
              topicToCreate={ props.topicToCreate }
              topicToEdit={ props.topicToEdit }
              deleting={ props.deleting }
              publishing={ props.publishing }
              mqttClient={ props.mqttClient }
              dispatch={ props.dispatch } />
          </div>
        </div>
        <Legend />
      </div>
    )
  }
}

export default connect(
  state => Object.assign(omit(state, ["topicData"]), {
    topicData: state.topicData[state.topic]
  })
)(TopicData)
