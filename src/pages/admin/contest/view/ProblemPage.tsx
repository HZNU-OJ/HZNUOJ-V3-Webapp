import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import ContestAdminLayout from "./components/ContestAdminLayout";
import { useParams } from "umi";
import { Table, Tooltip, message, Button, Space, Popconfirm } from "antd";
import { ColumnsType } from "antd/es/table";
import style from "./ProblemPage.module.less";
import AntTableHeadStyles from "@/less/AntTableHead.module.less";
import { ContestContext } from "@/pages/contest/layouts/ContestLayout";
import { mappingOrderIdToAlphaId } from "@/pages/contest/utils";
import { ProblemSolvedStatus } from "@/components/ProblemSolvedStatus";
import { PlusOutlined } from "@ant-design/icons";
import AddProblemModel from "./components/AddProblemModel";
import api from "@/api";
import { DeleteOutlined } from "@ant-design/icons";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import { swapTwoProblemOrder } from "@/api-generated/modules/contest";
const type = "DragableBodyRow";

const DeleteIcon = () => (
  <DeleteOutlined style={{ cursor: "pointer", color: "#3e90cc" }} />
);

interface ProblemTitleItem {
  orderId: string;
  title: string;
}

interface ActionItem {
  problemId: number;
}

interface ProblemItem {
  id: number;
  problemId: number;
  problem: ProblemTitleItem;
  submissions: number;
  acceptance: number;
  ratio: number;
  action: ActionItem;
}

enum ProblemTableHeadTitle {
  id = "#",
  problemTitle = "Problem Title",
  submissions = "Submissions",
  acceptance = "Acceptance",
  ratio = "Ratio",
  action = "Action",
}

function getAcceptance(
  acceptedSubmissionCount: number,
  submissionCount: number,
): number {
  const eps = 0;
  if (submissionCount === 0) {
    return parseInt((0.0 * 100).toFixed(eps));
  } else {
    return parseInt(
      ((acceptedSubmissionCount * 100.0) / submissionCount).toFixed(eps),
    );
  }
}

interface ProblemsPageParams {
  id: string;
}

const ProblemPage: React.FC<{}> = (props) => {
  const params: ProblemsPageParams = useParams();

  const contest = useContext(ContestContext);

  const [deleteProblemLoading, setDeleteProblemLoading] = useState(false);
  async function onDeleteProblem(problemId: number) {
    setDeleteProblemLoading(true);
    const { requestError, response } = await api.contest.deleteProblem({
      contestId: parseInt(params.id),
      problemId,
    });
    if (requestError) message.error(requestError);
    else if (response.error) message.error(response.error);
    else {
      message.success(`Delete Problem(${problemId}) Successfully!`);
    }
    setDeleteProblemLoading(false);
  }

  const columns: ColumnsType<ProblemItem> = [
    {
      title: ProblemTableHeadTitle.id,
      dataIndex: "id",
      key: "id",
      width: "60px",
      align: "left",
      sorter: (a, b) => a.id - b.id,
      render: mappingOrderIdToAlphaId,
    },
    {
      title: ProblemTableHeadTitle.problemTitle,
      dataIndex: "problem",
      key: "problem",
      width: "540px",
      align: "left",
      render: (problem: ProblemTitleItem) => {
        return (
          <Tooltip placement="top" title={problem.title}>
            <a
              href={`/contest/${params.id}/problem/${problem.orderId}`}
              className={["h-ellipsis"].join(" ")}
            >
              {problem.title}
            </a>
          </Tooltip>
        );
      },
    },
    {
      title: ProblemTableHeadTitle.acceptance,
      dataIndex: "acceptance",
      key: "acceptance",
      width: "120px",
      align: "right",
      sorter: (a, b) => a.acceptance - b.acceptance,
    },
    {
      title: ProblemTableHeadTitle.submissions,
      dataIndex: "submissions",
      key: "submissions",
      width: "120px",
      align: "right",
      sorter: (a, b) => a.submissions - b.submissions,
    },
    {
      title: ProblemTableHeadTitle.ratio,
      dataIndex: "ratio",
      key: "ratio",
      width: "60px",
      align: "right",
      sorter: (a, b) => a.ratio - b.ratio,
      render: (ratio: number) => <span>{ratio}%</span>,
    },
    {
      title: ProblemTableHeadTitle.action,
      dataIndex: "action",
      key: "action",
      width: "100px",
      align: "left",
      render: (action: ActionItem) => {
        return (
          <Space size={"middle"}>
            <Popconfirm
              title={`Are you sure to delete the problem?`}
              onConfirm={() => {
                onDeleteProblem(action.problemId);
              }}
              okText="Yes"
              cancelText="No"
              placement="top"
              okButtonProps={{
                loading: deleteProblemLoading,
              }}
            >
              <a>
                <DeleteIcon />
              </a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const [addProblemModelVisible, setAddProblemModelVisible] = useState(false);

  const [tableData, setTableData] = useState([] as ProblemItem[]);
  const [fetchDataLoading, setFetchDataLoading] = useState(true);
  async function fetchData() {
    const { requestError, response } = await api.contest.getContest({
      id: parseInt(params.id),
    });

    if (requestError) {
      message.error(requestError);
    } else if (response.error) {
      message.error(response.error);
    } else {
      setTableData(
        response.problemMetas.map((problem) => ({
          status: problem.submission
            ? problem.submission.status === "Accepted"
              ? ProblemSolvedStatus.solved
              : ProblemSolvedStatus.unSolved
            : ProblemSolvedStatus.unSubmit,
          id: problem.orderId,
          problemId: problem.problemId,
          problem: {
            orderId: mappingOrderIdToAlphaId(problem.orderId),
            title: problem.title,
          } as ProblemTitleItem,
          acceptance: problem.acceptedSubmissionCount,
          submissions: problem.submissionCount,
          ratio: getAcceptance(
            problem.acceptedSubmissionCount,
            problem.submissionCount,
          ),
          action: {
            problemId: problem.problemId,
          },
        })),
      );
      setFetchDataLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [contest, addProblemModelVisible, deleteProblemLoading]);

  const DragableBodyRow = ({
    index,
    moveRow,
    className,
    style,
    ...restProps
  }) => {
    const ref = useRef();
    const [{ isOver, dropClassName }, drop] = useDrop(
      () => ({
        accept: type,
        collect: (monitor) => {
          const { index: dragIndex } = monitor.getItem() || {};
          if (dragIndex === index) {
            return {};
          }
          return {
            isOver: monitor.isOver(),
            dropClassName:
              dragIndex < index ? " drop-over-downward" : " drop-over-upward",
          };
        },
        drop: (item) => {
          moveRow(item.index, index);
        },
      }),
      [index],
    );
    const [, drag] = useDrag(
      () => ({
        type,
        item: { index },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      }),
      [index],
    );
    drop(drag(ref));

    return (
      <tr
        ref={ref}
        className={`${className}${isOver ? dropClassName : ""}`}
        style={{ cursor: "move", ...style }}
        {...restProps}
      />
    );
  };

  const components = {
    body: {
      row: DragableBodyRow,
    },
  };

  const [swapLoading, setSwapLoading] = useState(false);
  const moveRow = useCallback(
    async (dragIndex, hoverIndex) => {
      const dragRow = tableData[dragIndex];
      const _data = update(tableData, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragRow],
        ],
      });
      const tmp = tableData[dragIndex].id;
      tableData[dragIndex].id = tableData[hoverIndex].id;
      tableData[hoverIndex].id = tmp;
      setTableData(_data);
      setSwapLoading(true);

      const contestId = parseInt(params.id);
      const orginId = tableData[dragIndex].problemId;
      const newId = tableData[hoverIndex].problemId;

      const { requestError, response } = await api.contest.swapTwoProblemOrder({
        contestId,
        problemOriginId: orginId,
        problemNewId: newId,
      });

      if (requestError) {
        message.error(requestError);
      } else if (response.error) {
        message.error(response.error);
      } else {
        message.success(
          `Swap Problem ${orginId} and Problem ${newId} Successfully.`,
        );
      }

      setSwapLoading(false);
    },
    [tableData],
  );

  return (
    <>
      <ContestAdminLayout current="problem">
        <div className={style.addBtn}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size={"middle"}
            onClick={() => {
              setAddProblemModelVisible(true);
            }}
          >
            Add Problem
          </Button>
        </div>

        <DndProvider backend={HTML5Backend}>
          <div className={style.tableRoot}>
            <Table<ProblemItem>
              size="small"
              scroll={{ x: 900 }}
              sticky
              columns={columns}
              loading={fetchDataLoading || swapLoading}
              dataSource={tableData}
              className={AntTableHeadStyles.table}
              rowKey={(record) => record.id}
              components={components}
              onRow={(record, index) => ({
                index,
                moveRow,
              })}
              pagination={{
                hideOnSinglePage: true,
                showQuickJumper: true,
                showSizeChanger: true,
                defaultPageSize: 32,
                pageSizeOptions: ["8", "16", "32", "64", "128", "256"],
              }}
            />
          </div>
        </DndProvider>
      </ContestAdminLayout>

      <AddProblemModel
        contestId={parseInt(params.id)}
        visible={addProblemModelVisible}
        onCancel={() => setAddProblemModelVisible(false)}
      />
    </>
  );
};

export default ProblemPage;
