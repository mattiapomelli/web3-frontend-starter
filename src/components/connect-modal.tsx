import classNames from "classnames";
import { Connector, useConnect } from "wagmi";

import { Modal, BaseModalProps } from "@components/basic/modal";
import BrowserWalletIcon from "@icons/browser-wallet.svg";
import MetaMaskIcon from "@icons/metamask.svg";
import WalletConnectIcon from "@icons/walletconnect.svg";

interface ConnectorIconProps {
  name: string;
  className?: string;
}

const ConnectorIcon = ({ name, className }: ConnectorIconProps) => {
  switch (name) {
    case "WalletConnect":
      return <WalletConnectIcon className={className} />;
    case "MetaMask":
      return <MetaMaskIcon className={className} />;
    default:
      return <BrowserWalletIcon className={className} />;
  }
};

export const ConnectModal = ({ open, onClose }: BaseModalProps) => {
  const { connectors, connectAsync, error } = useConnect();

  const onConnect = async (connector: Connector) => {
    if (connector.ready) {
      try {
        await connectAsync({ connector });
        onClose();
      } catch (error) {
        console.error("Error while connecting", error);
      }
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h4 className="mb-4 text-xl font-bold">Connect your wallet</h4>
      <div className="flex flex-col gap-3">
        {connectors.map((connector) => (
          <button
            key={connector.id}
            onClick={() => onConnect(connector)}
            className={classNames(
              "bg-base-200 flex items-center px-4 py-3 rounded-btn gap-4 ",
              connector.ready
                ? "hover:bg-base-300"
                : "cursor-not-allowed opacity-60",
            )}
          >
            <ConnectorIcon name={connector.name} className="text-3xl" />
            {connector.name === "Injected" ? "Browser Wallet" : connector.name}
            {!connector.ready && " (Unsupported)"}
          </button>
        ))}
      </div>
      {error && <div className="mt-4 text-error">{error.message}</div>}
    </Modal>
  );
};
