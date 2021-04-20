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
export const deleteContest = createPostApi<
  ApiTypes.DeleteContestRequestDto,
  ApiTypes.DeleteContestResponseDto
>("contest/deleteContest", false);
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
export const registerContestUser = createPostApi<
  ApiTypes.RegisterContestUserRequestDto,
  ApiTypes.RegisterContestUserResponseDto
>("contest/registerContestUser", false);
export const importContestUsers = createPostApi<
  ApiTypes.ImportContestUsersRequestDto,
  ApiTypes.ImportContestUsersResponseDto
>("contest/importContestUsers", false);
export const deleteContestUser = createPostApi<
  ApiTypes.DeleteContestUserRequestDto,
  ApiTypes.DeleteContestUserResponseDto
>("contest/deleteContestUser", false);
export const getContestUserList = createPostApi<
  ApiTypes.GetContestUserListRequestDto,
  ApiTypes.GetContestUserListResponseDto
>("contest/getContestUserList", false);
export const createClarification = createPostApi<
  ApiTypes.CreateClarificationRequestDto,
  ApiTypes.CreateClarificationResponseDto
>("contest/createClarification", false);
export const getClarifications = createPostApi<
  ApiTypes.GetClarificationsRequestDto,
  ApiTypes.GetClarificationsResponseDto
>("contest/getClarifications", false);
export const getStandingsData = createPostApi<
  ApiTypes.GetStandingsDataRequestDto,
  ApiTypes.GetStandingsDataResponseDto
>("contest/getStandingsData", false);
export const getContestSubmissions = createPostApi<
  ApiTypes.GetContestSubmissionsRequestDto,
  ApiTypes.GetContestSubmissionsResponseDto
>("contest/getContestSubmissions", false);
export const sendContestNotification = createPostApi<
  ApiTypes.SendContestNotificationRequestDto,
  ApiTypes.SendContestNotificationResponseDto
>("contest/sendContestNotification", false);
