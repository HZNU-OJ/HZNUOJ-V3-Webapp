import React, { useState, useEffect } from "react";
import { message, Table, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import BasicLayout from "@/layouts/BasicLayout";

import { formatUnixTimeStamp } from "@/utils/formatDateTime";

import { useTableFilter, useTableSearch } from "@/utils/hooks";
import FormatTableDate from "@/components/FormatTableDate";
import styles from "./SubmissionsPage.module.less";
import AntTableHeadStyles from "@/less/AntTableHead.module.less";
import { isValidUsername } from "@/utils/validators";
import { CodeLanguage } from "@/interface/CodeLanguage";
import { SubmissionStatus } from "@/interface/SubmissionStatus";
import formatFileSize from "@/utils/formatFileSize";

import api from "@/api";

enum LanguageTableMapping {
  "c" = "C",
  "cpp" = "C++",
  "java" = "Java",
  "python" = "Python",
}

import {
  SubmissionStatusType,
  SubmissionLangType,
  SubmissionLangTypeTitle,
  SubmissionStatusTypeTitle,
} from "@/interface/Submission";

interface AnswerItem {
  id: number;
  lang: string;
  codeLength: number;
}

interface ProblemItem {
  id: number;
  title: string;
}

interface SubmissionItem {
  id: number;
  status: string;
  who: string;
  when: string;
  problem: ProblemItem;
  time: number;
  memory: number;
  answer: AnswerItem;
}

interface SubmissionsQuery {
  problemId: number;
  problemDisplayId: number;
  submitter: string;
  codeLanguage: CodeLanguage;
  status: SubmissionStatus;
  minId: number;
  maxId: number;
}

enum SubmissionTableHeadTitle {
  id = "#",
  status = "Status",
  who = "Who",
  when = "When",
  problem = "Problem",
  time = "Time",
  memory = "Memory",
  answer = "Answer",
}

function problemRender(problem: ProblemItem) {
  const title = `#${problem.id}. ${problem.title}`;
  return (
    <a href={`/problem/${problem.id}`}>
      <Tooltip title={title} placement={"top"}>
        <div className={"h-ellipsis"}>{title}</div>
      </Tooltip>
    </a>
  );
}

function statusRender(status: SubmissionStatus) {
  return status.replace(/([A-Z])/g, " $1").slice(1);
}

function submissionTimeRender(time: number) {
  return `${time} ms`;
}

const SubmissionsPage: React.FC<{}> = (props) => {
  const [fetchDataLoading, setFetchDataLoading] = useState(true);
  const [tableData, setTableData] = useState([] as SubmissionItem[]);

  function normalizeQuery(query: Record<string, string>): SubmissionsQuery {
    const result: SubmissionsQuery = {
      problemId: Number(query.problemId) ? Number(query.problemId) : null,
      problemDisplayId:
        Number(query.problemDisplayId) && !Number(query.problemId)
          ? Number(query.problemDisplayId)
          : null,
      submitter: isValidUsername(query.submitter) ? query.submitter : null,
      codeLanguage: Object.values(CodeLanguage).includes(
        query.codeLanguage as CodeLanguage,
      )
        ? (query.codeLanguage as CodeLanguage)
        : null,
      status:
        query.status in SubmissionStatus
          ? (query.status as SubmissionStatus)
          : null,
      minId: Number.isSafeInteger(Number(query.minId))
        ? Number(query.minId)
        : null,
      maxId: Number.isSafeInteger(Number(query.maxId))
        ? Number(query.maxId)
        : null,
    };
    return Object.fromEntries(
      Object.entries(result).filter(([key, value]) => value != null),
    ) as SubmissionsQuery;
  }

  async function fetchData(query: SubmissionsQuery) {
    const { requestError, response } = await api.submission.querySubmission({
      ...query,
      locale: "en_US",
      takeCount: 1000000,
    });

    if (requestError) message.error(requestError);
    else if (response.error) message.error(response.error);
    else {
      let _tableData: SubmissionItem[] = [];
      // console.log(response);
      response.submissions.forEach((submission) => {
        _tableData.push({
          id: submission.id,
          status: submission.status,
          who: submission.submitter.username,
          when: submission.submitTime,
          problem: {
            id: submission.problem.id,
            title: submission.problemTitle,
          },
          time: submission.timeUsed,
          memory: submission.memoryUsed,
          answer: {
            id: submission.id,
            lang: submission.codeLanguage,
            codeLength: submission.answerSize,
          },
        });
      });
      setTableData(_tableData);
      setFetchDataLoading(false);
    }
  }

  useEffect(() => {
    fetchData({});
  });

  const columns: ColumnsType<SubmissionItem> = [
    {
      title: SubmissionTableHeadTitle.id,
      dataIndex: "id",
      key: "id",
      width: "40px",
      align: "left",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: SubmissionTableHeadTitle.problem,
      dataIndex: "problem",
      key: "problem",
      width: "120px",
      align: "left",
      // ...useTableSearch("problem", SubmissionTableHeadTitle.problem),
      render: problemRender,
    },
    {
      title: SubmissionTableHeadTitle.status,
      dataIndex: "status",
      key: "status",
      width: "120px",
      align: "center",
      // ...useTableFilter(
      //   "status",
      //   SubmissionTableHeadTitle.status,
      //   SubmissionStatusTypeTitle.map((item: string) => {
      //     return {
      //       title: <b>{item}</b>,
      //       value: item,
      //     };
      //   }),
      // ),
      render: statusRender,
    },
    {
      title: SubmissionTableHeadTitle.time,
      dataIndex: "time",
      key: "time",
      width: "60px",
      align: "center",
      sorter: (a, b) => a.time - b.time,
      render: submissionTimeRender,
    },
    {
      title: SubmissionTableHeadTitle.memory,
      dataIndex: "memory",
      key: "memory",
      width: "60px",
      align: "center",
      sorter: (a, b) => a.memory - b.memory,
      render: (memory) => formatFileSize(memory * 1024),
    },
    {
      title: SubmissionTableHeadTitle.answer,
      dataIndex: "answer",
      key: "answer",
      width: "80px",
      align: "center",
      render: (answer: AnswerItem) => (
        <>
          <a href={`/submission/${answer.id}`}>
            {LanguageTableMapping[answer.lang]}
          </a>
          /{formatFileSize(answer.codeLength)}
        </>
      ),
    },
    {
      title: SubmissionTableHeadTitle.who,
      dataIndex: "who",
      key: "who",
      width: "60px",
      align: "center",
      ...useTableSearch("who", SubmissionTableHeadTitle.who),
      render: (who: string) => <a href={`/user/${who}`}>{who}</a>,
    },
    {
      title: SubmissionTableHeadTitle.when,
      dataIndex: "when",
      key: "when",
      width: "80px",
      align: "center",
      render: (when) => <FormatTableDate date={when} />,
    },
  ];

  return (
    <BasicLayout current={"submissions"}>
      <div className={styles.root}>
        <div className={styles.tableRoot}>
          <Table<SubmissionItem>
            loading={fetchDataLoading}
            size="small"
            scroll={{ x: 1100 }}
            sticky
            columns={columns}
            dataSource={tableData}
            className={AntTableHeadStyles.table}
            rowKey={(record) => record.id}
            pagination={{
              hideOnSinglePage: true,
              showQuickJumper: true,
              showSizeChanger: true,
              defaultPageSize: 16,
              pageSizeOptions: ["8", "16", "32", "64", "128", "256"],
            }}
          />
        </div>
      </div>
    </BasicLayout>
  );
};

export default SubmissionsPage;
