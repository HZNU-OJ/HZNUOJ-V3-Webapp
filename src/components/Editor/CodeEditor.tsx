import React, { useRef } from "react";
import MonacoEditor from "react-monaco-editor";
import * as Monaco from "monaco-editor";
import ResizeSensor from "css-element-queries/src/ResizeSensor";

export interface CodeEditorProps {
  width?: string;
  height?: string;
  language?: string;
  value?: string;
  className?: string;
  options?: Monaco.editor.IEditorConstructionOptions;
  editorDidMount?: (editor: Monaco.editor.IStandaloneCodeEditor) => void;
  onChange?: (newValues: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = (props) => {
  const defaultOptions: Monaco.editor.IEditorConstructionOptions = {
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: "line",
    automaticLayout: true,
    multiCursorModifier: "ctrlCmd",
    cursorWidth: 1,
    lineHeight: 20,
    fontSize: 12,
    fontFamily:
      "'Fira Mono', 'Bitstream Vera Sans Mono', 'Menlo', 'Consolas', 'Lucida Console', 'Source Han Sans SC', 'Noto Sans CJK SC', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft Yahei', monospace",
    lineNumbers: "on", // 行号是否显示   on | off
    lineNumbersMinChars: 0,
    folding: true, // 代码折叠
    glyphMargin: false, // 断点
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
    // enableSplitViewResizing: false,
    minimap: { enabled: true }, // 右侧索引小地图
  };

  // const [height, setHeight] = useState("860");
  // const [language, setLanguage] = useState("cpp");
  // const [value, setValue] = useState("");
  // const [theme, setTheme] = useState("vs-light");
  // const [options, setOptions] = useState(defaultOptions);

  // useEffect(() => {
  //   if (props.hasOwnProperty("height")) setHeight(props.height);
  //   if (props.hasOwnProperty("language")) setLanguage(props.language);
  //   if (props.hasOwnProperty("value")) setValue(props.value);
  //   if (props.hasOwnProperty("theme")) setTheme(props.theme);
  //   if (props.hasOwnProperty("options"))
  //     setOptions({ ...defaultOptions, ...props.options });
  // }, [props]);

  const refEditor = useRef<Monaco.editor.IStandaloneCodeEditor>();

  function editorDidMount(editor: Monaco.editor.IStandaloneCodeEditor) {
    editor.getModel().setEOL(Monaco.editor.EndOfLineSequence.LF);

    refEditor.current = editor;
    // console.log("Monaco Editor:", editor);
    if (props.editorDidMount) props.editorDidMount(editor);
  }

  // The Monaco Editor's automaticLayout option doesn't work on a initially hidden editor
  // So use ResizeSensor instead
  const containerRef = useRef<HTMLDivElement>();
  const resizeSensorRef = useRef<ResizeSensor>();
  function initializeResizeSensor(div: HTMLDivElement) {
    if (containerRef.current !== div) {
      if (resizeSensorRef.current) {
        resizeSensorRef.current.detach();
      }
      if (div) {
        resizeSensorRef.current = new ResizeSensor(div, () => {
          if (refEditor.current) refEditor.current.layout();
        });
      } else resizeSensorRef.current = null;
      containerRef.current = div;
    }
  }

  async function onChange(newValue: string) {}

  async function changeEditorValue() {}

  async function changeBySetState() {}

  return (
    <div className={props.className ? props.className : ""}>
      <MonacoEditor
        theme={"vs-light"}
        width={props.width || "100%"}
        height={props.height || "860"}
        language={props.language || "cpp"}
        value={props.value || ""}
        options={{
          ...defaultOptions,
          ...props.options,
        }}
        onChange={props.onChange}
        editorDidMount={editorDidMount}
      />
    </div>
  );
};

export { CodeEditor };
export default CodeEditor;
