import React from "react";

import { IParentProps } from "@/types";

const PageContainer = ({ children }:IParentProps) => {
  return <div className="flex flex-col pt-20 px-20">{children}</div>;
};

export default PageContainer;
