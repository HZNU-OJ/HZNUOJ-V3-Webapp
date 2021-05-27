// This file is generated automatically, do NOT modify it.

declare namespace ApiTypes {
  export interface AddAnnouncementRequestDto {
    discussionId: number;
  }
  export interface AddAnnouncementResponseDto {
    error?:
      | "PERMISSION_DENIED"
      | "ANNOUNCEMENT_ALREADY_EXISTS"
      | "INVALID_DISCUSSION_ID";
  }
  export interface AddJudgeClientRequestDto {
    name: string;
    allowedHosts: string[];
  }
  export interface AddJudgeClientResponseDto {
    error?: "PERMISSION_DENIED";
    judgeClient?: ApiTypes.JudgeClientInfoDto;
  }
  export interface AddProblemFileRequestDto {
    problemId: number;
    type: "TestData" | "AdditionalFile";
    filename: string;
    uploadInfo: ApiTypes.FileUploadInfoDto;
  }
  export interface AddProblemFileResponseDto {
    error?:
      | "NO_SUCH_PROBLEM"
      | "PERMISSION_DENIED"
      | "TOO_MANY_FILES"
      | "TOTAL_SIZE_TOO_LARGE"
      | "FILE_UUID_EXISTS"
      | "FILE_NOT_UPLOADED";
    signedUploadRequest?: ApiTypes.SignedFileUploadRequestDto;
  }
  export interface AddProblemRequestDto {
    problemId: number;
    contestId: number;
  }
  export interface AddProblemResponseDto {
    error?:
      | "PERMISSION_DENIED"
      | "NO_SUCH_PROBLEM"
      | "NO_SUCH_CONTEST"
      | "PROBLEM_ALREADY_EXISTS";
  }
  export interface AnnouncementMetaDto {
    id: number;
    discussionId: number;
    title: string;
    lastUpdateTime: string; // date-time
    orderId: number;
  }
  export interface CancelSubmissionRequestDto {
    submissionId: number;
  }
  export interface CancelSubmissionResponseDto {
    error?: "NO_SUCH_SUBMISSION" | "PERMISSION_DENIED";
  }
  export interface ChangeProblemTypeRequestDto {
    problemId: number;
    type: "Traditional" | "Interaction" | "SubmitAnswer";
  }
  export interface ChangeProblemTypeResponseDto {
    error?: "NO_SUCH_PROBLEM" | "PERMISSION_DENIED" | "PROBLEM_HAS_SUBMISSION";
  }
  export interface CheckAvailabilityResponseDto {
    usernameAvailable?: boolean;
    emailAvailable?: boolean;
  }
  export interface ClarificationMetaDto {
    id: number;
    publishTime: string; // date-time
    content: string;
    publisherId: number;
    username: string;
    nickname: string;
    replyId?: number;
  }
  export interface ContestMetaDto {
    id: number;
    contestName: string;
    startTime: string; // date-time
    endTime: string; // date-time
    frozenStartTime?: string; // date-time
    frozenEndTime?: string; // date-time
    isPublic: boolean;
  }
  export interface ContestUser {
    username: string;
    nickname: string;
    password: string;
    notificationEmail?: string;
  }
  export interface ContestUserMetaDto {
    id: number;
    username: string;
    email: string;
    nickname: string;
    organization: string;
    registrationTime: string; // date-time
    notificationEmail: string;
    contestUserPassword?: string;
  }
  export interface CreateClarificationRequestDto {
    contestId: number;
    content: string;
    replyId?: number;
  }
  export interface CreateClarificationResponseDto {
    error?: "PERMISSION_DENIED" | "NO_SUCH_CONTEST";
  }
  export interface CreateContestRequestDto {
    contestName: string;
    startTime: {};
    endTime: {};
    frozenStartTime?: {};
    frozenEndTime?: {};
    isPublic?: boolean;
  }
  export interface CreateContestResponseDto {
    error?: "PERMISSION_DENIED" | "NO_SUCH_PROBLEM_TAG" | "FAILED";
    id?: number;
  }
  export interface CreateDiscussionReplyRequestDto {
    discussionId: number;
    content: string;
    isPublic?: boolean;
  }
  export interface CreateDiscussionReplyResponseDto {
    error?: "PERMISSION_DENIED" | "NO_SUCH_DISCUSSION";
    reply?: ApiTypes.DiscussionReplyDto;
  }
  export interface CreateDiscussionRequestDto {
    problemId?: number;
    title: string;
    content: string;
    isPublic?: boolean;
  }
  export interface CreateDiscussionResponseDto {
    error?: "PERMISSION_DENIED" | "NO_SUCH_PROBLEM";
    discussionId?: number;
  }
  export interface CreateProblemRequestDto {
    type: "Traditional" | "Interaction" | "SubmitAnswer";
    statement: ApiTypes.ProblemStatementDto;
  }
  export interface CreateProblemResponseDto {
    error?: "PERMISSION_DENIED" | "NO_SUCH_PROBLEM_TAG" | "FAILED";
    id?: number;
  }
  export interface CreateProblemTagRequestDto {
    localizedNames: ApiTypes.ProblemTagLocalizedNameDto[];
    color: string;
  }
  export interface CreateProblemTagResponseDto {
    error?: "PERMISSION_DENIED";
    id?: number;
  }
  export interface DeleteAnnouncementRequestDto {
    announcementId: number;
  }
  export interface DeleteAnnouncementResponseDto {
    error?: "PERMISSION_DENIED" | "INVALID_ANNOUNCEMENT_ID";
  }
  export interface DeleteContestRequestDto {
    contestId: number;
  }
  export interface DeleteContestResponseDto {
    error?: "PERMISSION_DENIED" | "NO_SUCH_CONTEST";
  }
  export interface DeleteContestUserRequestDto {
    contestId: number;
    userId: number;
  }
  export interface DeleteContestUserResponseDto {
    error?:
      | "PERMISSION_DENIED"
      | "NO_SUCH_USER"
      | "NO_SUCH_CONTEST"
      | "USER_NOT_REGISTERED_CONTEST";
  }
  export interface DeleteDiscussionReplyRequestDto {
    discussionReplyId: number;
  }
  export interface DeleteDiscussionReplyResponseDto {
    error?: "PERMISSION_DENIED" | "NO_SUCH_DISCUSSION_REPLY";
  }
  export interface DeleteDiscussionRequestDto {
    discussionId: number;
  }
  export interface DeleteDiscussionResponseDto {
    error?: "PERMISSION_DENIED" | "NO_SUCH_DISCUSSION";
  }
  export interface DeleteJudgeClientRequestDto {
    id: number;
  }
  export interface DeleteJudgeClientResponseDto {
    error?: "PERMISSION_DENIED" | "NO_SUCH_JUDGE_CLIENT";
  }
  export interface DeleteProblemRequestDto {
    problemId: number;
  }
  export interface DeleteProblemResponseDto {
    error?: "PERMISSION_DENIED" | "NO_SUCH_PROBLEM";
  }
  export interface DeleteProblemTagRequestDto {
    id: number;
  }
  export interface DeleteProblemTagResponseDto {
    error?: "NO_SUCH_PROBLEM_TAG" | "PERMISSION_DENIED";
  }
  export interface DeleteSubmissionRequestDto {
    submissionId: number;
  }
  export interface DeleteSubmissionResponseDto {
    error?: "NO_SUCH_SUBMISSION" | "PERMISSION_DENIED";
  }
  export interface DiscussionDto {
    meta: ApiTypes.DiscussionMetaDto;
    content: string;
    problem?: ApiTypes.GetDiscussionAndRepliesResponseProblemDto;
    publisher: ApiTypes.UserMetaDto;
    reactions: ApiTypes.DiscussionOrReplyReactionsDto;
    permissions: (
      | "View"
      | "Modify"
      | "ManagePermission"
      | "ManagePublicness"
      | "Delete"
    )[];
  }
  export interface DiscussionMetaDto {
    id: number;
    title: string;
    publishTime: string; // date-time
    editTime: string; // date-time
    sortTime: string; // date-time
    replyCount: number;
    isPublic: boolean;
    publisherId: number;
    problemId?: number;
  }
  export interface DiscussionOrReplyReactionsDto {
    count: {};
    currentUserReactions: string[];
  }
  export interface DiscussionPermissionsDto {
    userPermissions: ApiTypes.DiscussionUserPermissionDto[];
  }
  export interface DiscussionReplyDto {
    id: number;
    content: string;
    publishTime: string; // date-time
    editTime: string; // date-time
    isPublic: boolean;
    publisher: ApiTypes.UserMetaDto;
    reactions: ApiTypes.DiscussionOrReplyReactionsDto;
    /**
     * ManagePermission is not valid for replies.
     */
    permissions: (
      | "View"
      | "Modify"
      | "ManagePermission"
      | "ManagePublicness"
      | "Delete"
    )[];
  }
  export interface DiscussionUserPermissionDto {
    user: ApiTypes.UserMetaDto;
    permissionLevel: 1 | 2;
  }
  export interface DownloadProblemFilesRequestDto {
    problemId: number;
    type: "TestData" | "AdditionalFile";
    filenameList: string[];
  }
  export interface DownloadProblemFilesResponseDto {
    error?: "NO_SUCH_PROBLEM" | "PERMISSION_DENIED";
    downloadInfo?: ApiTypes.ProblemFileDownloadInfoDto[];
  }
  export interface DownloadSubmissionFileRequestDto {
    submissionId: number;
    filename: string;
  }
  export interface DownloadSubmissionFileResponseDto {
    error?: "NO_SUCH_SUBMISSION" | "NO_SUCH_FILE" | "PERMISSION_DENIED";
    url?: string;
  }
  export interface EditContestRequestDto {
    contestId: number;
    contestName: string;
    startTime: {};
    endTime: {};
    frozenStartTime?: {};
    frozenEndTime?: {};
    isPublic?: boolean;
  }
  export interface EditContestResponseDto {
    error?: "PERMISSION_DENIED" | "NO_SUCH_CONTEST" | "FAILED";
  }
  export interface FileUploadInfoDto {
    uuid?: string;
    size: number;
  }
  export interface GetAllProblemTagsOfAllLocalesResponseDto {
    error?: "PERMISSION_DENIED";
    tags?: ApiTypes.ProblemTagWithAllLocalesDto[];
  }
  export interface GetAllProblemTagsRequestDto {
    locale: "en_US";
  }
  export interface GetAllProblemTagsResponseDto {
    tags: ApiTypes.LocalizedProblemTagDto[];
  }
  export interface GetAnnouncementsResponseDto {
    announcementMetas: ApiTypes.AnnouncementMetaDto[];
  }
  export interface GetClarificationsRequestDto {
    contestId: number;
  }
  export interface GetClarificationsResponseDto {
    error?: "PERMISSION_DENIED" | "NO_SUCH_CONTEST";
    clarifications?: ApiTypes.ClarificationMetaDto[];
  }
  export interface GetContestListRequestDto {
    hasPrivate: boolean;
    skipCount: number;
    takeCount: number;
  }
  export interface GetContestListResponseDto {
    error?: "TAKE_TOO_MANY";
    contestMetas?: ApiTypes.ContestMetaDto[];
    count?: number;
  }
  export interface GetContestRequestDto {
    id: number;
  }
  export interface GetContestResponseDto {
    error?: "PERMISSION_DENIED" | "NO_SUCH_CONTEST";
    contestMeta?: ApiTypes.ContestMetaDto;
    problemMetas?: ApiTypes.ProblemInContestMetaDto[];
  }
  export interface GetContestSubmissionsRequestDto {
    locale: "en_US";
    problemId?: number;
    problemDisplayId?: number;
    submitter?: string;
    contestId?: number;
    codeLanguage?: string;
    status?:
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
      | "Frozen";
    minId?: number;
    maxId?: number;
    takeCount: number;
  }
  export interface GetContestSubmissionsResponseDto {
    error?:
      | "PERMISSION_DENIED"
      | "NO_SUCH_CONTEST"
      | "NO_SUCH_USER"
      | "NO_SUCH_PROBLEM";
    submissions?: ApiTypes.SubmissionMetaDto[];
  }
  export interface GetContestUserListRequestDto {
    contestId: number;
  }
  export interface GetContestUserListResponseDto {
    error?: "PERMISSION_DENIED" | "NO_SUCH_CONTEST";
    contestUserList?: ApiTypes.ContestUserMetaDto[];
  }
  export interface GetDiscussionAndRepliesRequestDto {
    locale: "en_US";
    discussionId: number;
    /**
     * `HeadTail` is for the first query of a discussion page while `IdRange` is for loading the ramaining.
     */
    queryRepliesType?: "HeadTail" | "IdRange";
    getDiscussion?: boolean;
    /**
     * Only valid for `type` = `HeadTail`.
     */
    headTakeCount?: number;
    /**
     * Only valid for `type` = `HeadTail`.
     */
    tailTakeCount?: number;
    /**
     * Only valid for `type` = `IdRange`.
     */
    beforeId?: number;
    /**
     * Only valid for `type` = `IdRange`.
     */
    afterId?: number;
    /**
     * Only valid for `type` = `IdRange`.
     */
    idRangeTakeCount?: number;
  }
  export interface GetDiscussionAndRepliesResponseDto {
    error?: "NO_SUCH_DISCUSSION" | "PERMISSION_DENIED" | "TAKE_TOO_MANY";
    discussion?: ApiTypes.DiscussionDto;
    /**
     * Only valid for `type` = `HeadTail`.
     */
    repliesHead?: ApiTypes.DiscussionReplyDto[];
    /**
     * Only valid for `type` = `HeadTail`.
     */
    repliesTail?: ApiTypes.DiscussionReplyDto[];
    /**
     * Only valid for `type` = `HeadTail`.
     */
    repliesTotalCount?: number;
    /**
     * Only valid for `type` = `IdRange`.
     */
    repliesInRange?: ApiTypes.DiscussionReplyDto[];
    /**
     * Only valid for `type` = `IdRange`.
     */
    repliesCountInRange?: number;
    permissionCreateNewDiscussion?: boolean;
  }
  export interface GetDiscussionAndRepliesResponseProblemDto {
    meta: ApiTypes.ProblemMetaDto;
    title: string;
    titleLocale: "en_US";
  }
  export interface GetDiscussionPermissionsRequestDto {
    id: number;
  }
  export interface GetDiscussionPermissionsResponseDto {
    error?: "PERMISSION_DENIED" | "NO_SUCH_DISCUSSION";
    permissions?: ApiTypes.DiscussionPermissionsDto;
    haveManagePermissionsPermission?: boolean;
  }
  export interface GetProblemMetaListRequestDto {
    contestId: number;
  }
  export interface GetProblemMetaListResponseDto {
    error?: "PERMISSION_DENIED" | "NO_SUCH_CONTEST";
    problemMetas?: ApiTypes.ProblemInContestMetaDto[];
  }
  export interface GetProblemRequestDto {
    id?: number;
    displayId?: number;
    contestId?: number;
    owner?: boolean;
    localizedContentsOfLocale?: "en_US";
    localizedContentsTitleOnly?: boolean;
    localizedContentsOfAllLocales?: boolean;
    tagsOfLocale?: "en_US";
    tagsOfAllLocales?: boolean;
    samples?: boolean;
    judgeInfo?: boolean;
    judgeInfoToBePreprocessed?: boolean;
    testData?: boolean;
    additionalFiles?: boolean;
    statistics?: boolean;
    discussionCount?: boolean;
    permissionOfCurrentUser?: boolean;
    permissions?: boolean;
    lastSubmissionAndLastAcceptedSubmission?: boolean;
  }
  export interface GetProblemResponseDto {
    error?: "PERMISSION_DENIED" | "NO_SUCH_PROBLEM";
    meta?: ApiTypes.ProblemMetaDto;
    owner?: ApiTypes.UserMetaDto;
    localizedContentsOfLocale?: ApiTypes.ProblemLocalizedContentDto;
    localizedContentsOfAllLocales?: ApiTypes.ProblemLocalizedContentDto[];
    tagsOfLocale?: ApiTypes.LocalizedProblemTagDto[];
    tagsOfAllLocales?: ApiTypes.ProblemTagWithAllLocalesDto[];
    samples?: ApiTypes.ProblemSampleDataMemberDto[];
    judgeInfo?: {};
    submittable?: boolean;
    testData?: ApiTypes.ProblemFileDto[];
    additionalFiles?: ApiTypes.ProblemFileDto[];
    discussionCount?: number;
    permissionOfCurrentUser?: (
      | "View"
      | "Modify"
      | "ManagePermission"
      | "ManagePublicness"
      | "Delete"
    )[];
    permissions?: ApiTypes.ProblemPermissionsDto;
    lastSubmission?: ApiTypes.ProblemLastSubmissionDto;
  }
  export interface GetProblemTagDetailRequestDto {
    id: number;
  }
  export interface GetProblemTagDetailResponseDto {
    error?: "NO_SUCH_PROBLEM_TAG";
    id?: number;
    color?: string;
    localizedNames?: ApiTypes.ProblemTagLocalizedNameDto[];
  }
  export interface GetSessionInfoResponseDto {
    userMeta?: ApiTypes.UserMetaDto;
    userPrivileges?: (
      | "EditHomepage"
      | "ManageUser"
      | "ManageProblem"
      | "ManageContest"
      | "ManageDiscussion"
      | "SkipRecaptcha"
    )[];
    serverPreference: ApiTypes.PreferenceConfig;
  }
  export interface GetStandingsDataRequestDto {
    contestId: number;
  }
  export interface GetStandingsDataResponseDto {
    error?: "PERMISSION_DENIED" | "NO_SUCH_CONTEST";
    contestUserList?: ApiTypes.ContestUserMetaDto[];
    submissions?: ApiTypes.SubmissionMetaDto[];
  }
  export interface GetSubmissionDetailRequestDto {
    submissionId: string;
    locale: "en_US";
  }
  export interface GetSubmissionDetailResponseDto {
    error?: "NO_SUCH_SUBMISSION" | "PERMISSION_DENIED";
    meta?: ApiTypes.SubmissionMetaDto;
    content?: {};
    progress?: {};
    progressSubscriptionKey?: string;
    permissionRejudge?: boolean;
    permissionCancel?: boolean;
    permissionSetPublic?: boolean;
    permissionDelete?: boolean;
  }
  export interface GetSubmissionStaticsResponseDto {
    accepted: number[];
    rejected: number[];
  }
  export interface GetUserDetailRequestDto {
    userId?: number;
    username?: string;
    timezone: string;
    now: string;
  }
  export interface GetUserDetailResponseDto {
    error?: "NO_SUCH_USER";
    meta?: ApiTypes.UserMetaDto;
    information?: ApiTypes.UserInformationDto;
    submissionCountPerDay?: number[];
    rank?: number;
    hasPrivilege?: boolean;
  }
  export interface GetUserListRequestDto {
    sortBy: "acceptedProblemCount" | "rating";
    hasContestUser: boolean;
    skipCount: number;
    takeCount: number;
  }
  export interface GetUserListResponseDto {
    error?: "TAKE_TOO_MANY";
    userMetas?: ApiTypes.UserMetaDto[];
    count?: number;
  }
  export interface GetUserMetaRequestDto {
    userId?: number;
    username?: string;
    getPrivileges?: boolean;
  }
  export interface GetUserMetaResponseDto {
    error?: "NO_SUCH_USER";
    meta?: ApiTypes.UserMetaDto;
    privileges?: (
      | "EditHomepage"
      | "ManageUser"
      | "ManageProblem"
      | "ManageContest"
      | "ManageDiscussion"
      | "SkipRecaptcha"
    )[];
  }
  export interface GetUserProfileRequestDto {
    userId?: number;
    username?: string;
  }
  export interface GetUserProfileResponseDto {
    error?: "NO_SUCH_USER" | "PERMISSION_DENIED";
    meta?: ApiTypes.UserMetaDto;
    publicEmail?: boolean;
    avatarInfo?: string;
    information?: ApiTypes.UserInformationDto;
  }
  export interface GetUserSecuritySettingsRequestDto {
    userId?: number;
    username?: string;
  }
  export interface GetUserSecuritySettingsResponseDto {
    error?: "NO_SUCH_USER" | "PERMISSION_DENIED";
    meta?: ApiTypes.UserMetaDto;
  }
  export interface GetVersionDto {
    version: string;
  }
  export interface ImportContestUsersRequestDto {
    contestId: number;
    contestUserList: ApiTypes.ContestUser[];
  }
  export interface ImportContestUsersResponseDto {
    error?: "PERMISSION_DENIED" | "NO_SUCH_CONTEST";
  }
  export interface JudgeClientInfoDto {
    id: number;
    name: string;
    key: string;
    allowedHosts: string[];
    online: boolean;
    systemInfo?: {};
  }
  export interface ListJudgeClientsResponseDto {
    judgeClients: ApiTypes.JudgeClientInfoDto[];
    hasManagePermission: boolean;
  }
  export interface ListUserSessionsRequestDto {
    userId?: number;
    username?: string;
  }
  export interface ListUserSessionsResponseDto {
    error?: "PERMISSION_DENIED";
    sessions?: ApiTypes.UserSessionDto[];
    /**
     * Only available when querying the current user
     */
    currentSessionId?: number;
  }
  export interface LocalizedProblemTagDto {
    id: number;
    name: string;
    color: string;
    nameLocale: "en_US";
  }
  export interface LoginRequestDto {
    username?: string;
    email?: string;
    password: string;
  }
  export interface LoginResponseDto {
    error?:
      | "ALREADY_LOGGEDIN"
      | "NO_SUCH_USER"
      | "WRONG_PASSWORD"
      | "USER_NOT_MIGRATED";
    token?: string;
    username?: string;
    isContestUser?: boolean;
    contestId?: number;
    notificationEmail?: string;
  }
  namespace Parameters {
    export type Email = string;
    export type Jsonp = string;
    export type Now = string;
    export type Query = string;
    export type Timezone = string;
    export type Token = string;
    export type Username = string;
    export type Wildcard = "Start" | "End" | "Both";
  }
  export interface PreferenceConfig {
    siteName: string;
    security: ApiTypes.PreferenceConfigSecurity;
    pagination: ApiTypes.PreferenceConfigPagination;
    misc: ApiTypes.PreferenceConfigMisc;
  }
  export interface PreferenceConfigMisc {
    appLogo: string;
    appLogoForTheme: {};
    googleAnalyticsId: string;
    gravatarCdn: string;
    redirectLegacyUrls: boolean;
    legacyContestsEntryUrl: boolean;
    homepageUserListOnMainView: boolean;
    sortUserByRating: boolean;
    renderMarkdownInUserBio: boolean;
    discussionReactionEmojis: string[];
    discussionReactionAllowCustomEmojis: boolean;
  }
  export interface PreferenceConfigPagination {
    homepageUserList: number;
    homepageProblemList: number;
    problemSet: number;
    searchProblemsPreview: number;
    submissions: number;
    submissionStatistics: number;
    userList: number;
    userAuditLogs: number;
    contestList: number;
    discussions: number;
    searchDiscussionsPreview: number;
    discussionReplies: number;
    discussionRepliesHead: number;
    discussionRepliesMore: number;
  }
  export interface PreferenceConfigSecurity {
    recaptchaEnabled: boolean;
    recaptchaKey: string;
    requireEmailVerification: boolean;
    allowUserChangeUsername: boolean;
    allowEveryoneCreateProblem: boolean;
    allowNonPrivilegedUserEditPublicProblem: boolean;
    allowOwnerManageProblemPermission: boolean;
    allowOwnerDeleteProblem: boolean;
    discussionDefaultPublic: boolean;
    discussionReplyDefaultPublic: boolean;
    allowEveryoneCreateDiscussion: boolean;
  }
  export interface ProblemContentSectionDto {
    sectionTitle: string;
    type: "Text" | "Sample";
    sampleId?: number;
    text?: string;
  }
  export interface ProblemFileDownloadInfoDto {
    filename: string;
    downloadUrl: string;
  }
  export interface ProblemFileDto {
    uuid: string;
    filename: string;
    size?: number;
  }
  export interface ProblemInContestMetaDto {
    orderId: number;
    problemId: number;
    submissionCount?: number;
    acceptedSubmissionCount?: number;
    title: string;
    submission?: ApiTypes.SubmissionBasicMetaDto;
  }
  export interface ProblemLastSubmissionDto {
    lastSubmission?: ApiTypes.SubmissionBasicMetaDto;
    lastSubmissionContent?: {};
    lastAcceptedSubmission?: ApiTypes.SubmissionBasicMetaDto;
  }
  export interface ProblemLocalizedContentDto {
    locale: "en_US";
    title: string;
    contentSections: ApiTypes.ProblemContentSectionDto[];
  }
  export interface ProblemMetaDto {
    id: number;
    displayId?: number;
    type: "Traditional" | "Interaction" | "SubmitAnswer";
    isPublic: boolean;
    publicTime: string; // date-time
    ownerId: number;
    locales: "en_US";
    submissionCount?: number;
    acceptedSubmissionCount?: number;
  }
  export interface ProblemPermissionsDto {
    userPermissions: ApiTypes.ProblemUserPermissionDto[];
  }
  export interface ProblemSampleDataMemberDto {
    inputData: string;
    outputData: string;
  }
  export interface ProblemStatementDto {
    localizedContents: ApiTypes.ProblemLocalizedContentDto[];
    samples: ApiTypes.ProblemSampleDataMemberDto[];
    problemTagIds: number[];
  }
  export interface ProblemTagLocalizedNameDto {
    name: string;
    locale: "en_US";
  }
  export interface ProblemTagWithAllLocalesDto {
    id?: number;
    color?: string;
    localizedNames?: ApiTypes.ProblemTagLocalizedNameDto[];
  }
  export interface ProblemUserPermissionDto {
    user: ApiTypes.UserMetaDto;
    permissionLevel: 1 | 2;
  }
  export interface QueryAuditLogsRequestDto {
    userId?: number;
    username?: string;
    /**
     * The query string for action field, will be matching as prefix.
     */
    actionQuery?: string;
    ip?: string;
    firstObjectId?: number;
    secondObjectId?: number;
    locale: "en_US";
    skipCount: number;
    takeCount: number;
  }
  export interface QueryAuditLogsResponseDto {
    error?: "NO_SUCH_USER" | "PERMISSION_DENIED" | "TAKE_TOO_MANY";
    results?: ApiTypes.QueryAuditLogsResponseItemDto[];
    count?: number;
  }
  export interface QueryAuditLogsResponseItemDto {
    user: ApiTypes.UserMetaDto;
    ip: string;
    ipLocation: string;
    time: string; // date-time
    action: string;
    firstObjectType?:
      | "User"
      | "Group"
      | "Problem"
      | "ProblemTag"
      | "Submission"
      | "Discussion"
      | "DiscussionReply";
    firstObjectId?: number;
    firstObject?: {};
    secondObjectType?:
      | "User"
      | "Group"
      | "Problem"
      | "ProblemTag"
      | "Submission"
      | "Discussion"
      | "DiscussionReply";
    secondObjectId?: number;
    secondObject?: {};
    details?: {};
  }
  export interface QueryDiscussionsRequestDto {
    locale: "en_US";
    keyword?: string;
    /**
     * `null` for global. `-1` for ALL problems.
     */
    problemId?: number;
    publisherId?: number;
    nonpublic?: boolean;
    /**
     * Pass true to return discussion title only. For a preview in search bar.
     */
    titleOnly?: boolean;
    skipCount: number;
    takeCount: number;
  }
  export interface QueryDiscussionsResponseDiscussionDto {
    meta: ApiTypes.DiscussionMetaDto;
    problem?: ApiTypes.QueryDiscussionsResponseProblemDto;
    publisher: ApiTypes.UserMetaDto;
  }
  export interface QueryDiscussionsResponseDto {
    error?:
      | "TAKE_TOO_MANY"
      | "NO_SUCH_PROBLEM"
      | "NO_SUCH_USER"
      | "PERMISSION_DENIED";
    discussions?: ApiTypes.QueryDiscussionsResponseDiscussionDto[];
    permissions?: ApiTypes.QueryDiscussionsResponsePermissionDto;
    count?: number;
    filterPublisher?: ApiTypes.UserMetaDto;
    filterProblem?: ApiTypes.QueryDiscussionsResponseProblemDto;
  }
  export interface QueryDiscussionsResponsePermissionDto {
    createDiscussion?: boolean;
    filterNonpublic?: boolean;
  }
  export interface QueryDiscussionsResponseProblemDto {
    meta: ApiTypes.ProblemMetaDto;
    title: string;
    titleLocale: "en_US";
  }
  export interface QueryParameters {
    timezone: ApiTypes.Parameters.Timezone;
    now: ApiTypes.Parameters.Now;
  }
  export interface QueryProblemSetRequestDto {
    locale: "en_US";
    keyword?: string;
    /**
     * The result item by ID may NOT be included in the count.
     */
    keywordMatchesId?: boolean;
    tagIds?: number[];
    ownerId?: number;
    nonpublic?: boolean;
    /**
     * Pass true to return problem title only. For a preview in search bar.
     */
    titleOnly?: boolean;
    skipCount: number;
    takeCount: number;
  }
  export interface QueryProblemSetResponseDto {
    error?: "PERMISSION_DENIED" | "TAKE_TOO_MANY";
    result?: ApiTypes.QueryProblemSetResponseItemDto[];
    count?: number;
    filterTags?: ApiTypes.LocalizedProblemTagDto[];
    filterOwner?: ApiTypes.UserMetaDto;
    permissions?: ApiTypes.QueryProblemSetResponsePermissionDto;
  }
  export interface QueryProblemSetResponseItemDto {
    meta: ApiTypes.ProblemMetaDto;
    title: string;
    tags?: ApiTypes.LocalizedProblemTagDto[];
    resultLocale?: "en_US";
    submission?: ApiTypes.SubmissionBasicMetaDto;
  }
  export interface QueryProblemSetResponsePermissionDto {
    createProblem?: boolean;
    manageTags?: boolean;
    filterByOwner?: boolean;
    filterNonpublic?: boolean;
  }
  export interface QuerySubmissionRequestDto {
    locale: "en_US";
    problemId?: number;
    problemDisplayId?: number;
    submitter?: string;
    codeLanguage?: string;
    status?:
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
      | "Frozen";
    minId?: number;
    maxId?: number;
    takeCount: number;
  }
  export interface QuerySubmissionResponseDto {
    error?: "NO_SUCH_PROBLEM" | "NO_SUCH_USER" | "NO_SUCH_CONTEST";
    submissions?: ApiTypes.SubmissionMetaDto[];
    hasSmallerId?: boolean;
    hasLargerId?: boolean;
    progressSubscriptionKey?: string;
  }
  export interface QuerySubmissionStatisticsRequestDto {
    locale: "en_US";
    problemId?: number;
    problemDisplayId?: number;
    statisticsType: "Fastest" | "MinMemory" | "MinAnswerSize" | "Earliest";
    skipCount: number;
    takeCount: number;
  }
  export interface QuerySubmissionStatisticsResponseDto {
    error?: "NO_SUCH_PROBLEM" | "PERMISSION_DENIED" | "TAKE_TOO_MANY";
    submissions?: ApiTypes.SubmissionMetaDto[];
    count?: number;
    scores?: number[];
  }
  export interface RegisterContestUserRequestDto {
    contestId: number;
  }
  export interface RegisterContestUserResponseDto {
    error?: "PERMISSION_DENIED" | "NO_SUCH_CONTEST";
  }
  export interface RegisterRequestDto {
    username: string;
    email: string;
    emailVerificationCode?: string;
    password: string;
  }
  export interface RegisterResponseDto {
    error?:
      | "ALREADY_LOGGEDIN"
      | "DUPLICATE_USERNAME"
      | "DUPLICATE_EMAIL"
      | "INVALID_EMAIL_VERIFICATION_CODE"
      | "DISABLE_REGISTER";
    token?: string;
  }
  export interface RejudgeSubmissionRequestDto {
    submissionId: number;
  }
  export interface RejudgeSubmissionResponseDto {
    error?: "NO_SUCH_SUBMISSION" | "PERMISSION_DENIED";
  }
  export interface RemoveProblemFilesRequestDto {
    problemId: number;
    type: "TestData" | "AdditionalFile";
    filenames: string[];
  }
  export interface RemoveProblemFilesResponseDto {
    error?: "NO_SUCH_PROBLEM" | "PERMISSION_DENIED";
  }
  export interface RenameProblemFileRequestDto {
    problemId: number;
    type: "TestData" | "AdditionalFile";
    filename: string;
    newFilename: string;
  }
  export interface RenameProblemFileResponseDto {
    error?: "NO_SUCH_PROBLEM" | "PERMISSION_DENIED" | "NO_SUCH_FILE";
  }
  export type RequestBody = ApiTypes.SwapTwoAnnouncementOrderRequestDto;
  export interface ResetJudgeClientKeyRequestDto {
    id: number;
  }
  export interface ResetJudgeClientKeyResponseDto {
    error?: "PERMISSION_DENIED" | "NO_SUCH_JUDGE_CLIENT";
    key?: string;
  }
  export interface ResetPasswordRequestDto {
    email: string;
    emailVerificationCode?: string;
    newPassword: string;
  }
  export interface ResetPasswordResponseDto {
    error?:
      | "ALREADY_LOGGEDIN"
      | "NO_SUCH_USER"
      | "INVALID_EMAIL_VERIFICATION_CODE";
    token?: string;
  }
  namespace Responses {
    export type $200 = ApiTypes.GetAnnouncementsResponseDto;
    export type $201 = ApiTypes.SwapTwoAnnouncementOrderResponseDto;
  }
  export interface RevokeUserSessionRequestDto {
    userId: number;
    /**
     * Falsy to revoke ALL sessions of the user (except the current session, if the user is current user)
     */
    sessionId?: number;
  }
  export interface RevokeUserSessionResponseDto {
    error?: "PERMISSION_DENIED" | "NO_SUCH_USER";
  }
  export interface SearchUserResponseDto {
    userMetas: ApiTypes.UserMetaDto[];
  }
  export interface SendContestNotificationRequestDto {
    contestId: number;
  }
  export interface SendContestNotificationResponseDto {
    error?: "NO_SUCH_CONTEST" | "PERMISSION_DENIED";
  }
  export interface SendEmailVerificationCodeRequestDto {
    email: string;
    type: "Register" | "ChangeEmail" | "ResetPassword";
    locale: "en_US";
  }
  export interface SendEmailVerificationCodeResponseDto {
    error?:
      | "PERMISSION_DENIED"
      | "DUPLICATE_EMAIL"
      | "NO_SUCH_USER"
      | "ALREADY_LOGGEDIN"
      | "FAILED_TO_SEND"
      | "RATE_LIMITED";
    errorMessage?: string;
  }
  export interface SetDiscussionPermissionsRequestDto {
    discussionId: number;
    userPermissions: ApiTypes.SetDiscussionPermissionsRequestUserPermissionDto[];
  }
  export interface SetDiscussionPermissionsRequestUserPermissionDto {
    userId: number;
    permissionLevel: 1 | 2;
  }
  export interface SetDiscussionPermissionsResponseDto {
    error?:
      | "PERMISSION_DENIED"
      | "NO_SUCH_DISCUSSION"
      | "NO_SUCH_USER"
      | "NO_SUCH_GROUP";
    errorObjectId?: number;
  }
  export interface SetDiscussionPublicRequestDto {
    discussionId: number;
    isPublic: boolean;
  }
  export interface SetDiscussionPublicResponseDto {
    error?: "PERMISSION_DENIED" | "NO_SUCH_DISCUSSION";
  }
  export interface SetDiscussionReplyPublicRequestDto {
    discussionReplyId: number;
    isPublic: boolean;
  }
  export interface SetDiscussionReplyPublicResponseDto {
    error?: "PERMISSION_DENIED" | "NO_SUCH_DISCUSSION_REPLY";
  }
  export interface SetProblemDisplayIdRequestDto {
    problemId: number;
    displayId: number;
  }
  export interface SetProblemDisplayIdResponseDto {
    error?:
      | "PERMISSION_DENIED"
      | "NO_SUCH_PROBLEM"
      | "DUPLICATE_DISPLAY_ID"
      | "PUBLIC_PROBLEM_MUST_HAVE_DISPLAY_ID";
  }
  export interface SetProblemPermissionsRequestDto {
    problemId: number;
    userPermissions: ApiTypes.SetProblemPermissionsRequestUserPermissionDto[];
    groupPermissions: ApiTypes.SetProblemPermissionsRequestGroupPermissionDto[];
  }
  export interface SetProblemPermissionsRequestGroupPermissionDto {
    groupId: number;
    permissionLevel: 1 | 2;
  }
  export interface SetProblemPermissionsRequestUserPermissionDto {
    userId: number;
    permissionLevel: 1 | 2;
  }
  export interface SetProblemPermissionsResponseDto {
    error?:
      | "PERMISSION_DENIED"
      | "NO_SUCH_PROBLEM"
      | "NO_SUCH_USER"
      | "NO_SUCH_GROUP";
    errorObjectId?: number;
  }
  export interface SetProblemPublicRequestDto {
    problemId: number;
    isPublic: boolean;
  }
  export interface SetProblemPublicResponseDto {
    error?: "PERMISSION_DENIED" | "NO_SUCH_PROBLEM" | "NO_DISPLAY_ID";
  }
  export interface SetSubmissionPublicRequestDto {
    submissionId: number;
    isPublic: boolean;
  }
  export interface SetSubmissionPublicResponseDto {
    error?: "NO_SUCH_SUBMISSION" | "PERMISSION_DENIED";
  }
  export interface SetUserPrivilegesRequestDto {
    userId: number;
    privileges: (
      | "EditHomepage"
      | "ManageUser"
      | "ManageProblem"
      | "ManageContest"
      | "ManageDiscussion"
      | "SkipRecaptcha"
    )[];
  }
  export interface SetUserPrivilegesResponseDto {
    error?: "PERMISSION_DENIED" | "NO_SUCH_USER" | "FAILED";
  }
  export interface SignedFileUploadRequestDto {
    uuid: string;
    method: "POST" | "PUT";
    url: string;
    extraFormData?: {};
    fileFieldName?: string;
  }
  export interface SubmissionBasicMetaDto {
    id: number;
    isPublic: boolean;
    codeLanguage: string;
    answerSize: number;
    score: number;
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
      | "Frozen";
    submitTime: string; // date-time
    timeUsed: number;
    memoryUsed: number;
  }
  export interface SubmissionMetaDto {
    id: number;
    isPublic: boolean;
    codeLanguage: string;
    answerSize: number;
    score: number;
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
      | "Frozen";
    submitTime: string; // date-time
    timeUsed: number;
    memoryUsed: number;
    problem: ApiTypes.ProblemMetaDto;
    problemTitle: string;
    submitter: ApiTypes.UserMetaDto;
    progressType?: "Preparing" | "Compiling" | "Running" | "Finished";
  }
  export interface SubmitRequestDto {
    problemId: number;
    contestId?: number;
    content: {};
    uploadInfo?: ApiTypes.FileUploadInfoDto;
  }
  export interface SubmitResponseDto {
    error?:
      | "PERMISSION_DENIED"
      | "NO_SUCH_PROBLEM"
      | "NO_SUCH_CONTEST"
      | "FILE_TOO_LARGE"
      | "FILE_UUID_EXISTS"
      | "FILE_NOT_UPLOADED";
    submissionId?: number;
    signedUploadRequest?: ApiTypes.SignedFileUploadRequestDto;
  }
  export interface SwapTwoAnnouncementOrderRequestDto {
    announcementOrginId: number;
    announcementNewId: number;
  }
  export interface SwapTwoAnnouncementOrderResponseDto {
    error?:
      | "PERMISSION_DENIED"
      | "INVALID_ANNOUNCEMENT_ORGIN_ID"
      | "INVALID_ANNOUNCEMENT_NEW_ID";
  }
  export interface SwapTwoProblemOrderRequestDto {
    contestId: number;
    problemOriginId: number;
    problemNewId: number;
  }
  export interface SwapTwoProblemOrderResponseDto {
    error?:
      | "PERMISSION_DENIED"
      | "INVALID_PROBLEM_ORGIN_ID"
      | "INVALID_PROBLEM_NEW_ID"
      | "NO_SUCH_CONTEST";
  }
  export interface ToggleReactionRequestDto {
    type: "Discussion" | "DiscussionReply";
    id: number;
    emoji: string;
    reaction: boolean;
  }
  export interface ToggleReactionResponseDto {
    error?:
      | "PERMISSION_DENIED"
      | "NO_SUCH_DISCUSSION"
      | "NO_SUCH_DISCUSSION_REPLY"
      | "INVALID_EMOJI";
  }
  export interface UpdateDiscussionReplyRequestDto {
    discussionReplyId: number;
    content: string;
  }
  export interface UpdateDiscussionReplyResponseDto {
    error?: "PERMISSION_DENIED" | "NO_SUCH_DISCUSSION_REPLY";
    editTime?: string; // date-time
  }
  export interface UpdateDiscussionRequestDto {
    discussionId: number;
    title: string;
    content: string;
  }
  export interface UpdateDiscussionResponseDto {
    error?: "PERMISSION_DENIED" | "NO_SUCH_DISCUSSION";
  }
  export interface UpdateProblemJudgeInfoRequestDto {
    problemId: number;
    judgeInfo: {};
    submittable: boolean;
  }
  export interface UpdateProblemJudgeInfoResponseDto {
    error?: "NO_SUCH_PROBLEM" | "PERMISSION_DENIED" | "INVALID_JUDGE_INFO";
    judgeInfoError?: string[];
  }
  export interface UpdateProblemRequestUpdatingLocalizedContentDto {
    locale: "en_US";
    title: string;
    contentSections: ApiTypes.ProblemContentSectionDto[];
  }
  export interface UpdateProblemStatementRequestDto {
    problemId: number;
    localizedContents: ApiTypes.UpdateProblemRequestUpdatingLocalizedContentDto[];
    samples: ApiTypes.ProblemSampleDataMemberDto[];
    problemTagIds: number[];
  }
  export interface UpdateProblemStatementResponseDto {
    error?:
      | "PERMISSION_DENIED"
      | "NO_SUCH_PROBLEM"
      | "NO_SUCH_PROBLEM_TAG"
      | "FAILED";
  }
  export interface UpdateProblemTagRequestDto {
    id: number;
    localizedNames: ApiTypes.ProblemTagLocalizedNameDto[];
    color: string;
  }
  export interface UpdateProblemTagResponseDto {
    error?: "NO_SUCH_PROBLEM_TAG" | "PERMISSION_DENIED";
  }
  export interface UpdateUserPasswordRequestDto {
    userId: number;
    oldPassword?: string;
    password: string;
  }
  export interface UpdateUserPasswordResponseDto {
    error?: "PERMISSION_DENIED" | "NO_SUCH_USER" | "WRONG_OLD_PASSWORD";
  }
  export interface UpdateUserProfileRequestDto {
    userId: number;
    username?: string;
    email?: string;
    publicEmail: boolean;
    avatarInfo: string;
    nickname: string;
    bio: string;
    information: ApiTypes.UserInformationDto;
  }
  export interface UpdateUserProfileResponseDto {
    error?:
      | "PERMISSION_DENIED"
      | "NO_SUCH_USER"
      | "DUPLICATE_USERNAME"
      | "DUPLICATE_EMAIL";
  }
  export interface UpdateUserSelfEmailRequestDto {
    email: string;
    emailVerificationCode?: string;
  }
  export interface UpdateUserSelfEmailResponseDto {
    error?:
      | "PERMISSION_DENIED"
      | "DUPLICATE_EMAIL"
      | "INVALID_EMAIL_VERIFICATION_CODE";
  }
  export interface UserAvatarDto {
    type: "gravatar" | "github" | "qq";
    key: string;
  }
  export interface UserInformationDto {
    organization: string;
    location: string;
    url: string;
    telegram: string;
    qq: string;
    github: string;
  }
  export interface UserMetaDto {
    id: number;
    username: string;
    email: string;
    nickname: string;
    bio: string;
    avatar: ApiTypes.UserAvatarDto;
    isAdmin: boolean;
    acceptedProblemCount: number;
    submissionCount: number;
    rating: number;
    registrationTime: string; // date-time
  }
  export interface UserSessionDto {
    sessionId: number;
    loginIp: string;
    loginIpLocation: string;
    userAgent: string;
    loginTime: number;
    lastAccessTime: number;
  }
}
