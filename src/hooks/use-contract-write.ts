import { Abi } from "abitype";
import {
  useContractWrite as useContractWriteBase,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { UseContractWriteConfig } from "wagmi/dist/declarations/src/hooks/contracts/useContractWrite";
import { UsePrepareContractWriteConfig } from "wagmi/dist/declarations/src/hooks/contracts/usePrepareContractWrite";

type PrepareArgs =
  | "args"
  | "address"
  | "abi"
  | "functionName"
  | "chainId"
  | "overrides";

type WriteArgs = "onSuccess" | "onError" | "onSettled";

type Config<TAbi extends Abi, TFunctionName extends string> = Omit<
  UsePrepareContractWriteConfig<TAbi, TFunctionName>,
  WriteArgs
> &
  Omit<UseContractWriteConfig<TAbi, TFunctionName>, PrepareArgs | "mode">;

export const useContractWrite = <
  TAbi extends Abi,
  TFunctionName extends string,
>(
  config: Config<TAbi, TFunctionName>,
) => {
  const { onSuccess, onError, onSettled, onMutate, request, ...restConfig } =
    config;

  const { config: writeConfig } = usePrepareContractWrite(restConfig);

  const { data: contractWriteData, ...rest } = useContractWriteBase({
    ...writeConfig,
    request,
    onSuccess,
    onError,
    onSettled,
    onMutate,
  } as UseContractWriteConfig<TAbi, TFunctionName>);

  const { data } = useWaitForTransaction({
    hash: contractWriteData?.hash,
  });

  return {
    data,
    ...rest,
  };
};
