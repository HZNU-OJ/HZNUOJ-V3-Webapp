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
export const getClarifications = createPostApi<
  ApiTypes.GetClarificationsRequestDto,
  ApiTypes.GetClarificationsResponseDto
>("contest/getClarifications", false);
export const importUser = createPostApi<
  ApiTypes.ImportUserRequestDto,
  ApiTypes.ImportUserResponseDto
>("contest/importUser", false);
export const getConfig = createGetApi<void, ApiTypes.GetContentDto>(
  "contest/config",
);
export const getTeam = createGetApi<void, ApiTypes.GetContentDto>(
  "contest/team",
);
export const getRun = createGetApi<void, ApiTypes.GetContentDto>("contest/run");
