// This file is generated automatically, do NOT modify it.

/// <reference path="../types.d.ts" />

import { createGetApi, createPostApi } from "@/api";

export const getSubmissionStatics = createGetApi<
  { timezone: string; now: string },
  ApiTypes.GetSubmissionStaticsResponseDto
>("homepage/getSubmissionStatics");
export const addAnnouncement = createPostApi<
  ApiTypes.AddAnnouncementRequestDto,
  ApiTypes.AddAnnouncementResponseDto
>("homepage/addAnnouncement", false);
export const deleteAnnouncement = createPostApi<
  ApiTypes.DeleteAnnouncementRequestDto,
  ApiTypes.DeleteAnnouncementResponseDto
>("homepage/deleteAnnouncement", false);
export const getAnnouncements = createGetApi<
  void,
  ApiTypes.GetAnnouncementsResponseDto
>("homepage/getAnnouncements");
