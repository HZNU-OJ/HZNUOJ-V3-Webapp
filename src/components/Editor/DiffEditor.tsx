import React, { useEffect, useState } from "react";
import { MonacoDiffEditor } from "react-monaco-editor";
import style from "./Editor.common.module.less";

export interface DiffEditorProps {
  height?: string;
  language?: string;
  value?: string;
  original: string;
  theme?: string;
  options?: any;
}

const DiffEditor: React.FC<DiffEditorProps> = (props) => {
  const editor: any = null;
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
    lineNumbersMinChars: 0,
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
    originalEditable: true,
    renderSideBySide: true,
  };

  const [height, setHeight] = useState("860");
  const [language, setLanguage] = useState("cpp");
  const [value, setValue] = useState("");
  const [original, setOriginal] = useState("");
  const [theme, setTheme] = useState("vs-light");
  const [options, setOptions] = useState(defaultOptions);

  useEffect(() => {
    if (props.hasOwnProperty("height")) setHeight(props.height);
    if (props.hasOwnProperty("language")) setLanguage(props.language);
    if (props.hasOwnProperty("value")) setValue(props.value);
    if (props.hasOwnProperty("original")) setOriginal(props.original);
    if (props.hasOwnProperty("theme")) setTheme(props.theme);
    if (props.hasOwnProperty("options"))
      setOptions({ ...defaultOptions, ...props.options });
  }, [props]);

  async function onChange(newValue: string) {}

  async function editorDidMount(editor: any) {
    this.editor = editor;
  }

  async function changeEditorValue() {}

  async function changeBySetState() {}

  return (
    <div className={style["diff-editor"]}>
      <MonacoDiffEditor
        width={"100%"}
        height={height}
        language={language}
        value={value}
        original={original}
        theme={theme}
        onChange={onChange}
        editorDidMount={editorDidMount}
        options={options}
      />
    </div>
  );
};

export { DiffEditor };
export default DiffEditor;
