import { useNetwork } from "wagmi";

import { StorageAbi } from "@abis/Storage";
import { STORAGE_ADDRESS } from "@constants/addresses";
import { CHAIN } from "@constants/chains";

export const useStorageContractParams = () => {
  const { chain } = useNetwork();
  const currentChain = chain ?? CHAIN;

  return {
    address: STORAGE_ADDRESS[currentChain.id],
    abi: StorageAbi,
  };
};
