import jazzicon from "@metamask/jazzicon";
import cx from "classnames";
import { useLayoutEffect, useMemo, useRef } from "react";

interface AddressAvatarProps {
  address: `0x${string}`;
  size?: number;
  className?: string;
}

export const AddressAvatar = ({
  address,
  size = 16,
  className,
}: AddressAvatarProps) => {
  const iconRef = useRef<HTMLSpanElement>(null);
  const icon = useMemo(
    () => (address ? jazzicon(size, parseInt(address.slice(2, 10), 16)) : null),
    [address, size],
  );

  useLayoutEffect(() => {
    const current = iconRef.current;
    if (icon) {
      current?.appendChild(icon);
    }

    return () => {
      if (icon) {
        current?.removeChild(icon);
      }
    };
  }, [icon, iconRef]);

  return <span ref={iconRef} className={cx("inline-flex", className)} />;
};
