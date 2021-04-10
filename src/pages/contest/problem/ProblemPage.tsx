import React, { useEffect, useState, useContext } from "react";
import { useParams } from "umi";
import { Row, Col, Affix, message, Breadcrumb, Menu } from "antd";
import SiderMenu from "@/components/SiderMenu";
import Divider from "@/components/Divider";
import { useScreenWidthWithin } from "@/utils/hooks";
import Loading from "@/components/Loading";
import { ContestContext } from "@/pages/contest/layouts/ContestLayout";
import style from "./ProblemPage.module.less";
import ProblemViewStyle from "@/pages/problem/view/ProblemViewPage.module.less";
import {
  mappingOrderIdToAlphaId,
  getProblemByAlphaId,
} from "@/pages/contest/utils";
import SubmissionsInContestTable from "@/pages/contest/components/SubmissionsInContestTable";

import {
  ProblemViewHeader,
  StatementTab,
} from "@/pages/problem/view/components";

import { SubmitTab } from "./components/SubmitTab";

import { menuItem } from "@/interface/Menu.interface";

import { useUrlQuery } from "@/utils/hooks";

import api from "@/api";
import { ProblemSolvedStatus } from "@/components/ProblemSolvedStatus";

interface ProblemViewPageParams {
  id: string;
  pid: string;
}

const ProblemPage: React.FC<{}> = (props) => {
  const params: ProblemViewPageParams = useParams();

  const contest = useContext(ContestContext);

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

  const [breadCrumbMenuList, setBreadCrumbMenuList] = useState(
    null as JSX.Element,
  );

  const [problemSolvedStatus, setProblemSolvedStatus] = useState(
    ProblemSolvedStatus.unSubmit,
  );
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
      id: getProblemByAlphaId(contest, params.pid).problemId,
      contestId: parseInt(params.id),
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
      const problemMeta = getProblemByAlphaId(contest, params.pid);
      setProblemSolvedStatus(
        problemMeta.submission
          ? problemMeta.submission.status === "Accepted"
            ? ProblemSolvedStatus.solved
            : ProblemSolvedStatus.unSolved
          : ProblemSolvedStatus.unSubmit,
      );
      setTitle(response.localizedContentsOfLocale.title);
      setType(response.meta.type);
      setSubmissionCount(
        getProblemByAlphaId(contest, params.pid).submissionCount,
      );
      setAcceptedSubmissionCount(
        getProblemByAlphaId(contest, params.pid).acceptedSubmissionCount,
      );
      setContentSections(response.localizedContentsOfLocale.contentSections);
      setSamples(response.samples);
      setTimeLimit(response.judgeInfo?.timeLimit);
      setMemoryLimit(response.judgeInfo?.memoryLimit);
      setLastSubmissionContent(response.lastSubmission.lastSubmissionContent);
      setBreadCrumbMenuList(
        <Menu>
          {contest.problemMetas.map((problem, index) => (
            <Menu.Item key={index}>
              <a
                rel="noopener noreferrer"
                href={`/contest/${params.id}/problem/${mappingOrderIdToAlphaId(
                  problem.orderId,
                )}`}
              >
                {`${mappingOrderIdToAlphaId(problem.orderId)}. ${
                  problem.title
                }`}
              </a>
            </Menu.Item>
          ))}
        </Menu>,
      );
      setFetchDataLoaded(true);
    }
  }

  useEffect(() => {
    if (contest) {
      fetchData();
    }
  }, [contest]);

  return (
    <>
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
                <Breadcrumb.Item overlay={breadCrumbMenuList}>
                  {`${params.pid}. ${title}`}
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <ProblemViewHeader
              isNotNumericId={true}
              id={params.pid}
              title={title}
              type={type}
              submissionCount={submissionCount}
              acceptedSubmissionCount={acceptedSubmissionCount}
              timeLimit={timeLimit}
              memoryLimit={memoryLimit}
              problemSolvedStatus={problemSolvedStatus}
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
                      contestId={parseInt(params.id)}
                      problemId={
                        getProblemByAlphaId(contest, params.pid).problemId
                      }
                      lastSubmissionContent={lastSubmissionContent}
                    />
                  )}
                  {urlQuery.tab === "submissions" && (
                    <SubmissionsInContestTable
                      contestId={parseInt(params.id)}
                      problemId={
                        getProblemByAlphaId(contest, params.pid).problemId
                      }
                    />
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
    </>
  );
};

export default ProblemPage;
