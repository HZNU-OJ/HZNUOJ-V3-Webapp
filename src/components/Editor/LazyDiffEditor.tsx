import React, { lazy, Suspense } from "react";
import type { DiffEditorProps } from "./DiffEditor";
import LoadingStyle from "@/less/Loading.module.less";
import Loading from "@/components/Loading";

export type { DiffEditorProps } from "./DiffEditor";

const load = () => import("./DiffEditor");
const DiffEditor = lazy(load);

export interface LazyCodeEditorProps extends DiffEditorProps {
  placeholderHeight?: number;
  loading?: boolean;
}

const LazyDiffEditor: React.FC<LazyCodeEditorProps> = (props) => {
  const loading = (
    <div
      className={LoadingStyle.center}
      style={{
        height: props.placeholderHeight ?? 480,
      }}
    >
      <Loading />
    </div>
  );
  return (
    <Suspense fallback={loading}>
      <DiffEditor {...props} />
    </Suspense>
  );
};

export default Object.assign(LazyDiffEditor, {
  load,
});
