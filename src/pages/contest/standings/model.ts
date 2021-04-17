import { submission } from "@/api-generated";
import {
  deepCopy,
  getNowTimeStamp,
  removeDuplicateItems,
  getStarKey,
  getQueryString,
} from "@/pages/contest/utils";

export const fetchIntervalTime = 30 * 1000;

const balloonColor = [
  {
    background_color: "rgba(189, 14, 14, 0.7)",
    color: "#fff",
  },
  {
    background_color: "rgba(255, 144, 228, 0.7)",
    color: "#fff",
  },
  {
    background_color: "rgba(255, 255, 255, 0.7)",
    color: "#000",
  },
  {
    background_color: "rgba(38, 185, 60, 0.7)",
    color: "#fff",
  },
  {
    background_color: "rgba(239, 217, 9, 0.7)",
    color: "#000",
  },
  {
    background_color: "rgba(243, 88, 20, 0.7)",
    color: "#fff",
  },
  {
    background_color: "rgba(12, 76, 138, 0.7)",
    color: "#fff",
  },
  {
    background_color: "rgba(156, 155, 155, 0.7)",
    color: "#fff",
  },
  {
    background_color: "rgba(4, 154, 115, 0.7)",
    color: "#fff",
  },
  {
    background_color: "rgba(159, 19, 236, 0.7)",
    color: "#fff",
  },
  {
    background_color: "rgba(42, 197, 202, 0.7)",
    color: "#fff",
  },
  {
    background_color: "rgba(142, 56, 54, 0.7)",
    color: "#fff",
  },
  {
    background_color: "rgba(0, 0, 0, 0.7)",
    color: "#fff",
  },
];

const problemId = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

function date2TimeStamp(date: Date | string) {
  if (typeof date === "string") {
    date = new Date(date);
  }
  return Math.floor(date.getTime() / 1000);
}

export function getData(
  contest: ApiTypes.GetContestResponseDto,
  standingsData: ApiTypes.GetStandingsDataResponseDto,
) {
  let contest_config = {};
  contest_config["contest_name"] = contest.contestMeta.contestName;
  contest_config["start_time"] = date2TimeStamp(contest.contestMeta.startTime);
  contest_config["end_time"] = date2TimeStamp(contest.contestMeta.endTime);
  if (contest.contestMeta?.frozenStartTime) {
    contest_config["frozen_time"] =
      date2TimeStamp(contest.contestMeta.frozenEndTime) -
      date2TimeStamp(contest.contestMeta.frozenStartTime);
  } else {
    contest_config["frozen_time"] = 0;
  }
  contest_config["penalty"] = 1200;
  contest_config["status_time_display"] = {
    correct: 1,
    incorrect: 1,
    pending: 1,
  };
  const problemNum = contest?.problemMetas?.length ?? 0;
  contest_config["problem_id"] = problemId.filter(
    (_, index) => index < problemNum,
  );
  contest_config["balloon_color"] = balloonColor.filter(
    (_, index) => index < problemNum,
  );

  const map = new Map();
  contest?.problemMetas?.forEach((problem) => {
    map.set(problem.problemId, problem.orderId);
  });

  let team = {};

  standingsData.contestUserList.forEach((user) => {
    team[user.id] = {
      name: user.nickname,
    };
  });

  let run = [];

  const getStatus = (
    status:
      | "Pending"
      | "ConfigurationError"
      | "SystemError"
      | "Canceled"
      | "CompilationError"
      | "FileError"
      | "RuntimeError"
      | "TimeLimitExceeded"
      | "MemoryLimitExceeded"
      | "OutputLimitExceeded"
      | "PartiallyCorrect"
      | "WrongAnswer"
      | "Accepted"
      | "JudgementFailed"
      | "Frozen",
  ) => {
    if (status === "Accepted") {
      return "correct";
    } else if (status === "Pending" || status === "Frozen") {
      return "pending";
    } else {
      return "incorrect";
    }
  };

  standingsData.submissions
    .filter(
      (submission) =>
        submission.status !== "Canceled" &&
        submission.status !== "CompilationError" &&
        submission.status !== "ConfigurationError" &&
        submission.status !== "FileError" &&
        submission.status !== "SystemError",
    )
    .forEach((submission) => {
      run.push({
        team_id: submission.submitter.id,
        timestamp:
          date2TimeStamp(submission.submitTime) - contest_config["start_time"],
        problem_id: map.get(submission.problem.id) - 1,
        status: getStatus(submission.status),
      });
    });

  return { contest_config, team, run };
}

export function getMenu(contest_config: any) {
  const type_ = ["Standings", "Balloon", "Statistics", "Export"];
  const group_ = ["All", "Concern"];
  const fgroup_ = ["all", "filter"];

  let menu_item = {
    type: deepCopy(type_),
    group: deepCopy(group_),
  };

  let fgroup = deepCopy(fgroup_);

  if (contest_config.group) {
    for (let k in contest_config.group) {
      let v = contest_config.group[k];
      fgroup.push(k);
      menu_item.group.push(v);
    }
  }
  return { menu_item, fgroup };
}

export function getCurrentGroup(search: any, group: any, fgroup: any) {
  let currentGroup = "all";
  const params = new URLSearchParams(search);
  if (params.get("group")) {
    const index = group.indexOf(params.get("group") || "");
    if (index !== -1) {
      currentGroup = fgroup[index];
    }
  }
  return currentGroup;
}

export function getTimeFlag(contest_config: any, search: any) {
  let timeFlag: any = getQueryString("timeflag", search);
  let now = getNowTimeStamp();
  if (timeFlag == null) {
    timeFlag = now.toString();
  }
  timeFlag = parseInt(timeFlag || "");
  if (now > contest_config.end_time) now = contest_config.end_time;
  if (now < contest_config.start_time) now = contest_config.start_time;
  if (timeFlag > now) timeFlag = now;
  if (timeFlag < contest_config.start_time)
    timeFlag = contest_config.start_time;
  return Math.ceil(timeFlag - contest_config.start_time);
}

export function getOrganization(team: any) {
  let organization: any = [];
  for (let team_id in team) {
    if (team[team_id].organization) {
      organization.push(team[team_id].organization);
    }
  }
  return removeDuplicateItems(organization);
}

export function getCurrentOrganization(search: any) {
  let params = new URLSearchParams(search);
  if (params.get("organization")) {
    return JSON.parse(params.get("organization") || "");
  }
  return [];
}

const INF = 0x3f3f3f3f;

export function getConfig(contest_config: any, group: any) {
  let config = deepCopy(contest_config);
  if (config.medal) {
    delete config.medal;
    if (contest_config.medal[group])
      config.medal = deepCopy(contest_config.medal[group]);
  }
  return config;
}

export function getTeam(team: any, group: any, search: any) {
  let organization = getCurrentOrganization(search);
  organization = new Set(organization);
  for (let team_id in team) {
    let item = team[team_id];
    item.filter = 0;
    item.organization_filter = 0;
    if (window.localStorage.getItem(getStarKey(team_id))) {
      item.concerned = 1;
      item.filter = 1;
    }
    if (organization.has(team[team_id]?.["organization"])) {
      item.organization_filter = 1;
      item.filter = 1;
    }
  }
  const team_list = (() => {
    let team_list: any = {};
    for (let team_id in team) {
      let item = team[team_id];
      if (item[group] === 1) {
        team_list[team_id] = item;
      }
    }
    return team_list;
  })();
  return team_list;
}

export function getRun(run: any, team: any, timeFlag: any) {
  let _run = (() => {
    let _run: any = [];
    run.forEach((item: any) => {
      if (item.timestamp <= timeFlag) {
        _run.push(item);
      }
    });
    _run.sort((a: any, b: any) => {
      if (a.timestamp < b.timestamp) return -1;
      if (a.timestamp > b.timestamp) return 1;
      if (b.status === "correct" && a.status !== "correct") return -1;
      if (a.status === "correct" && b.status !== "correct") return 1;
      return 0;
    });
    return _run;
  })();

  let new_run = (() => {
    let map = new Map();
    let set = new Set(Object.keys(team));
    let new_run: any = [];
    _run.forEach((item: any) => {
      if (set.has(item.team_id.toString())) {
        const id = [item.team_id, item.problem_id].join("-");
        if (!map.has(id) || map.get(id) == INF) {
          new_run.push(item);
          if (item.status === "correct") {
            map.set(id, item.timestamp);
          } else {
            map.set(id, INF);
          }
        }
      }
    });
    return new_run;
  })();

  return new_run;
}
