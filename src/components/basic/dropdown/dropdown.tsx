import { Menu, Transition } from "@headlessui/react";
import cx from "classnames";
import Link from "next/link";
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ElementType,
  forwardRef,
  Fragment,
  ReactNode,
} from "react";
import { overrideTailwindClasses } from "tailwind-override";

interface CommonProps {
  children: ReactNode;
  className?: string;
}

interface WrappedLinkProps extends CommonProps {
  href: string;
}

export const WrappedLink = forwardRef<HTMLAnchorElement, WrappedLinkProps>(
  (props, ref) => {
    const { href, children, ...rest } = props;

    return (
      <Link href={href}>
        <a ref={ref} {...rest}>
          {children}
        </a>
      </Link>
    );
  },
);

WrappedLink.displayName = "WrappedLink";

interface DropdownItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  as?: ElementType;
  text: string;
  onClick?: () => void;
}

export const DropdownItem = ({
  as: Tag = "button",
  text,
  ...rest
}: DropdownItemProps) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <Tag
          className={overrideTailwindClasses(
            cx(
              "flex items-center",
              "py-2 px-4",
              "rounded-btn",
              "cursor-pointer",
              "font-medium",
              "bg-base-200",
              "hover:bg-base-300",
              { "bg-base-300": active },
            ),
          )}
          {...rest}
        >
          {text}
        </Tag>
      )}
    </Menu.Item>
  );
};

export const DropdownTrigger = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <Menu.Button {...props}>{children}</Menu.Button>;
};

export const DropdownContent = ({ children, className }: CommonProps) => {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-1"
    >
      <Menu.Items
        className={cx(
          "absolute -right-2 z-20 mt-4",
          "flex flex-col gap-1",
          "min-w-[220px] p-2",
          "rounded-btn",
          "bg-base-200",
          "shadow-lg drop-shadow-white ring-1 ring-white/10 shadow-white/10 focus:outline-none",
          className,
        )}
      >
        {children}
      </Menu.Items>
    </Transition>
  );
};

export const Dropdown = ({ children, className }: CommonProps) => {
  return (
    <Menu as="div" className={cx("relative", className)}>
      {children}
    </Menu>
  );
};
