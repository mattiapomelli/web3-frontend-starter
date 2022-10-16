import { useAccount, useEnsName, useNetwork, useSwitchNetwork } from "wagmi";

import { Button } from "@components/basic/button";
import { useConnectModal } from "@hooks/use-connect-modal";

export const WalletStatus = () => {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });

  const { chain, chains } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const openConnectModal = useConnectModal();

  // Wrong network
  if (chain?.unsupported) {
    return (
      <Button
        color="error"
        size="sm"
        onClick={() => switchNetwork?.(chains[0].id)}
      >
        Switch to {chains[0].name}
      </Button>
    );
  }

  // Connected (Needs verification or Logged in)
  if (isConnected) {
    return <div>{ensName ?? address}</div>;
  }

  // Disconnected
  return <Button onClick={openConnectModal}>Connect</Button>;
};
