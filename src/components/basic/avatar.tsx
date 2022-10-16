import cx from "classnames";

import { User } from "@api/users";
import { stringToColour } from "@utils/string-to-color";

export interface AvatarProps {
  user: User;
  className?: string;
  onlyAvatar?: boolean;
}

export const Avatar = ({ user, className }: AvatarProps) => {
  const color = stringToColour(user.username);

  return (
    <div className={cx("flex items-center gap-2 text-left", className)}>
      <div
        style={{ backgroundColor: color }}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full"
      >
        <span className="text-sm uppercase">
          {user.name.charAt(0)}
          {user.surname.charAt(0)}
        </span>
      </div>
      <span className="font-semibold">{user.username}</span>
    </div>
  );
};
