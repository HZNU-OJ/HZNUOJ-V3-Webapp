import React, { useEffect, useState } from "react";
import LazyMarkdownContent from "@/markdown/LazyMarkdownContent";

import { Skeleton } from "antd";

import api from "@/api";

import { ExampleBox } from "@/components/ExampleBox";

const input = `3
8.19 1.47 3.83 3.91 12.25 2.26 1.71 4.57 7.10 0.14 0.41 3.77 3.34 7.06 7.26 2.89 0.09 6.85 6.36 9.41 2.58 1.09 1.59 0.21 1.58 0.08
Thisisaexample
8.19 1.47 3.83 3.91 12.25 2.26 1.71 4.57 7.10 0.14 0.41 3.77 3.34 7.06 7.26 2.89 0.09 6.85 6.36 9.41 2.58 1.09 1.59 0.21 1.58 0.08
AertrtsaBereDET
8.19 1.47 3.83 3.91 12.25 2.26 1.71 4.57 7.10 0.14 0.41 3.77 3.34 7.06 7.26 2.89 0.09 6.85 6.36 9.41 2.58 1.09 1.59 0.21 1.58 0.08
Thequickbrownfoxjumpsoverthelazydog`;

const output = `case #0:
eeTaaiisshlmpx
case #1:
eeeEttTaArrrsDB
case #2:
eeetTaooooinrrshhdclmpuufgwybvkxjqz`;

interface AmazeUIDetailsProps {
  hide?: boolean;
  title?: string;
}

const AmazeUIDetails: React.FC<AmazeUIDetailsProps> = (props) => {
  const [hide, setHide] = useState(false);

  return (
    <div className="am-panel am-panel-primary" style={{ fontSize: 15 }}>
      <div
        className="am-panel-hd"
        style={{ padding: "2px 5px", fontSize: 16, cursor: "pointer" }}
        onClick={() => {
          setHide((hide: boolean) => !hide);
        }}
      >
        {props.title}
      </div>
      <div
        className="am-panel-bd"
        style={{ padding: "10px", display: hide ? "none" : "" }}
      >
        {props.children}
      </div>
    </div>
  );
};

const StatementTab: React.FC<{}> = (props) => {
  const [contentA, setContentA] = useState("");
  const [contentB, setContentB] = useState("");
  const [loadingA, setLoadingA] = useState(true);
  const [loadingB, setLoadingB] = useState(true);

  async function getContentA() {
    const { requestError, response } = await api.app.getMd({ id: "a" });

    setContentA(response.content);
    setLoadingA(false);
  }

  async function getContentB() {
    const { requestError, response } = await api.app.getMd({ id: "b" });

    setContentB(response.content);
    setLoadingB(false);
  }

  // getContentA();

  useEffect(() => {
    getContentA();
    getContentB();
  }, []);

  // setTimeout(() => {
  //   getContentB();
  // }, 2000);

  return (
    <>
      <Skeleton title={true} loading={false} active>
        <AmazeUIDetails title="Description">
          <LazyMarkdownContent
            content={contentA}
            noSanitize={true}
            loading={loadingA}
          />
        </AmazeUIDetails>

        <AmazeUIDetails title="Input">
          <LazyMarkdownContent
            content={contentB}
            noSanitize={true}
            loading={loadingB}
          />
        </AmazeUIDetails>

        <AmazeUIDetails title="Output"></AmazeUIDetails>

        {/* <AmazeUIDetails title="Example"> */}
        <ExampleBox input={input} output={output} />
        <ExampleBox input={input} output={output} />
        {/* </AmazeUIDetails> */}

        <AmazeUIDetails title="Note"></AmazeUIDetails>
      </Skeleton>
    </>
  );
};

export { StatementTab };
