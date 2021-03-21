import React, { lazy, Suspense } from "react";
import type { MarkDownEditorProps } from "./MarkDownEditor";
import LoadingStyle from "@/less/Loading.module.less";
import Loading from "@/components/Loading";

export type { MarkDownEditorProps } from "./MarkDownEditor";

const load = () => import("./MarkDownEditor");
const MarkDownEditor = lazy(load);

export interface LazyMarkDownEditorProps extends MarkDownEditorProps {
  loading?: boolean;
}

const LazyMarkDownEditor: React.FC<LazyMarkDownEditorProps> = (props) => {
  const loading = (
    <div
      className={LoadingStyle.center}
      style={{
        height: parseInt(props.height) ?? 500,
      }}
    >
      <Loading />
    </div>
  );
  return (
    <Suspense fallback={loading}>
      <MarkDownEditor {...props} />
    </Suspense>
  );
};

export default Object.assign(LazyMarkDownEditor, {
  load,
});
