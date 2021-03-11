import React from "react";
import style from "./ExampleBox.module.less";
import copyToClipboard from "@/utils/copyToClipboard";
import downloadFile from "@/utils/downloadFile";
import { message, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const url =
  "https://wi-ki.top/attachments/article/4/9e1168e0-c1f9-11ea-80b5-174c378018d1/ZoomOut_ZH-CN4471982075_1920x1080.jpg";
// const url = "https://cdn.jsdelivr.net/npm/mathjax@3.0.5/es5/output/chtml/fonts/woff-v2/MathJax_SansSerif-Italic.woff";

interface CopyBtnProps {
  text: string;
}

const CopyBtn: React.FC<CopyBtnProps> = (props) => {
  const copyAction = async (text: string) => {
    await copyToClipboard(text);
    message.success("Copied!");
  };
  return (
    <div
      className={style.copyBtn}
      onClick={() => {
        copyAction(props.text);
      }}
    >
      Copy
    </div>
  );
};

interface ExampleBoxProps {
  input: string;
  output: string;
}

const ExampleBox: React.FC<ExampleBoxProps> = (props) => {
  return (
    <div className={style.exampleRoot}>
      <div className={style.input}>
        <div className={style.title}>
          input
          <CopyBtn text={props.input} />
        </div>
        <pre>{props.input}</pre>
      </div>
      <div className={style.output}>
        <div className={style.title}>
          output
          <CopyBtn text={props.output} />
        </div>
        <pre>{props.output}</pre>
      </div>
    </div>
  );
};

export { ExampleBox };

interface DownloadBtnProps {
  url: string;
}

const DownloadBtn: React.FC<DownloadBtnProps> = (props) => {
  const downloadAction = async (url: string) => {
    downloadFile(url);
  };
  return (
    <div
      className={style.downloadBtn}
      onClick={() => {
        downloadAction(props.url);
      }}
    >
      Download
    </div>
  );
};

interface ExampleDiffBoxProps {
  input: string;
  output: string;
  yourOutput: string;
  checkerMessage: string;
}

const ExampleDiffBox: React.FC<ExampleDiffBoxProps> = (props) => {
  return (
    <div className={style.exampleRoot}>
      <div className={style.input}>
        <div className={style.title}>
          <>
            input
            <Tooltip title="6194541 bytes omitted">
              <InfoCircleOutlined
                style={{ marginLeft: "5px", fontSize: "14px" }}
              />
            </Tooltip>
          </>
          <DownloadBtn url={url} />
        </div>
        <pre>{props.input}</pre>
      </div>

      <div className={style.output}>
        <div className={style.title}>
          output
          <DownloadBtn url={url} />
        </div>
        <pre>{props.output}</pre>
      </div>

      <div className={style.yourOutput}>
        <div className={style.title}>
          Your output
          <DownloadBtn url={url} />
        </div>
        <pre>{props.yourOutput}</pre>
      </div>

      <div className={style.checkerMessage}>
        <div className={style.title}>
          Checker message
          <DownloadBtn url={url} />
        </div>
        <pre>{props.checkerMessage}</pre>
      </div>
    </div>
  );
};

export { ExampleDiffBox };
