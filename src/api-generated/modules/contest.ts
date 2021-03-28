// This file is generated automatically, do NOT modify it.

/// <reference path="../types.d.ts" />

import { createGetApi, createPostApi } from "@/api";

export const getConfig = createGetApi<void, ApiTypes.GetContentDto>(
  "contest/config",
);
export const getTeam = createGetApi<void, ApiTypes.GetContentDto>(
  "contest/team",
);
export const getRun = createGetApi<void, ApiTypes.GetContentDto>("contest/run");
