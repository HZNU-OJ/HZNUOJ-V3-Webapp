import React, { useState } from "react";

import ProblemLayout from "./components/ProblemLayout";
import FileUpload from "./components/FileUpload";
import style from "./FilesPage.module.less";

const FilesPage: React.FC<{}> = (props) => {
  return (
    <>
      <ProblemLayout current={"files"}>
        <div>
          <FileUpload name={"Test Data"} />
        </div>
        <div className={style.additionalFiles}>
          <FileUpload name={"Additional Files"} />
        </div>
      </ProblemLayout>
    </>
  );
};

export default FilesPage;
