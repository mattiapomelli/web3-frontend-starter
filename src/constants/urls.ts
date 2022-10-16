import { chain } from "wagmi";

import { CHAIN, ChainMap } from "./chains";

if (!process.env.NEXT_PUBLIC_ALCHEMY_API_KEY) {
  throw new Error("ALCHEMY_KEY envinronment variable must be defined");
}

export const ALCHEMY_KEY = process.env.NEXT_PUBLIC_ALCHEMY_KEY;

export const ALCHEMY_RPC_URL: ChainMap = {
  [chain.goerli.id]: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_KEY}`,
  [chain.mainnet.id]: `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`,
};

export const EXPLORER_URL: ChainMap = {
  [chain.goerli.id]: "https://goerli.etherscan.io/",
  [chain.mainnet.id]: "https://etherscan.io",
};

export const getAddressExplorerLink = (address: string) => {
  return `${EXPLORER_URL[CHAIN.id]}/address/${address}`;
};
