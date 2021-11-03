import style from "./Footer.module.less";
import packages from "@/../package.json";
import { GithubIcon } from "@/icons";
import React, { useEffect, useState } from "react";

import api from "@/api";

const Footer: React.FC<{}> = (props) => {
  const [apiVersion, setApiVersion] = useState("Loading");

  async function getApiVersion() {
    const { requestError, response } = await api.app.getVersion();
    if (response) {
      setApiVersion(response.version);
    }
  }

  useEffect(() => {
    getApiVersion();
  }, []);

  return (
    <footer className={style.footer}>
      <div className={style.name}>Powered By JudgeQ</div>
      <div className={style.version}>
        WebApp: {packages.version} | API: {apiVersion}
      </div>
      <div className={style.icon}>
        <a
          className={style.github}
          title="GitHub"
          target="_blank"
          rel="noreferrer noopener"
          href="https://github.com/JudgeQ-Dev/JudgeQ"
        >
          <GithubIcon />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
