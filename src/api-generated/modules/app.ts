// This file is generated automatically, do NOT modify it.

/// <reference path="../types.d.ts" />

import { createGetApi, createPostApi } from "@/api";

export const getVersion = createGetApi<void, ApiTypes.GetVersionDto>("version");
export const getMd = createPostApi<ApiTypes.getIdDto, ApiTypes.GetMdDto>(
  "md",
  false,
);
export const md2json = createGetApi<{ id: string }, ApiTypes.GetMdDto>(
  "md2json/{id}",
);
