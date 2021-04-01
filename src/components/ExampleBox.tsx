import React from "react";
import style from "./ExampleBox.module.less";
import copyToClipboard from "@/utils/copyToClipboard";
import downloadFile from "@/utils/downloadFile";
import { message, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

import api from "@/api";

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

async function downloadProblemFile(problemId: number, filename: string) {
  if (!filename) return message.error("NO_SUCH_FILE");

  const { requestError, response } = await api.problem.downloadProblemFiles({
    problemId: problemId,
    type: "TestData",
    filenameList: [filename],
  });

  if (requestError) {
    return message.error(requestError);
  } else if (response.downloadInfo.length === 0) {
    return message.error("NO_SUCH_FILE");
  }

  downloadFile(response.downloadInfo[0].downloadUrl);
}

interface DownloadBtnProps {
  problemId: number;
  filename: string;
}

const DownloadBtn: React.FC<DownloadBtnProps> = (props) => {
  return (
    <div
      className={style.downloadBtn}
      onClick={() => {
        downloadProblemFile(props.problemId, props.filename);
      }}
    >
      Download
    </div>
  );
};

interface ExampleDiffBoxProps {
  meta: ApiTypes.SubmissionMetaDto;
  testcaseResult: any;
}

const ExampleDiffBox: React.FC<ExampleDiffBoxProps> = (props) => {
  return (
    <div className={style.exampleRoot}>
      {props.testcaseResult.input && (
        <div className={style.input}>
          <div className={style.title}>
            <>
              input
              {props.testcaseResult?.input?.omittedLength && (
                <Tooltip
                  title={`${props.testcaseResult?.input?.omittedLength} bytes omitted`}
                >
                  <InfoCircleOutlined
                    style={{ marginLeft: "5px", fontSize: "14px" }}
                  />
                </Tooltip>
              )}
            </>
            <DownloadBtn
              problemId={props.meta.problem.id}
              filename={props.testcaseResult.testcaseInfo.inputFile}
            />
          </div>
          <pre>
            {props.testcaseResult?.input.data ??
              props.testcaseResult?.input ??
              ""}
          </pre>
        </div>
      )}

      {props.testcaseResult?.output && (
        <div className={style.output}>
          <div className={style.title}>
            output
            {props.testcaseResult?.output?.omittedLength && (
              <Tooltip
                title={`${props.testcaseResult?.output?.omittedLength} bytes omitted`}
              >
                <InfoCircleOutlined
                  style={{ marginLeft: "5px", fontSize: "14px" }}
                />
              </Tooltip>
            )}
            <DownloadBtn
              problemId={props.meta.problem.id}
              filename={props.testcaseResult.testcaseInfo.outputFile}
            />
          </div>
          <pre>
            {props.testcaseResult?.output.data ??
              props.testcaseResult?.output ??
              ""}
          </pre>
        </div>
      )}

      {props.testcaseResult?.userOutput && (
        <div className={style.yourOutput}>
          <div className={style.title}>
            Your output
            {props.testcaseResult?.userOutput?.omittedLength && (
              <Tooltip
                title={`${props.testcaseResult?.userOutput?.omittedLength} bytes omitted`}
              >
                <InfoCircleOutlined
                  style={{ marginLeft: "5px", fontSize: "14px" }}
                />
              </Tooltip>
            )}
          </div>
          <pre>{props.testcaseResult.userOutput}</pre>
        </div>
      )}

      {props.testcaseResult?.checkerMessage && (
        <div className={style.checkerMessage}>
          <div className={style.title}>Checker message</div>
          <pre>{props.testcaseResult?.checkerMessage}</pre>
        </div>
      )}
    </div>
  );
};

export { ExampleDiffBox };
