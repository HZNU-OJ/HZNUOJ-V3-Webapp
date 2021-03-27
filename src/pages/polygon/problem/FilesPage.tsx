import React from "react";
import { useParams } from "umi";
import ProblemLayout from "./components/ProblemLayout";
import FileUpload from "./components/FileUpload";
import style from "./FilesPage.module.less";

interface FilesPageParams {
  id: string;
}

const FilesPage: React.FC<{}> = (props) => {
  const params: FilesPageParams = useParams();

  return (
    <>
      <ProblemLayout current={"files"}>
        <div>
          <FileUpload
            id={parseInt(params.id)}
            name={"Test Data"}
            type={"TestData"}
          />
        </div>
        <div className={style.additionalFiles}>
          <FileUpload
            id={parseInt(params.id)}
            name={"Additional Files"}
            type={"AdditionalFile"}
          />
        </div>
      </ProblemLayout>
    </>
  );
};

export default FilesPage;
