export const EXPLORER_URL = "https://etherscan.io";

export const getAddressExplorerLink = (address: string) => {
  return `${EXPLORER_URL}/address/${address}`;
};
