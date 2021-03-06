import React, { useEffect } from "react";
import { history } from "umi";
import { message } from "antd";
import Loading from "@/components/Loading";

import api from "@/api";

import { useAuthToken } from "@/utils/hooks";

const LogoutPage: React.FC<{}> = (props) => {
  const { getToken, signOut } = useAuthToken();

  async function logout() {
    const token = getToken();
    if (!token || token == "") {
      message.error("Please login first!");
      history.push("/login");
    } else {
      const { requestError, response } = await api.auth.logout();
      signOut();
      message.success("Logout successfully!");
      history.push("/");
    }
  }

  useEffect(() => {
    logout();
  }, []);

  return (
    <div
      style={{
        height: "calc(100vh)",
        backgroundColor: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Loading />
    </div>
  );
};

export default LogoutPage;
