// This file is generated automatically, do NOT modify it.

/// <reference path="../types.d.ts" />

import { createGetApi, createPostApi } from "@/api";

export const getSubmissionStatics = createGetApi<
  { timezone: string; now: string },
  ApiTypes.GetSubmissionStaticsResponseDto
>("homepage/getSubmissionStatics");
