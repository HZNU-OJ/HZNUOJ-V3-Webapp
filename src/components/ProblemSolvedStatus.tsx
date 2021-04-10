import { CheckOutlined, LineOutlined } from "@ant-design/icons";

export enum ProblemSolvedStatus {
  solved = "solved",
  unSolved = "unSolved",
  unSubmit = "unSubmit",
}

export const ProblemStatusSolved = () => (
  <span style={{ color: "#25ad40", fontWeight: "bold" }}>
    <CheckOutlined />
  </span>
);

export const ProblemStatusUnSolved = () => (
  <span style={{ color: "#3e90cc", fontWeight: "bold" }}>
    <LineOutlined />
  </span>
);

export function getStatus(
  problem: ApiTypes.QueryProblemSetResponseItemDto,
): ProblemSolvedStatus {
  if (problem?.submission == null) {
    return ProblemSolvedStatus.unSubmit;
  } else {
    if (problem.submission.status === "Accepted") {
      return ProblemSolvedStatus.solved;
    } else {
      return ProblemSolvedStatus.unSolved;
    }
  }
}

export function ProblemStatusRender(status: ProblemSolvedStatus): JSX.Element {
  switch (status) {
    case ProblemSolvedStatus.solved:
      return <ProblemStatusSolved />;
    case ProblemSolvedStatus.unSolved:
      return <ProblemStatusUnSolved />;
    case ProblemSolvedStatus.unSubmit:
      return <></>;
  }
}
