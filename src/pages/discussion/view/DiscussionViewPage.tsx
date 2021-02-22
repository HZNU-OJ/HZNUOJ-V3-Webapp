import React from "react";
import MarkdownContent from "@/markdown/MarkdownContent";
import { useParams } from "umi";

import styles from "./DiscussionViewPage.module.less";

const markdownContent = `

# H1
## H2
### H3
#### H4
##### H5


$$
\\begin{eqnarray*}
f(x) = 2^x
\\end{eqnarray*}
$$

- 2
- 3

@Dup4


\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
\`\`\`

$f(x) = 3^x$

有 $n$ 个人物

https://wi-ki.top
`;

interface DiscussionViewPageParams {
  id: string;
}

const DiscussionViewPage: React.FC<{}> = (props) => {
  const params = useParams() as DiscussionViewPageParams;
  console.log(params.id);
  return (
    <div className={styles.root}>
      <div className={styles.secondRoot}>
        <MarkdownContent content={markdownContent} />
      </div>
    </div>
  );
};

export default DiscussionViewPage;
