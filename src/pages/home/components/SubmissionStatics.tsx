import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";

function getChartObj() {
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
        data: [122, 222, 333, 4440, 1024, 666, 555],
      },
      {
        name: "Rejected",
        showInLegend: false,
        data: [1000, 2000, 3000, 8000, 7000, 6000, 5000],
      },
    ],
  };
}

const SubmissionStatics: React.FC<{}> = (props) => {
  return (
    <div className="am-panel am-panel-primary" style={{ fontSize: 15 }}>
      <div className="am-panel-hd" style={{ padding: "2px 5px", fontSize: 16 }}>
        Submission Statics
      </div>
      <div className="am-panel-bd">
        <HighchartsReact highcharts={Highcharts} options={getChartObj()} />
      </div>
    </div>
  );
};

export { SubmissionStatics };
