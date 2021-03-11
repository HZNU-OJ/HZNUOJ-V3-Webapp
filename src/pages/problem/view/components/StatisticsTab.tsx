import React, { useState } from "react";
import { useScreenWidthWithin } from "@/utils/hooks";

import { ExampleBox } from "@/components/ExampleBox";

const input = `3
8.19 1.47 3.83 3.91 12.25 2.26 1.71 4.57 7.10 0.14 0.41 3.77 3.34 7.06 7.26 2.89 0.09 6.85 6.36 9.41 2.58 1.09 1.59 0.21 1.58 0.08
Thisisaexample
8.19 1.47 3.83 3.91 12.25 2.26 1.71 4.57 7.10 0.14 0.41 3.77 3.34 7.06 7.26 2.89 0.09 6.85 6.36 9.41 2.58 1.09 1.59 0.21 1.58 0.08
AertrtsaBereDET
8.19 1.47 3.83 3.91 12.25 2.26 1.71 4.57 7.10 0.14 0.41 3.77 3.34 7.06 7.26 2.89 0.09 6.85 6.36 9.41 2.58 1.09 1.59 0.21 1.58 0.08
Thequickbrownfoxjumpsoverthelazydog`;

const output = `case #0:
eeTaaiisshlmpx
case #1:
eeeEttTaArrrsDB
case #2:
eeetTaooooinrrshhdclmpuufgwybvkxjqz`;

const StatisticsTab: React.FC<{}> = (props) => {
  const isMobile = useScreenWidthWithin(0, 577);

  return <ExampleBox input={input} output={output} />;
};

export { StatisticsTab };
