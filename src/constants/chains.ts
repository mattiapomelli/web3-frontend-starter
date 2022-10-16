import { chain } from "wagmi";

export type ChainMap = { [chainId: number]: string };

const getChain = () => {
  if (!process.env.NEXT_PUBLIC_CHAIN) {
    throw new Error("NEXT_PUBLIC_CHAIN envinronment variable must be defined");
  }

  switch (process.env.NEXT_PUBLIC_CHAIN) {
    case "localhost":
      return chain.hardhat;
    case "testnet":
      return chain.goerli;
    case "mainnet":
      return chain.mainnet;
    default:
      throw new Error("Invalid NEXT_PUBLIC_CHAIN value");
  }
};

export const CHAIN = getChain();
