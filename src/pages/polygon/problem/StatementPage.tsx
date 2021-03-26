import React, { useEffect, useState } from "react";
import { useParams } from "umi";
import ProblemLayout from "./components/ProblemLayout";
import LazyMarkDownEditor from "@/components/Editor/LazyMarkDownEditor";
import LazyExampleEditor from "@/components/Editor/LazyExampleEditor";
import { useScreenWidthWithin } from "@/utils/hooks";
import { Button, Input, message } from "antd";

import api from "@/api";

interface StatementPageParams {
  id: string;
}

const StatementPage: React.FC<{}> = (props) => {
  const params: StatementPageParams = useParams();

  const [description, setDescription] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [note, setNote] = useState("");

  const [exampleInput, setExampleInput] = useState("");
  const [exampleOutput, setExampleOutput] = useState("");

  const [title, setTitle] = useState("");

  const isMobile = useScreenWidthWithin(0, 577);
  const mobileH = "220";
  const DesktopH = "360";

  async function fetchData() {
    const { requestError, response } = await api.problem.getProblem({
      id: parseInt(params.id),
      localizedContentsOfLocale: "en_US",
      localizedContentsTitleOnly: false,
    });

    if (requestError) message.error(requestError);
    else if (response.error) message.error(response.error);
    else {
      setTitle(response.localizedContentsOfLocale.title);
      // setProblemType(response.meta.type);
      // setProblemName(response.localizedContentsOfLocale.title);
      // setProblemStatus(response.meta.isPublic ? "Public" : "Private");
      // setProblemOwner(response.owner.username);
    }

    console.log(response);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function onSubmit() {}

  return (
    <>
      <ProblemLayout current={"statement"}>
        <p>
          <strong>Title</strong>
        </p>
        <div style={{ marginBottom: 20 }}>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <p>
          <strong>Description</strong>
        </p>
        <LazyMarkDownEditor
          height={isMobile ? mobileH : DesktopH}
          language={"markdown"}
          value={description}
          onChange={(value) => setDescription(value)}
        />

        <p>
          <strong>Example 1</strong>
        </p>
        <LazyExampleEditor
          height={isMobile ? mobileH : DesktopH}
          language={"plain"}
          input={exampleInput}
          output={exampleOutput}
          onInputChange={(e) => setExampleInput(e)}
          onOutputChange={(e) => setExampleOutput(e)}
        />

        <p>
          <strong>Input</strong>
        </p>
        <LazyMarkDownEditor
          height={isMobile ? mobileH : DesktopH}
          language={"markdown"}
          value={input}
          onChange={(value) => setInput(value)}
        />

        <p>
          <strong>Output</strong>
        </p>
        <LazyMarkDownEditor
          height={isMobile ? mobileH : DesktopH}
          language={"markdown"}
          value={output}
          onChange={(value) => setOutput(value)}
        />

        <p>
          <strong>Note</strong>
        </p>
        <LazyMarkDownEditor
          height={isMobile ? mobileH : DesktopH}
          language={"markdown"}
          value={note}
          onChange={(value) => setNote(value)}
        />

        <Button type={"primary"} onClick={onSubmit}>
          Submit
        </Button>
      </ProblemLayout>
    </>
  );
};

export default StatementPage;
