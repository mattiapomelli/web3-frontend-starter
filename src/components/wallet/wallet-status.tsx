import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

import { Button } from "@components/basic/button";

import { WalletDropdown } from "./wallet-dropdown";

export const WalletStatus = () => {
  const { address } = useAccount();

  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal }) => {
        const connected = account && chain;

        if (connected && address) {
          return <WalletDropdown address={address} />;
        }

        return <Button onClick={openConnectModal}>Connect Wallet</Button>;
      }}
    </ConnectButton.Custom>
  );
};
