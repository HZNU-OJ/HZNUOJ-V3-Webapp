import React, { useEffect, useState } from "react";
import { Spin, message } from "antd";
import style from "./SubmitTab.module.less";
import LazyCodeBoxEditor from "@/components/Editor/LazyCodeBoxEditor";
import { useScreenWidthWithin } from "@/utils/hooks";
import { useRecaptcha } from "@/utils/hooks";
import api from "@/api";

interface SubmitTabProps {
  id: number;
}

const SubmitTab: React.FC<SubmitTabProps> = (props) => {
  const [loading, setLoading] = useState(true);

  const [codeValue, setCodeValue] = useState("");

  const isMobile = useScreenWidthWithin(0, 577);

  const recaptcha = useRecaptcha();

  const [submitLoading, setSubmitLoading] = useState(false);
  async function onSubmit() {
    setSubmitLoading(true);

    const { requestError, response } = await api.submission.submit(
      {
        problemId: props.id,
        content: {
          language: "cpp",
          code: codeValue,
          compileAndRunOptions: {
            compiler: "g++",
            std: "c++17",
            O: "2",
            m: "64",
          },
          skipSamples: true,
        },
      },
      recaptcha("SubmitProblem"),
    );

    if (requestError) message.error(requestError);
    else if (response.error) message.error(response.error);
    else {
      message.success("Submit Successfully!");
      setSubmitLoading(false);
    }
  }

  return (
    <div className={style.root}>
      {loading === false && (
        <div className={style.loading}>
          <Spin tip="loading..."></Spin>
        </div>
      )}

      {loading === true && (
        <LazyCodeBoxEditor
          height={isMobile ? "220" : "500"}
          value={codeValue}
          language={"cpp"}
          onSubmit={onSubmit}
          submitButtonLoading={submitLoading}
          onChange={(e) => {
            setCodeValue(e);
          }}
        />
      )}
    </div>
  );
};

export { SubmitTab };
