import { useChainId, useContract, useProvider, useSigner } from "wagmi";

import { StorageAbi } from "@abis/storage";
import { STORAGE_ADDRESS } from "@constants/addresses";

export const useKnowledgeLayerCourse = (withSigner = false) => {
  const chainId = useChainId();
  const provider = useProvider();
  const { data: signer } = useSigner();

  return useContract({
    address: STORAGE_ADDRESS[chainId],
    abi: StorageAbi,
    signerOrProvider: withSigner ? signer : provider,
  });
};
