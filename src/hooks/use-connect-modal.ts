import { atom, useSetAtom } from "jotai";

export const connectModalAtom = atom(false);

export const useConnectModal = () => {
  const setShowConnectModal = useSetAtom(connectModalAtom);
  return () => setShowConnectModal(true);
};
