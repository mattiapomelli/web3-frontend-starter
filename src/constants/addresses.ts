import { hardhat, polygon, polygonMumbai } from "wagmi/chains";

import { ChainMap } from "./chains";

export const STORAGE_ADDRESS: ChainMap = {
  [hardhat.id]: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
  [polygonMumbai.id]: "",
  [polygon.id]: "'",
};
