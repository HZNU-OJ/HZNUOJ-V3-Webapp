import React, { useEffect, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import style from "./CodeEditor.less";

export interface CodeEditorProps {
  height?: string;
  language?: string;
  value?: string;
  theme?: string;
  options?: any;
}

const CodeEditor: React.FC<CodeEditorProps> = (props) => {
  let editor: any = null;
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

  const [height, setHeight] = useState("860");
  const [language, setLanguage] = useState("cpp");
  const [value, setValue] = useState("");
  const [theme, setTheme] = useState("vs-light");
  const [options, setOptions] = useState(defaultOptions);

  useEffect(() => {
    if (props.hasOwnProperty("height")) setHeight(props.height);
    if (props.hasOwnProperty("language")) setLanguage(props.language);
    if (props.hasOwnProperty("value")) setValue(props.value);
    if (props.hasOwnProperty("theme")) setTheme(props.theme);
    if (props.hasOwnProperty("options"))
      setOptions({ ...defaultOptions, ...props.options });
  }, [props]);

  async function onChange(newValue: string) {}

  async function editorDidMount(_editor: any) {
    editor = _editor;
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
export default CodeEditor;
