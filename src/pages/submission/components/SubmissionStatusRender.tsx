import { SubmissionStatus } from "@/interface/SubmissionStatus";
import StatusTextStyle from "@/less/StatusText.module.less";

export function getStatusText(status: SubmissionStatus) {
  return status.replace(/([A-Z])/g, " $1").slice(1);
}

export function SubmissionStatusRender(status: SubmissionStatus) {
  return (
    <span className={StatusTextStyle[status]} style={{ fontWeight: "bold" }}>
      {getStatusText(status)}
    </span>
  );
}
