
'use client';

// React
import { useState } from "react";

// Internal
import { TopNavBar, AppNavigation, AccountNavigation } from "./_components";

/** The navigation component when the user is logged in. */
export const InsiderNav = () => {
  const [isAppNavOpen, setIsAppNavOpen] = useState<boolean>(false);
  const [isAccountNavOpen, setIsAccountNavOpen] = useState<boolean>(false);

  return (
    <>
      <TopNavBar
        openAppNav={() => setIsAppNavOpen(true)}
        setAccountNavOpen={setIsAccountNavOpen}
      />
      <AppNavigation
        isAppNavOpen={isAppNavOpen}
        closeNav={() => setIsAppNavOpen(false)}
      />
      <AccountNavigation
        isAccountNavOpen={isAccountNavOpen}
        closeNav={() => setIsAccountNavOpen(false)}
      />
    </>
  )
}
