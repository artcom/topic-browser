import React from "react"
import * as ace from "brace"
import "brace/mode/json"
import "brace/theme/github"

export default class Editor extends React.Component {
  componentDidMount() {
    const editor = ace.edit(this.props.name)
    editor.setTheme("ace/theme/github")
    editor.getSession().setMode("ace/mode/json")
    editor.setValue(this.props.value)
    editor.setAutoScrollEditorIntoView(true)
    editor.setOption("maxLines", 1000)
    editor.setHighlightActiveLine(false)
    editor.setShowPrintMargin(false)
    editor.setFontSize(14)
    editor.setOptions({ fontFamily: "monospace" })
    editor.renderer.setShowGutter(false)

    if (this.props.focus) {
      editor.focus()
    }

    editor.on("change", () => {
      this.props.onChange(editor.getValue())
    })

    const that = this

    if (this.props.onConfirm) {
      editor.commands.addCommand({
        name: "commit",
        bindKey: { win: "Shift-Enter", mac: "Shift-Enter" },
        readOnly: false,
        exec: () => that.props.onConfirm()
      })
    }

    if (this.props.onCancel) {
      editor.commands.addCommand({
        name: "cancel",
        bindKey: { win: "Esc", mac: "Esc" },
        readOnly: false,
        exec: () => that.props.onCancel()
      })
    }
  }

  render() {
    return <div id={ this.props.name } />
  }
}
