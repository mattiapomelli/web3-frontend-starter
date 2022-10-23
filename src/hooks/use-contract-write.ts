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
  Omit<
    UseContractWriteConfig<TAbi, TFunctionName>,
    PrepareArgs | "mode" | "request"
  >;

export const useContractWrite = <
  TAbi extends Abi,
  TFunctionName extends string,
>(
  config: Config<TAbi, TFunctionName>,
) => {
  const { onSuccess, onError, onSettled, onMutate, ...restConfig } = config;

  const { config: writeConfig } = usePrepareContractWrite(restConfig);

  const {
    data: contractWriteData,
    isLoading: isLoadingWrite,
    isError: isErrorWrite,
    isSuccess: isSuccessWrite,
    isIdle: isIdleWrite,
    error: errorWrite,
    ...rest
  } = useContractWriteBase({
    ...writeConfig,
    onSuccess,
    onError,
    onSettled,
    onMutate,
  } as UseContractWriteConfig<TAbi, TFunctionName>);

  const {
    data,
    isLoading: isLoadingWait,
    isError: isErrorWait,
    isSuccess: isSuccessWait,
    isIdle: isIdleWait,
    error: errorWait,
  } = useWaitForTransaction({
    hash: contractWriteData?.hash,
  });

  return {
    data,
    isLoading: isLoadingWrite || isLoadingWait,
    isError: isErrorWrite || isErrorWait,
    isSuccess: isSuccessWrite && isSuccessWait,
    isIdle: isIdleWrite && isIdleWait,
    error: errorWrite || errorWait,
    ...rest,
  };
};
