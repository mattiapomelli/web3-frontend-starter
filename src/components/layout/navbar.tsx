import { Transition } from "@headlessui/react";
import Link from "next/link";

import { Avatar } from "@components/basic/avatar";
import { Button } from "@components/basic/button";
import { Logo } from "@components/basic/logo";
import { ThemeToggle } from "@components/basic/theme-toggle";
import { useUser } from "@contexts/auth-provider";
import { useTransitionControl } from "@hooks/use-transition-control";

import { Container } from "./container";

export const Navbar = () => {
  const { user, loading } = useUser();

  const [show] = useTransitionControl(loading);

  return (
    <header className="flex h-20 items-center">
      <Container className="flex w-full items-center justify-between">
        <Logo />
        <Transition
          show={show}
          enter="transition-opacity duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {user ? (
              <Avatar user={user} />
            ) : (
              <Link href="/signup">
                <a>
                  <Button>Get started</Button>
                </a>
              </Link>
            )}
          </div>
        </Transition>
      </Container>
    </header>
  );
};
