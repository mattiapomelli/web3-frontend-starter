import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

import { User } from "@api/users";
import { useUser } from "@contexts/auth-provider";
import { PageAuth } from "@types";

/**
 * Checks if a user can access a page or not based on the page auth
 * @param user The user to check
 * @param auth The page auth
 * @returns Whether the user can access the page or not, and the link to redirect to if can't access
 */
const checkAccess = (user: User | null, auth: PageAuth): [boolean, string] => {
  switch (auth) {
    case PageAuth.Public:
      return [true, ""];

    case PageAuth.Private:
      if (user) return [true, ""];
      return [false, "/login"];

    case PageAuth.Admin:
      if (user?.isAdmin) return [true, ""];
      return [false, user ? "/" : "/login"];

    case PageAuth.UnPrivate:
      if (!user) return [true, ""];
      return [false, "/"];
  }
};

/**
 * @param auth The page auth
 * @returns Whether the page should wait for the user to be loaded or not to render
 */
const requiresLoading = (auth: PageAuth) => {
  switch (auth) {
    case PageAuth.Public:
      return false;
    case PageAuth.Private:
      return true;
    case PageAuth.UnPrivate:
      return false;
    case PageAuth.Admin:
      return true;
  }
};

interface AuthGuardProps {
  auth?: PageAuth;
  children: ReactNode;
}

export const AuthGuard = ({
  auth = PageAuth.Public,
  children,
}: AuthGuardProps) => {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    // Check if the user can access the page
    const [hasAccess, redirectTo] = checkAccess(user, auth);

    if (!hasAccess) {
      router.push(redirectTo);
    }
  }, [user, loading, auth, router]);

  // If the page requires loading and the user has not access, don't render the page
  if (!checkAccess(user, auth)[0] && requiresLoading(auth)) {
    return null;
  }

  return <>{children}</>;
};
