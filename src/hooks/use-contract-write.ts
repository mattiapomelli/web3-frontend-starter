import { Abi } from "abitype";
import {
  useContractWrite as useContractWriteBase,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { UseContractWriteConfig } from "wagmi/dist/declarations/src/hooks/contracts/useContractWrite";
import { UsePrepareContractWriteConfig } from "wagmi/dist/declarations/src/hooks/contracts/usePrepareContractWrite";
import { UseWaitForTransactionConfig } from "wagmi/dist/declarations/src/hooks/transactions/useWaitForTransaction";

type Status = "error" | "success" | "idle" | "loading";

const getStatus = (writeStatus: Status, confirmationStatus: Status): Status => {
  if (writeStatus === "idle") return "idle";

  if (writeStatus === "loading" || confirmationStatus === "loading")
    return "loading";

  if (writeStatus === "error" || confirmationStatus === "error") return "error";

  if (writeStatus === "success" && confirmationStatus === "success")
    return "success";

  return "idle";
};

type PrepareFields =
  | "args"
  | "address"
  | "abi"
  | "functionName"
  | "chainId"
  | "overrides";

type WriteFields = "onError" | "onSettled";

type WaitFields = "onSuccess";

type PrepareArgs<TAbi extends Abi, TFunctionName extends string> = Omit<
  UsePrepareContractWriteConfig<TAbi, TFunctionName>,
  WriteFields | WaitFields
>;

type WriteArgs<TAbi extends Abi, TFunctionName extends string> = Omit<
  UseContractWriteConfig<TAbi, TFunctionName>,
  PrepareFields | WaitFields | "mode" | "request"
>;

type WaitArgs = Pick<UseWaitForTransactionConfig, WaitFields>;

type Config<TAbi extends Abi, TFunctionName extends string> = PrepareArgs<
  TAbi,
  TFunctionName
> &
  WriteArgs<TAbi, TFunctionName> &
  WaitArgs;

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
    status: statusWrite,
    ...rest
  } = useContractWriteBase({
    ...writeConfig,
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
    status: statusWait,
  } = useWaitForTransaction({
    hash: contractWriteData?.hash,
    onSuccess,
  });

  return {
    data,
    isLoading: isLoadingWrite || isLoadingWait,
    isError: isErrorWrite || isErrorWait,
    isSuccess: isSuccessWrite && isSuccessWait,
    isIdle: isIdleWrite && isIdleWait,
    error: errorWrite || errorWait,
    status: getStatus(statusWrite, statusWait),
    ...rest,
  };
};
