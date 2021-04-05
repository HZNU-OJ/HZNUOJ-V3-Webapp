import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";

import { getTimeZone } from "@/utils";

import api from "@/api";
import { message, Skeleton } from "antd";

function getChartObj(
  submissionStaticsData: ApiTypes.GetSubmissionStaticsResponseDto,
) {
  return {
    colors: ["#E1FFB5", "#C8D6FA"],
    chart: {
      type: "column",
      backgroundColor: "transparent",
      height: "350px",
    },
    title: {
      text: null,
    },
    xAxis: {
      categories: [
        "6 days ago",
        "5 days ago",
        "4 days ago",
        "3 days ago",
        "2 days ago",
        "Yesterday",
        "Today",
      ],
      labels: {
        style: {
          fontSize: "16px",
        },
      },
      title: {
        text: null,
        style: {
          fontSize: "16px",
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: window.innerWidth < 880 ? null : "Submissions",
        style: {
          fontSize: "16px",
          height: "320px",
        },
      },
      stackLabels: {
        enabled: true,
        style: {
          fontSize: "16px",
        },
      },
    },
    tooltip: {
      enabled: true,
      headerFormat: "",
      pointFormat: "{series.name}：{point.y}",
    },
    plotOptions: {
      bar: {
        stacking: "normal",
      },
      column: {
        stacking: "normal",
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Accepted",
        showInLegend: false,
        data: submissionStaticsData.accepted,
      },
      {
        name: "Rejected",
        showInLegend: false,
        data: submissionStaticsData.rejected,
      },
    ],
  };
}

const SubmissionStatics: React.FC<{}> = (props) => {
  const [submissionStaticsData, setSubmissionStaticsData] = useState({
    accepted: [],
    rejected: [],
  } as ApiTypes.GetSubmissionStaticsResponseDto);
  const [fetchDataLoading, setFetchDataLoading] = useState(true);
  async function fetchData() {
    const now = new Date();
    const { requestError, response } = await api.homepage.getSubmissionStatics({
      timezone: getTimeZone(),
      now: now.toISOString(),
    });

    if (requestError) message.error(requestError);
    else {
      setSubmissionStaticsData(response);
      setFetchDataLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="am-panel am-panel-primary" style={{ fontSize: 15 }}>
      <div className="am-panel-hd" style={{ padding: "2px 5px", fontSize: 16 }}>
        Submission Statics
      </div>
      <div className="am-panel-bd" style={{ marginLeft: -10 }}>
        <Skeleton
          active
          title={true}
          paragraph={{ rows: 8 }}
          loading={fetchDataLoading}
        >
          <HighchartsReact
            highcharts={Highcharts}
            options={getChartObj(submissionStaticsData)}
          />
        </Skeleton>
      </div>
    </div>
  );
};

export { SubmissionStatics };
