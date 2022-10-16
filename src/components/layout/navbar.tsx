import { Transition } from "@headlessui/react";
import { useAccount, useConnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

import { Button } from "@components/basic/button";
import { Logo } from "@components/basic/logo";
import { ThemeToggle } from "@components/basic/theme-toggle";
import { useTransitionControl } from "@hooks/use-transition-control";

import { Container } from "./container";

export const Navbar = () => {
  const { address, isConnected, isConnecting, isReconnecting } = useAccount();

  const { data: ensName } = useEnsName({ address });

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const [show] = useTransitionControl(isReconnecting || isConnecting);

  return (
    <header className="flex h-20 items-center">
      <Container className="flex w-full items-center justify-between">
        <Logo />
        <Transition
          show={show}
          enter="transition-opacity duration-250"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {isConnected ? (
              <div>{ensName ?? address}</div>
            ) : (
              <Button onClick={() => connect()}>Connect</Button>
            )}
          </div>
        </Transition>
      </Container>
    </header>
  );
};
