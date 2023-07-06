import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Chain, useNetwork, useSwitchNetwork } from "wagmi";

import { CHAIN_ICON } from "@constants/chains";

import { Button } from "./basic/button";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "./basic/dropdown";

interface ChainIconProps {
  chain: Chain;
  className?: string;
}

const ChainIcon = ({ chain, className }: ChainIconProps) => {
  const Icon = CHAIN_ICON[chain.id];
  return <Icon className={className} />;
};

export const ChainSwitch = () => {
  const { chain, chains } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  return (
    <Dropdown className="inline-flex">
      <DropdownTrigger>
        {!chain || chain.unsupported ? (
          <Button size="sm" color="error">
            Unsupported network
          </Button>
        ) : (
          <span className="rounded-btn flex items-center gap-3 bg-base-200 px-4 py-1.5 font-medium hover:bg-base-300">
            <ChainIcon chain={chain} className="h-6 w-6" />
            <span className="hidden sm:block">{chain?.name}</span>
            <ChevronDownIcon className="h-4 w-4" />
          </span>
        )}
      </DropdownTrigger>
      <DropdownContent className="left-0 mt-4 sm:left-auto">
        {chains.map((chain) => (
          <DropdownItem
            key={chain.id}
            onClick={() => switchNetwork?.(chain.id)}
            className="flex items-center gap-3"
          >
            <ChainIcon chain={chain} className="h-5 w-5" />
            {chain.name}
          </DropdownItem>
        ))}
      </DropdownContent>
    </Dropdown>
  );
};
