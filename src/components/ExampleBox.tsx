import React from "react";
import style from "./ExampleBox.module.less";
import copyToClipboard from "@/utils/copyToClipboard";
import { message } from "antd";

interface ExampleBoxProps {
  input?: string;
  output?: string;
}

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

export default ExampleBox;
