import { useNetwork, useSwitchNetwork } from "wagmi";

import { Button } from "./basic/button";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "./basic/dropdown";

export const ChainSwitch = () => {
  const { chain, chains } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  return (
    <Dropdown className="inline-flex">
      <DropdownTrigger>
        {chain?.unsupported ? (
          <Button size="sm" color="error">
            Unsupported network
          </Button>
        ) : (
          <span className="rounded-btn flex items-center gap-2 bg-base-200 px-4 py-1.5 hover:bg-base-300">
            {chain?.name}
          </span>
        )}
      </DropdownTrigger>
      <DropdownContent className="mt-4">
        {chains.map((chain) => (
          <DropdownItem
            key={chain.id}
            onClick={() => switchNetwork?.(chain.id)}
          >
            {chain.name}
          </DropdownItem>
        ))}
      </DropdownContent>
    </Dropdown>
  );
};
