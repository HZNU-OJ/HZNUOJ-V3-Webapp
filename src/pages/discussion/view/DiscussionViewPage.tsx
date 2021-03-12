import React, { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { useParams } from "umi";

import Divider from "@/components/Divider";
import { DiscussionViewHeader, DiscussionBox } from "./components";

import BasicLayout from "@/layouts/BasicLayout";

import style from "./DiscussionViewPage.module.less";

interface DiscussionViewPageParams {
  id: string;
}

const DiscussionViewPage: React.FC<{}> = (props) => {
  const params = useParams() as DiscussionViewPageParams;

  const [loaded, setLoaded] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <BasicLayout current={"discussion"}>
        <div className={style.root}>
          <div className={style.breadCrumb}>
            <Breadcrumb separator=">">
              <Breadcrumb.Item href="">Discussion</Breadcrumb.Item>
              <Breadcrumb.Item href="">General</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <DiscussionViewHeader id={params.id} />
          <Divider />
          <div className={style.boxList}>
            <div className={style.discussionBox}>
              <DiscussionBox />
            </div>
            <div className={style.discussionBox}>
              <DiscussionBox />
            </div>
          </div>
        </div>
      </BasicLayout>
    </>
  );
};

export default DiscussionViewPage;
