// This file is generated automatically, do NOT modify it.

/// <reference path="../types.d.ts" />

import { createGetApi, createPostApi } from "@/api";

export const createContest = createPostApi<
  ApiTypes.CreateContestRequestDto,
  ApiTypes.CreateContestResponseDto
>("contest/createContest", false);
export const editContest = createPostApi<
  ApiTypes.EditContestRequestDto,
  ApiTypes.EditContestResponseDto
>("contest/editContest", false);
export const getContest = createPostApi<
  ApiTypes.GetContestRequestDto,
  ApiTypes.GetContestResponseDto
>("contest/getContest", false);
export const getContestList = createPostApi<
  ApiTypes.GetContestListRequestDto,
  ApiTypes.GetContestListResponseDto
>("contest/getContestList", false);
export const addProblem = createPostApi<
  ApiTypes.AddProblemRequestDto,
  ApiTypes.AddProblemResponseDto
>("contest/addProblem", false);
export const deleteProblem = createPostApi<
  ApiTypes.DeleteProblemRequestDto,
  ApiTypes.DeleteProblemResponseDto
>("contest/deleteProblem", false);
export const getProblemMetaList = createPostApi<
  ApiTypes.GetProblemMetaListRequestDto,
  ApiTypes.GetProblemMetaListResponseDto
>("contest/getProblemMetaList", false);
export const getClarificationList = createPostApi<
  ApiTypes.GetClarificationsRequestDto,
  ApiTypes.GetClarificationsResponseDto
>("contest/getClarificationList", false);
export const importContestUsers = createPostApi<
  ApiTypes.ImportContestUsersRequestDto,
  ApiTypes.ImportContestUsersResponseDto
>("contest/importContestUsers", false);
export const getConfig = createGetApi<void, ApiTypes.GetContentDto>(
  "contest/config",
);
export const getTeam = createGetApi<void, ApiTypes.GetContentDto>(
  "contest/team",
);
export const getRun = createGetApi<void, ApiTypes.GetContentDto>("contest/run");
