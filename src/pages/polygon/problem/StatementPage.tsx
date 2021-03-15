import React, { useState } from "react";
import ProblemLayout from "./components/ProblemLayout";
import LazyMarkDownEditor from "@/components/Editor/LazyMarkDownEditor";
import { useScreenWidthWithin } from "@/utils/hooks";
import { Button } from "antd";

const StatementPage: React.FC<{}> = (props) => {
  const [description, setDescription] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [note, setNote] = useState("");

  const isMobile = useScreenWidthWithin(0, 577);

  const mobileW = "220";
  const DestopW = "360";

  return (
    <>
      <ProblemLayout current={"statement"}>
        <p>
          <strong>Description</strong>
        </p>
        <LazyMarkDownEditor
          height={isMobile ? mobileW : DestopW}
          language={"markdown"}
          value={description}
          onChange={(value) => setDescription(value)}
        />
        <p>
          <strong>Input</strong>
        </p>
        <LazyMarkDownEditor
          height={isMobile ? mobileW : DestopW}
          language={"markdown"}
          value={input}
          onChange={(value) => setInput(value)}
        />
        <p>
          <strong>Output</strong>
        </p>
        <LazyMarkDownEditor
          height={isMobile ? mobileW : DestopW}
          language={"markdown"}
          value={output}
          onChange={(value) => setOutput(value)}
        />
        <p>
          <strong>Note</strong>
        </p>
        <LazyMarkDownEditor
          height={isMobile ? mobileW : DestopW}
          language={"markdown"}
          value={note}
          onChange={(value) => setNote(value)}
        />
        <Button type={"primary"}>Submit</Button>
      </ProblemLayout>
    </>
  );
};

export default StatementPage;
