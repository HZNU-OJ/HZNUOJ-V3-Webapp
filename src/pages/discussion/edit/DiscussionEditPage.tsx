import React from "react";
import { useParams } from "umi";

interface DiscussionEditParams {
  id: string;
}

const DiscussionEditPage: React.FC<{}> = (props) => {
  const params: DiscussionEditParams = useParams();

  return <></>;
};

export default DiscussionEditPage;
