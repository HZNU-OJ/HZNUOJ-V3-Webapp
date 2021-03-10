import React, { lazy, Suspense } from "react";
import type { CodeBoxEditorProps } from "./CodeBoxEditor";
import LoadingStyle from "@/less/Loading.module.less";
import Loading from "@/components/Loading";

export type { CodeBoxEditorProps } from "./CodeBoxEditor";

const load = () => import("./CodeBoxEditor");
const CodeBoxEditor = lazy(load);

export interface LazyCodeBoxEditorProps extends CodeBoxEditorProps {
  loading?: boolean;
}

const LazyCodeBoxEditor: React.FC<LazyCodeBoxEditorProps> = (props) => {
  const loading = (
    <div
      className={LoadingStyle.center}
      style={{
        height: parseInt(props.height) ?? 480,
      }}
    >
      <Loading />
    </div>
  );
  return (
    <Suspense fallback={loading}>
      <CodeBoxEditor {...props} />
    </Suspense>
  );
};

export default Object.assign(LazyCodeBoxEditor, {
  load,
});
