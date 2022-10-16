import { useDisconnect, useEnsName } from "wagmi";

import { getAddressExplorerLink } from "@constants/urls";
import CopyIcon from "@icons/copy.svg";
import DisconnectIcon from "@icons/disconnect.svg";
import ExternalLinkIcon from "@icons/externallink.svg";
import { copyToClipboard } from "@utils/copy-to-clipboard";

import { Address } from "../address";
import { AddressAvatar } from "../address-avatar";
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
  DropdownItem,
} from "../basic/dropdown";

interface WalletDropdownProps {
  address: `0x${string}`;
}

export const WalletDropdown = ({ address }: WalletDropdownProps) => {
  const { data: ensName } = useEnsName({ address });

  const { disconnect } = useDisconnect();

  return (
    <Dropdown className="inline-flex">
      <DropdownTrigger className="flex items-center gap-2">
        {/* TODO: Add balance */}
        <span>
          {ensName ?? <Address address={address} className="font-medium" />}
        </span>
        <AddressAvatar address={address} />
      </DropdownTrigger>
      <DropdownContent className="mt-10">
        <DropdownItem
          onClick={() => copyToClipboard(address)}
          as="button"
          className="gap-2"
        >
          <CopyIcon />
          Copy address
        </DropdownItem>
        <DropdownItem
          href={getAddressExplorerLink(address)}
          target="_blank"
          rel="noopener noreferrer"
          as="a"
          className="gap-2"
        >
          <ExternalLinkIcon />
          See in explorer
        </DropdownItem>
        <DropdownItem
          as="button"
          onClick={() => disconnect()}
          className="gap-2"
        >
          <DisconnectIcon />
          Disconnect
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
};
