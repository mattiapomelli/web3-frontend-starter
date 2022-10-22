import React from "react";
import { useContractRead } from "wagmi";

import { useStorageContractParams } from "@hooks/use-storage-contract-params";

import type { NextPage } from "next";

const Home: NextPage = () => {
  const params = useStorageContractParams();
  const { data } = useContractRead({
    ...params,
    functionName: "getData",
  });

  return (
    <div>
      <div>{data}</div>
    </div>
  );
};

export default Home;
