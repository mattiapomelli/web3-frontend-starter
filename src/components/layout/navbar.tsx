import { Transition } from "@headlessui/react";
import { useState } from "react";
import { useAccount, useEnsName } from "wagmi";

import { Button } from "@components/basic/button";
import { Logo } from "@components/basic/logo";
import { ThemeToggle } from "@components/basic/theme-toggle";
import { ConnectModal } from "@components/connect-modal";
import { useTransitionControl } from "@hooks/use-transition-control";

import { Container } from "./container";

export const Navbar = () => {
  const { address, isConnected, isConnecting, isReconnecting } = useAccount();
  const { data: ensName } = useEnsName({ address });

  const [show] = useTransitionControl(isReconnecting || isConnecting);

  const [showModal, setShowModal] = useState(false);

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
              <>
                <Button onClick={() => setShowModal(true)}>Connect</Button>
                <ConnectModal
                  open={showModal}
                  onClose={() => setShowModal(false)}
                />
              </>
            )}
          </div>
        </Transition>
      </Container>
    </header>
  );
};
