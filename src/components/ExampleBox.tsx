import React from "react";
import style from "./ExampleBox.module.less";

interface ExampleBoxProps {
  input?: string;
  output?: string;
}

const ExampleBox: React.FC<ExampleBoxProps> = (props) => {
  return (
    <div className={style.exampleRoot}>
      <div className={style.input}>
        <div className={style.title}>
          input
          <div className={style.copyBtn}>Copy</div>
        </div>
        <pre>{props.input}</pre>
      </div>
      <div className={style.output}>
        <div className={style.title}>
          output
          <div className={style.copyBtn}>Copy</div>
        </div>
        <pre>{props.output}</pre>
      </div>
    </div>
  );
};

export default ExampleBox;
