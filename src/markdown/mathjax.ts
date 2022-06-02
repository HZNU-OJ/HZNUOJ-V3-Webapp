import { Tex2SVG } from "mathjax-render";
import { mathJaxStyle } from "./MarkdownContent";

export function renderMath(math: string, display: boolean) {
  const nodeClassNameList = [
    mathJaxStyle.MathJax,
    display ? mathJaxStyle.block : mathJaxStyle.inline,
  ];

  return Tex2SVG(math, display, {
    nodeClassNameList,
  });
}
