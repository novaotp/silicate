
"use client";

import { useEffect } from 'react';
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";

const Page = (): void => {
  const router = useRouter();

  useEffect(() => {
    deleteCookie('id');
    router.push('/auth/log-in');
  }, []);
}

export default Page;
