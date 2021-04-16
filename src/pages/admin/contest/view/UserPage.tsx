import React from "react";
import ContestAdminLayout from "./components/ContestAdminLayout";

const UserPage: React.FC<{}> = (props) => {
  return <ContestAdminLayout current="user"></ContestAdminLayout>;
};

export default UserPage;
