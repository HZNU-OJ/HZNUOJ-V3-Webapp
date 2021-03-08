import React, { useState } from "react";
import MonacoEditor from "react-monaco-editor";
import style from "./CodeEditor.less";

interface CodeEditorProps {}

const CodeEditor: React.FC<CodeEditorProps> = (props) => {
  const editor = null;
  const defaultOptions: any = {
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: "line",
    automaticLayout: true,
    multicursorModifier: "ctrlCmd",
    cursorWidth: 1,
    lineHeight: 20,
    fontSize: 12,
    fontFamily:
      "'Fira Mono', 'Bitstream Vera Sans Mono', 'Menlo', 'Consolas', 'Lucida Console', 'Source Han Sans SC', 'Noto Sans CJK SC', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft Yahei', monospace",
    lineNumbersMinChars: 4,
    glyphMargin: false,
    renderFinalNewline: true,
    scrollbar: {
      useShadows: false,
      verticalScrollbarSize: 0,
      horizontalScrollbarSize: 2,
      vertical: "hidden",
    },
    overviewRulerBorder: false,
    hideCursorInOverviewRuler: true,
    contextmenu: false,
    enableSplitViewResizing: false,
  };

  const [height, setHeight] = useState(860);
  const [language, setLanguage] = useState("cpp");
  const [value, setValue] = useState("");
  const [theme, setTheme] = useState("vs-light");
  const [options, setOptions] = useState(defaultOptions);

  async function onChange(newValue: string) {}

  async function editorDidMount(editor: any) {
    this.editor = editor;
  }

  async function changeEditorValue() {}

  async function changeBySetState() {}

  return (
    <div className={style["code-editor"]}>
      <MonacoEditor
        width={"100%"}
        height={height}
        language={language}
        value={value}
        options={options}
        onChange={onChange}
        editorDidMount={editorDidMount}
        theme={theme}
      />
    </div>
  );
};

export { CodeEditor };
