// This file is generated automatically, do NOT modify it.

/// <reference path="../types.d.ts" />

import { createGetApi, createPostApi } from "@/api";

export const getVersion = createGetApi<void, ApiTypes.GetVersionDto>("version");
export const getMd = createGetApi<void, ApiTypes.GetMdDto>("md");
export const md2json = createGetApi<void, ApiTypes.GetMdDto>("md2json");
