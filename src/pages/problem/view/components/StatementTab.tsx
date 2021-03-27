import React, { useState } from "react";
import { ExampleBox } from "@/components/ExampleBox";
import LazyMarkdownContent from "@/markdown/LazyMarkdownContent";

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
        <div
          style={{
            marginBottom: -20,
          }}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
};

interface StatementTabProps {
  contentSections: ApiTypes.ProblemContentSectionDto[];
  samples: ApiTypes.ProblemSampleDataMemberDto[];
}

const StatementTab: React.FC<StatementTabProps> = (props) => {
  return (
    <>
      {props.contentSections.map((contentSection, index: number) => {
        if (contentSection.type === "Text") {
          return (
            <div key={index}>
              <AmazeUIDetails title={contentSection.sectionTitle}>
                <LazyMarkdownContent
                  content={contentSection.text}
                  noSanitize={true}
                />
              </AmazeUIDetails>
            </div>
          );
        } else if (contentSection.type === "Sample") {
          return (
            <div key={index}>
              <ExampleBox
                input={props.samples[contentSection.sampleId].inputData}
                output={props.samples[contentSection.sampleId].outputData}
              />
            </div>
          );
        }
      })}
    </>
  );
};

export { StatementTab };
