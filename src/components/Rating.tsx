import style from "./Rating.module.less";
import { Tooltip } from "antd";

function getWinProbability(ra: number, rb: number) {
  return 1.0 / (1.0 + Math.pow(10.0, (rb - ra) / 400.0));
}

export function getTeamRating(teamRatings: number[]): number {
  let left = 1;
  let right = 1e4;
  for (let tt = 0; tt < 100; ++tt) {
    let r = (left + right) / 2.0;
    let rWinsProbability = 1.0;
    teamRatings.forEach((rating) => {
      rWinsProbability *= getWinProbability(r, rating);
    });
    let rating = Math.log10(1 / rWinsProbability - 1) * 400 + r;
    if (rating > r) {
      left = r;
    } else {
      right = r;
    }
  }
  return Math.ceil((left + right) / 2.0);
}

function getRankClassName(rank: string): string {
  switch (rank) {
    case "newbie":
      return "user-gray";
    case "pupil":
      return "user-green";
    case "specialist":
      return "user-cyan";
    case "expert":
      return "user-blue";
    case "candidate master":
      return "user-violet";
    case "master":
      return "user-orange";
    case "international master":
      return "user-orange";
    case "grandmaster":
      return "user-red";
    case "international grandmaster":
      return "user-red";
    case "legendary grandmaster":
      return "user-legendary";
  }
  return "";
}

export function getRatingName(rating: number) {
  if (rating >= 3000) {
    return "Legendary Grandmaster";
  } else if (rating >= 2600) {
    return "International Grandmaster";
  } else if (rating >= 2400) {
    return "Grandmaster";
  } else if (rating >= 2300) {
    return "International Master";
  } else if (rating >= 2100) {
    return "Master";
  } else if (rating >= 1900) {
    return "Candidate Master";
  } else if (rating >= 1600) {
    return "Expert";
  } else if (rating >= 1400) {
    return "Specialist";
  } else if (rating >= 1200) {
    return "Pupil";
  } else {
    return "Newbie";
  }
}

export function getHandleLink(handle: string, rank: string) {
  return (
    <a
      className={[
        style["rated-user"],
        style[getRankClassName(rank.toLowerCase())],
      ].join(" ")}
      href={`/user/${handle}`}
    >
      {handle}
    </a>
  );
}

export function getRatingSpan(rating: number) {
  return (
    <span
      style={{ fontWeight: "bold" }}
      className={style[getRankClassName(getRatingName(rating).toLowerCase())]}
    >
      <Tooltip placement="top" title={getRatingName(rating)}>
        <span>{rating}</span>
      </Tooltip>
    </span>
  );
}
