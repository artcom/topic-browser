import React, { useEffect, useState } from "react"
import AceEditor from "react-ace"

import "ace-builds/src-noconflict/mode-json"
import "ace-builds/src-noconflict/theme-clouds"

export default function Editor(props) {
  const commands = [{
    name: "commit",
    bindKey: { win: "Shift-Enter", mac: "Shift-Enter" },
    readOnly: false,
    exec: () => props.onConfirm()
  },
  {
    name: "cancel",
    bindKey: { win: "Esc", mac: "Esc" },
    readOnly: false,
    exec: () => props.onCancel()
  }]

  const [onMount, setOnMount] = useState(true)
  useEffect(() => setOnMount(false), [])

  return (
    <div className="editor-content" >
      <AceEditor
        name={ props.name }
        mode="json"
        theme="clouds"
        value={ onMount ? props.value : null }
        onChange={ props.onChange }
        width="100%"
        height="100%"
        maxLines={ 1000 }
        fontSize={ 14 }
        setOptions={ { fontFamily: "courier", useWorker: false } }
        showPrintMargin={ false }
        showGutter={ false }
        highlightActiveLine={ false }
        focus={ props.focus }
        commands={ commands } />
    </div>
  )
}
