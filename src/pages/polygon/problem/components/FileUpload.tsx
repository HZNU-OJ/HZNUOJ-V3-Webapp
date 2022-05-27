import React, { useState, useRef, useEffect } from "react";
import { ColumnsType } from "antd/es/table";
import { Table, Button, Row, Col, message, Space, Form } from "antd";
import {
  UploadOutlined,
  DownloadOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import AntTableHeadStyles from "@/less/AntTableHead.module.less";
import { useTableSearch, useRecaptcha } from "@/utils/hooks";
import openUploadDialog from "@/utils/openUploadDialog";
import { isValidFilename } from "@/utils/validators";
import downloadFile from "@/utils/downloadFile";
import { v4 as uuid } from "uuid";
import formatFileSize from "@/utils/formatFileSize";
import { callApiWithFileUpload } from "@/utils/callApiWithFileUpload";
import pAll from "p-all";
import api from "@/api";

type FilesType = "TestData" | "AdditionalFile";
const MAX_UPLOAD_CONCURRENCY = 5;

const ProgressTypeColor = {
  Waiting: "#3e90cc",
  Hashing: "#3e90cc",
  Uploading: "#73d13d",
  Requesting: "#b7eb8f",
  Error: "#ff4d4f",
  Cancelled: "#ffd6e7",
};

function getFilesTypeInDTO(type: FilesType) {
  switch (type) {
    case "TestData":
      return "testData";
    case "AdditionalFile":
      return "additionalFiles";
  }
}

interface FileUploadInfo {
  file: File;
  progressType:
    | "Waiting"
    | "Hashing"
    | "Uploading"
    | "Requesting"
    | "Error"
    | "Cancelled";
  cancel?: () => void;
  progress?: number;
  error?: string;
}

interface FileActionInfo {
  filename: string;
  upload?: FileUploadInfo;
}
interface FileTableItem {
  uuid: string;
  filename: string;
  size: number;
  action: FileActionInfo;
}

enum FilesTableHeadTitle {
  filename = "File Name",
  size = "Size",
  action = "Action",
}

interface FileUploadProps {
  id: number;
  name: string;
  type: FilesType;
}

const FileUpload: React.FC<FileUploadProps> = (props) => {
  const recaptcha = useRecaptcha();

  const [fileList, setFileList] = useState([] as FileTableItem[]);
  const [fetchDataLoaded, setFetchDataLoaded] = useState(false);
  async function fetchData() {
    const { requestError, response } = await api.problem.getProblem({
      id: props.id,
      testData: props.type === "TestData",
      additionalFiles: props.type === "AdditionalFile",
      permissionOfCurrentUser: true,
    });

    if (requestError) {
      message.error(requestError);
    } else if (response.error) {
      message.error(response.error);
    } else {
      let _filesList: FileTableItem[] = [];
      response[getFilesTypeInDTO(props.type)].forEach(
        (file: ApiTypes.ProblemFileDto) => {
          _filesList.push({
            uuid: file.uuid,
            filename: file.filename,
            size: file.size,
            action: {
              filename: file.filename,
            },
          });
        },
      );
      setFileList(_filesList);
    }

    setFetchDataLoaded(true);
    return response;
  }

  useEffect(() => {
    fetchData();
  }, []);

  function transformResponseToFileTableItems(
    fileList: ApiTypes.ProblemFileDto[],
  ): FileTableItem[] {
    return fileList.map((file) => ({
      uuid: uuid(),
      filename: file.filename,
      size: file.size,
      action: {
        filename: file.filename,
      },
    }));
  }

  async function downloadProblemFile(filename: string) {
    if (!filename) return message.error("NO_SUCH_FILE");

    const { requestError, response } = await api.problem.downloadProblemFiles({
      problemId: props.id,
      type: props.type,
      filenameList: [filename],
    });

    if (requestError) {
      return message.error(requestError);
    } else if (response.downloadInfo.length === 0) {
      return message.error("NO_SUCH_FILE");
    }

    downloadFile(response.downloadInfo[0].downloadUrl);
  }

  async function onDeleteFiles(filenames: string[]) {
    const { requestError, response } = await api.problem.removeProblemFiles({
      problemId: props.id,
      type: props.type,
      filenames: filenames,
    });

    if (requestError) {
      message.error(requestError);
      return;
    }

    if (response.error) {
      message.error(response.error);
      return;
    }

    message.success(`deleted successfully`);
    fetchData();
  }

  async function onUploadFiles(files: File[]) {
    const uploadingFilenames = files.map((file) => file.name);
    const uploadingFileList: FileTableItem[] = [];
    for (const file of files) {
      uploadingFileList.push({
        uuid: uuid(),
        filename: file.name,
        size: file.size,
        action: {
          filename: file.name,
          upload: {
            file: file,
            progressType: "Waiting",
          },
        },
      });
    }

    const newFileList = fileList
      .filter((file) => !uploadingFilenames.includes(file.filename))
      .concat(uploadingFileList);
    setFileList(newFileList);

    function updateFileUploadInfo(
      fileUuid: string,
      uploadInfo: Partial<FileUploadInfo>,
    ) {
      setFileList((fileList) => {
        const newFileList = Array.from(fileList);
        for (const i in newFileList) {
          if (newFileList[i].uuid === fileUuid) {
            newFileList[i] = Object.assign({}, fileList[i], {
              action: Object.assign({}, fileList[i].action, {
                upload: uploadInfo
                  ? Object.assign({}, fileList[i].action.upload, uploadInfo)
                  : null,
              }),
            });
            return newFileList;
          }
        }
        return fileList;
      });
    }

    const uploadTasks: Array<() => Promise<void>> = [];
    for (const item of uploadingFileList) {
      uploadTasks.push(async () => {
        const { uploadCancelled, uploadError, requestError, response } =
          await callApiWithFileUpload(
            api.problem.addProblemFile,
            {
              problemId: props.id,
              type: props.type,
              filename: item.filename,
            },
            () => recaptcha("AddProblemFile"),
            item.action.upload.file,
            (progress) =>
              updateFileUploadInfo(item.uuid, {
                progressType: progress.status,
                progress: progress.progress * 100,
              }),
            (cancelFunction) =>
              updateFileUploadInfo(item.uuid, {
                cancel: cancelFunction,
              }),
          );

        if (uploadCancelled) {
          updateFileUploadInfo(item.uuid, {
            progressType: "Cancelled",
            cancel: null,
          });
        } else if (uploadError) {
          console.log("Error uploading file", uploadError);
          updateFileUploadInfo(item.uuid, {
            progressType: "Error",
            error: String(uploadError),
          });
        } else if (requestError) {
          updateFileUploadInfo(item.uuid, {
            progressType: "Error",
            error: requestError,
          });
        } else if (response.error) {
          updateFileUploadInfo(item.uuid, {
            progressType: "Error",
            error: response.error,
          });
        } else updateFileUploadInfo(item.uuid, null);
      });
    }

    await pAll(uploadTasks, {
      concurrency: MAX_UPLOAD_CONCURRENCY,
    });
  }

  // TODO: overriding
  // const [overridingFiles, setOverridingFiles] = useState<string[]>([]);
  // const refDoUpload = useRef<() => void>();
  async function onUploadButtonClick() {
    const uploadingCount = fileList.filter(
      (file) =>
        file.action?.upload &&
        file.action.upload?.progressType !== "Error" &&
        file.action?.upload.progressType !== "Cancelled",
    ).length;

    if (uploadingCount) {
      message.warning("Please wait for the current file upload to complete!");
      return;
    }

    openUploadDialog((files) => {
      if (files.some((file) => !isValidFilename(file.name))) {
        message.error("Invalid Filename");
        return;
      }

      onUploadFiles(files);

      // const doUpload = () => props.onUploadFiles(files);

      // Cancelled and Error uploads will not be shown as overriding
      // const currentFilenames = props.files.filter(file => !file.upload).map(file => file.filename);
      // const overriding = files.map(file => file.name).filter(filename => currentFilenames.includes(filename));
      // if (overriding.length > 0) {
      //   setOverridingFiles(overriding);
      //   refDoUpload.current = doUpload;
      // } else doUpload();
    });
  }

  const columns: ColumnsType<FileTableItem> = [
    {
      title: FilesTableHeadTitle.filename,
      dataIndex: "filename",
      key: "filename",
      width: "60%",
      align: "left",
      ...useTableSearch("filename", FilesTableHeadTitle.filename),
    },
    {
      title: FilesTableHeadTitle.size,
      dataIndex: "size",
      key: "size",
      width: "20%",
      align: "left",
      sorter: (a, b) => a.size - b.size,
      render: (size: number) => formatFileSize(size, 2),
    },
    {
      title: FilesTableHeadTitle.action,
      dataIndex: "action",
      key: "action",
      width: "20%",
      align: "left",
      render: (action: FileActionInfo) => {
        if (action.upload?.progressType) {
          return (
            <div
              style={{
                color: ProgressTypeColor[action.upload.progressType],
              }}
            >
              {action.upload.progressType}
            </div>
          );
        } else {
          return (
            <>
              <Space size={"middle"}>
                <div
                  style={{
                    cursor: "pointer",
                    color: "#3e90cc",
                  }}
                  onClick={() => {
                    downloadProblemFile(action.filename);
                  }}
                >
                  <DownloadOutlined />
                </div>
                <div
                  style={{
                    cursor: "pointer",
                    color: "#3e90cc",
                  }}
                  onClick={() => {
                    onDeleteFiles([action.filename]);
                  }}
                >
                  <DeleteOutlined />
                </div>
              </Space>
            </>
          );
        }
      },
    },
  ];

  return (
    <>
      <div>
        <Row gutter={16} align={"top"}>
          <Col md={12}>
            <div style={{ textAlign: "left" }}>
              <h1>{props.name}</h1>
            </div>
          </Col>
          <Col md={12}>
            <div style={{ textAlign: "right" }}>
              <Button
                type="primary"
                icon={<UploadOutlined />}
                size={"middle"}
                onClick={onUploadButtonClick}
              >
                Upload File
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      <div
        style={{
          fontWeight: "bold",
        }}
      >
        <Table<FileTableItem>
          size="small"
          // scroll={{ x: 1100 }}
          sticky
          columns={columns}
          dataSource={fileList}
          className={AntTableHeadStyles.table}
          rowKey={(record) => record.uuid}
          loading={!fetchDataLoaded}
          pagination={{
            hideOnSinglePage: true,
            showQuickJumper: true,
            showSizeChanger: true,
            defaultPageSize: 8,
            pageSizeOptions: ["8", "16", "32", "64", "128", "256"],
          }}
        />
      </div>
    </>
  );
};

export default FileUpload;
