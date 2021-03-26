import React, { lazy, Suspense } from "react";
import type { ExampleEditorProps } from "./ExampleEditor";
import LoadingStyle from "@/less/Loading.module.less";
import Loading from "@/components/Loading";

export type { ExampleEditorProps } from "./ExampleEditor";

const load = () => import("./ExampleEditor");
const ExampleEditor = lazy(load);

export interface LazyExampleEditorProps extends ExampleEditorProps {
  loading?: boolean;
}

const LazyExampleEditor: React.FC<LazyExampleEditorProps> = (props) => {
  const loading = (
    <div
      className={LoadingStyle.center}
      style={{
        height: props.height ? parseInt(props.height) + 74 : 500,
      }}
    >
      <Loading />
    </div>
  );
  return (
    <Suspense fallback={loading}>
      <ExampleEditor {...props} />
    </Suspense>
  );
};

export default Object.assign(LazyExampleEditor, {
  load,
});
