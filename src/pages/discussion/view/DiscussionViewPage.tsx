import React, { useEffect, useState } from "react";
import LazyMarkdownContent from "@/markdown/LazyMarkdownContent";
import { useParams } from "umi";

import styles from "./DiscussionViewPage.module.less";

import { getJSON } from "@/utils";

const markdownContent = ``;

interface DiscussionViewPageParams {
  id: string;
}

const DiscussionViewPage: React.FC<{}> = (props) => {
  const params = useParams() as DiscussionViewPageParams;

  const [loaded, setLoaded] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    const contentRemote = getJSON("");
    setLoaded(true);
  }, []);

  console.log(params.id);

  return (
    <>
      {loaded == false && <></>}

      {loaded === true && (
        <div className={styles.root}>
          <div className={styles.secondRoot}>
            <LazyMarkdownContent content={markdownContent} />
          </div>
        </div>
      )}
    </>
  );
};

export default DiscussionViewPage;
