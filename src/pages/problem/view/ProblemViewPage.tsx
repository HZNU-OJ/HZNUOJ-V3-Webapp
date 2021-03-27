import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "umi";
import { Row, Col, Affix, message } from "antd";

import BasicLayout from "@/layouts/BasicLayout";
import style from "./ProblemViewPage.module.less";
import SiderMenu from "@/components/SiderMenu";
import Divider from "@/components/Divider";
import { useScreenWidthWithin } from "@/utils/hooks";
import Loading from "@/components/Loading";

import {
  ProblemViewHeader,
  StatementTab,
  SubmitTab,
  SubmissionsTab,
  StatisticsTab,
} from "./components";

import { menuItem } from "@/interface/Menu.interface";

import api from "@/api";
interface ProblemViewPageParams {
  id: string;
}

const ProblemViewPage: React.FC<{}> = (props) => {
  const params: ProblemViewPageParams = useParams();
  const location = useLocation();
  const [tab, setTab] = useState(location?.query?.tab ?? "statement");
  const pathname = location.pathname;

  const [fetchDataLoaded, setFetchDataLoaded] = useState(false);
  const isMobile = useScreenWidthWithin(0, 992);

  const SiderMenuItemList: menuItem[] = [
    {
      id: "statement",
      name: "Statement",
      link: `${pathname}?tab=statement`,
    },
    {
      id: "submit",
      name: "Submit",
      link: `${pathname}?tab=submit`,
    },
    {
      id: "submissions",
      name: "Submissions",
      link: `${pathname}?tab=submissions`,
    },
    // {
    //   id: "statistics",
    //   name: "Statistics",
    //   link: `${pathname}?tab=statistics`,
    // },
  ];

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [submissionCount, setSubmissionCount] = useState(0);
  const [acceptedSubmissionCount, setAcceptedSubmissionCount] = useState(0);
  const [contentSections, setContentSections] = useState(
    [] as ApiTypes.ProblemContentSectionDto[],
  );
  const [samples, setSamples] = useState(
    [] as ApiTypes.ProblemSampleDataMemberDto[],
  );
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
      console.log(response);
      setTitle(response.localizedContentsOfLocale.title);
      setType(response.meta.type);
      setSubmissionCount(response.meta.submissionCount);
      setAcceptedSubmissionCount(response.meta.acceptedSubmissionCount);
      setContentSections(response.localizedContentsOfLocale.contentSections);
      setSamples(response.samples);
      setFetchDataLoaded(true);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setTab(location?.query?.tab ?? "statement");
  });

  return (
    <>
      <BasicLayout current={"problem_set"}>
        <div className={style.root}>
          {!fetchDataLoaded && (
            <div className={style.loading}>
              <Loading />
            </div>
          )}

          {fetchDataLoaded && (
            <>
              <ProblemViewHeader
                id={params.id}
                title={title}
                type={type}
                submissionCount={submissionCount}
                acceptedSubmissionCount={acceptedSubmissionCount}
              />
              <Divider />
              <Row gutter={16} align="top">
                <Col
                  xs={{ span: 24, order: 2 }}
                  sm={{ span: 24, order: 2 }}
                  md={{ span: 24, order: 2 }}
                  lg={{ span: 21, order: 1 }}
                  xl={{ span: 21, order: 1 }}
                >
                  <>
                    {tab === "statement" && (
                      <StatementTab
                        contentSections={contentSections}
                        samples={samples}
                      />
                    )}
                    {tab === "submit" && <SubmitTab />}
                    {tab === "submissions" && <SubmissionsTab />}
                    {/* {tab === "statistics" && <StatisticsTab />} */}
                  </>
                </Col>

                <Col
                  xs={{ span: 24, order: 1 }}
                  sm={{ span: 24, order: 1 }}
                  md={{ span: 24, order: 1 }}
                  lg={{ span: 3, order: 2 }}
                  xl={{ span: 3, order: 2 }}
                >
                  {isMobile && (
                    <SiderMenu
                      current={tab}
                      menuItemList={SiderMenuItemList}
                      direction={"right"}
                    />
                  )}

                  {!isMobile && (
                    <Affix offsetTop={10}>
                      <SiderMenu
                        current={tab}
                        menuItemList={SiderMenuItemList}
                        direction={"right"}
                      />
                    </Affix>
                  )}
                </Col>
              </Row>
            </>
          )}
        </div>
      </BasicLayout>
    </>
  );
};

export default ProblemViewPage;
