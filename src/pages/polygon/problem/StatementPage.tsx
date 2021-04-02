import React, { useEffect, useState } from "react";
import { useParams } from "umi";
import ProblemLayout from "./components/ProblemLayout";
import LazyMarkDownEditor from "@/components/Editor/LazyMarkDownEditor";
import LazyExampleEditor from "@/components/Editor/LazyExampleEditor";
import { useScreenWidthWithin } from "@/utils/hooks";
import { Button, Input, message, Space, Skeleton } from "antd";

import AddSectionModel from "./components/AddSectionModel";

import { PlusOutlined, MenuOutlined } from "@ant-design/icons";
import EditorWrapper from "./components/EditorWrapper";

import api from "@/api";
import { deepCopy } from "@/utils";

interface StatementPageParams {
  id: string;
}

const StatementPage: React.FC<{}> = (props) => {
  const params: StatementPageParams = useParams();

  const isMobile = useScreenWidthWithin(0, 577);
  const mobileH = "220";
  const DesktopH = "320";

  const [title, setTitle] = useState("");
  const [contentSections, setContentSections] = useState(
    [] as ApiTypes.ProblemContentSectionDto[],
  );
  const [samples, setSamples] = useState(
    [] as ApiTypes.ProblemSampleDataMemberDto[],
  );
  const [orderIdList, setOrderIdList] = useState([] as number[]);
  const [addSectionVisible, setAddSectionVisible] = useState(false);

  const [fetchLoaded, setFetchLoaded] = useState(false);
  async function fetchData() {
    const { requestError, response } = await api.problem.getProblem({
      id: parseInt(params.id),
      localizedContentsOfLocale: "en_US",
      localizedContentsTitleOnly: false,
      samples: true,
    });

    if (requestError) message.error(requestError);
    else if (response.error) message.error(response.error);
    else {
      setTitle(response.localizedContentsOfLocale.title);
      setContentSections(response.localizedContentsOfLocale.contentSections);
      setSamples(response.samples);
      setOrderIdList([
        ...new Array(
          response.localizedContentsOfLocale.contentSections.length,
        ).keys(),
      ]);
    }

    setFetchLoaded(true);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const [updateLoading, setUpdateLoading] = useState(false);
  async function onUpdate() {
    setUpdateLoading(true);
    let _contentSections = [] as ApiTypes.ProblemContentSectionDto[];
    let _samples = [] as ApiTypes.ProblemSampleDataMemberDto[];

    contentSections.forEach((item, index) => {
      if (orderIdList.includes(index)) {
        let _item = deepCopy(item);
        if (item.type === "Sample") {
          _samples.push(samples[_item.sampleId]);
          _item.sampleId = _samples.length - 1;
        }
        _contentSections.push(_item);
      }
    });

    // console.log(_contentSections);
    // console.log(_samples);
    // return;

    const { requestError, response } = await api.problem.updateStatement({
      problemId: parseInt(params.id),
      localizedContents: [
        {
          locale: "en_US",
          title: title,
          contentSections: _contentSections,
        },
      ],
      samples: _samples,
      problemTagIds: [],
    });

    if (requestError) message.error(requestError);
    else if (response.error) message.error(response.error);
    else {
      message.success("Update Statement Sucessfully!");
    }

    setUpdateLoading(false);
  }

  function getOnDeleteFunc(index: number) {
    return () => {
      setOrderIdList([
        ...orderIdList.slice(0, index),
        ...orderIdList.slice(index + 1),
      ]);
    };
  }

  function getOnEditOk(index: number) {
    return (sectionName: string) => {
      let _contentSections: ApiTypes.ProblemContentSectionDto[] = deepCopy(
        contentSections,
      );
      _contentSections[orderIdList[index]].sectionTitle = sectionName;
      setContentSections(_contentSections);
    };
  }

  return (
    <>
      <ProblemLayout current={"statement"}>
        <Skeleton
          loading={!fetchLoaded}
          active
          title={true}
          paragraph={{ rows: 8 }}
        >
          <Space size={"middle"} style={{ marginBottom: 10 }}>
            <Button
              type="primary"
              size={"middle"}
              loading={updateLoading}
              onClick={onUpdate}
            >
              Update
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size={"middle"}
              onClick={() => {
                setAddSectionVisible(true);
              }}
            >
              Add Section
            </Button>
            <Button
              type="primary"
              icon={<MenuOutlined />}
              size={"middle"}
              onClick={() => {
                message.info("Coming Soon!");
              }}
            >
              Change Order
            </Button>
          </Space>

          <h2>Title</h2>
          <div style={{ marginBottom: 20 }}>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div>
            {orderIdList.map((orderId, index) => (
              <div key={orderId}>
                <EditorWrapper
                  title={contentSections[orderId].sectionTitle}
                  sectionName={contentSections[orderIdList[index]].sectionTitle}
                  onEditOk={getOnEditOk(index)}
                  onDelete={getOnDeleteFunc(index)}
                >
                  {contentSections[orderId].type === "Text" && (
                    <LazyMarkDownEditor
                      height={isMobile ? mobileH : DesktopH}
                      language={"markdown"}
                      value={contentSections[orderId].text}
                      onChange={(value) => {
                        let _contentSections = deepCopy(contentSections);
                        _contentSections[orderId].text = value;
                        setContentSections(_contentSections);
                      }}
                    />
                  )}
                  {contentSections[orderId].type === "Sample" && (
                    <LazyExampleEditor
                      height={isMobile ? mobileH : DesktopH}
                      language={"plain"}
                      input={
                        samples[contentSections[orderId].sampleId].inputData
                      }
                      output={
                        samples[contentSections[orderId].sampleId].outputData
                      }
                      onInputChange={(value) => {
                        let _samples = deepCopy(samples);
                        _samples[
                          contentSections[orderId].sampleId
                        ].inputData = value;
                        setSamples(_samples);
                      }}
                      onOutputChange={(value) => {
                        let _samples = deepCopy(samples);
                        _samples[
                          contentSections[orderId].sampleId
                        ].outputData = value;
                        setSamples(_samples);
                      }}
                    />
                  )}
                </EditorWrapper>
              </div>
            ))}
          </div>
        </Skeleton>
      </ProblemLayout>
      <AddSectionModel
        visible={addSectionVisible}
        onCancel={() => setAddSectionVisible(false)}
        contentSections={contentSections}
        setContentSections={setContentSections}
        samples={samples}
        setSamples={setSamples}
        orderIdList={orderIdList}
        setOrderIdList={setOrderIdList}
      />
    </>
  );
};

export default StatementPage;
