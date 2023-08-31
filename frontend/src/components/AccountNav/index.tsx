'use client'

import { useState } from "react";
import TopNavBar from "./components/TopNavBar";
import NavMenu from "./components/NavMenu";

export default function AccountNavigation() {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  return (
    <>
      <TopNavBar openNav={() => setIsNavOpen(true)} />
      <NavMenu isNavOpen={isNavOpen} closeNav={() => setIsNavOpen(false)} />
    </>
  )
}