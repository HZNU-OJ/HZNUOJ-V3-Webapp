import React, { useEffect, useState } from "react";
import { useParams } from "umi";
import { Row, Col, Affix, message, Breadcrumb, Menu } from "antd";
import ContestLayout from "../layouts/ContestLayout";
import SiderMenu from "@/components/SiderMenu";
import Divider from "@/components/Divider";
import { useScreenWidthWithin } from "@/utils/hooks";
import Loading from "@/components/Loading";

import style from "./ProblemPage.module.less";
import ProblemViewStyle from "@/pages/problem/view/ProblemViewPage.module.less";

import {
  ProblemViewHeader,
  StatementTab,
  SubmitTab,
  SubmissionsTab,
  StatisticsTab,
} from "@/pages/problem/view/components";

import { menuItem } from "@/interface/Menu.interface";

import { useUrlQuery } from "@/utils/hooks";

import api from "@/api";

interface ProblemViewPageParams {
  id: string;
  pid: string;
}

const ProblemPage: React.FC<{}> = (props) => {
  const params: ProblemViewPageParams = useParams();

  const [urlQuery, setUrlQuery] = useUrlQuery({
    tab: "statement",
  });

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
  const [timeLimit, setTimeLimit] = useState(0);
  const [memoryLimit, setMemoryLimit] = useState(0);
  const [lastSubmissionContent, setLastSubmissionContent] = useState({});
  async function fetchData() {
    const { requestError, response } = await api.problem.getProblem({
      id: parseInt(params.pid),
      localizedContentsOfLocale: "en_US",
      localizedContentsTitleOnly: false,
      samples: true,
      judgeInfo: true,
      statistics: true,
      lastSubmissionAndLastAcceptedSubmission: true,
    });

    if (requestError) message.error(requestError);
    else if (response.error) message.error(response.error);
    else {
      setTitle(response.localizedContentsOfLocale.title);
      setType(response.meta.type);
      setSubmissionCount(response.meta.submissionCount);
      setAcceptedSubmissionCount(response.meta.acceptedSubmissionCount);
      setContentSections(response.localizedContentsOfLocale.contentSections);
      setSamples(response.samples);
      setTimeLimit(response.judgeInfo?.timeLimit);
      setMemoryLimit(response.judgeInfo?.memoryLimit);
      setLastSubmissionContent(response.lastSubmission.lastSubmissionContent);
      setFetchDataLoaded(true);
    }
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.alipay.com/"
        >
          General
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.taobao.com/"
        >
          Layout
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.tmall.com/"
        >
          Navigation
        </a>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <ContestLayout current={"dashboard"} disableHeader={true}>
        <div className={style.root}>
          {!fetchDataLoaded && (
            <div className={ProblemViewStyle.loading}>
              <Loading />
            </div>
          )}

          {fetchDataLoaded && (
            <>
              <div className={style.breadCrumb}>
                <Breadcrumb separator=">">
                  <Breadcrumb.Item href={`/contest/${params.id}`}>
                    Dashboard
                  </Breadcrumb.Item>
                  <Breadcrumb.Item overlay={menu}>
                    #1. A + B Problem
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <ProblemViewHeader
                id={params.pid}
                title={title}
                type={type}
                submissionCount={submissionCount}
                acceptedSubmissionCount={acceptedSubmissionCount}
                timeLimit={timeLimit}
                memoryLimit={memoryLimit}
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
                    {urlQuery.tab === "statement" && (
                      <StatementTab
                        contentSections={contentSections}
                        samples={samples}
                      />
                    )}
                    {urlQuery.tab === "submit" && (
                      <SubmitTab
                        id={parseInt(params.id)}
                        lastSubmissionContent={lastSubmissionContent}
                      />
                    )}
                    {urlQuery.tab === "submissions" && (
                      <SubmissionsTab id={parseInt(params.pid)} />
                    )}
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
                      current={urlQuery.tab}
                      menuItemList={SiderMenuItemList}
                      direction={"right"}
                    />
                  )}

                  {!isMobile && (
                    <Affix offsetTop={10}>
                      <SiderMenu
                        current={urlQuery.tab}
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
      </ContestLayout>
    </>
  );
};

export default ProblemPage;
