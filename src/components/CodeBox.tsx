import React from "react";
import style from "./CodeBox.module.less";

import { highlight } from "@/utils/CodeHighlighter";
interface CodeBoxProps {
  language: string;
  code: string;
}

const CodeBox: React.FC<CodeBoxProps> = (props) => {
  return (
    <div className={`${style.codeBoxSegment} ${style.codeBoxPre}`}>
      <pre className={`${style.codeBoxContent}`}>
        <div
          className={`language-${props.language}`}
          dangerouslySetInnerHTML={{
            __html: highlight(props.code, props.language),
          }}
        ></div>
      </pre>
    </div>
  );
};

export { CodeBox };

export const codeBoxStyle = {
  segment: style.codeBoxSegment,
  content: style.codeBoxContent,
  pre: style.codeBoxPre,
};
