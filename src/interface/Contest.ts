export const ContestStatusColor = {
  PENDING: "#3bb4f2",
  RUNNING: "rgb(94, 185, 94)",
  FROZEN: "#dd514c",
  FINISHED: "#0e90d2",
};

export const ContestStatusColorList = [
  "#3bb4f2",
  "rgb(94, 185, 94)",
  "#dd514c",
  "#0e90d2",
];

export const ContestStatusColorById = {
  PENDING: "#3bb4f2",
  RUNNING: "rgb(94, 185, 94)",
  FROZEN: "#dd514c",
  FINISHED: "#0e90d2",
};

export enum ContestStatus {
  pending = "PENDING",
  running = "RUNNING",
  frozen = "FROZEN",
  finished = "FINISHED",
}

export enum ContestMode {
  icpc = "ICPC",
  ioi = "IOI",
  codeForces = "CodeForces",
}
