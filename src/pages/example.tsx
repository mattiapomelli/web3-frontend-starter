import React from "react";
import { useForm } from "react-hook-form";
import { useContractRead } from "wagmi";

import { Button } from "@components/basic/button";
import { Input } from "@components/basic/input";
import { useStorageContractParams } from "@hooks/use-contract-params";
import { useContractWrite } from "@hooks/use-contract-write";

import type { NextPage } from "next";

const Home: NextPage = () => {
  const { register, handleSubmit, reset, watch } = useForm<{
    text: string;
  }>({
    defaultValues: {
      text: "",
    },
  });

  const params = useStorageContractParams();
  const { data, refetch } = useContractRead({
    ...params,
    functionName: "getData",
  });

  const { write, error } = useContractWrite({
    ...params,
    functionName: "setData",
    args: [watch("text")],
    onSuccess() {
      refetch();
      reset();
    },
  });

  const onSubmit = handleSubmit(() => {
    write?.();
  });

  return (
    <div>
      <form onSubmit={onSubmit} className="flex gap-2">
        <Input type="text" {...register("text")} />
        <Button type="submit" disabled={!watch("text")}>
          Update data
        </Button>
      </form>

      <div className="mt-4">Data: {data}</div>
      {error && <div className="text-red-500">{error.message}</div>}
    </div>
  );
};

export default Home;
