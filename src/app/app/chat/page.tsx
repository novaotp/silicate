
"use client";

import { useToast } from "@/libs/contexts/ToastContext";
import useWebSocket from "@/libs/hooks/useWebSocket";

const Page = (): JSX.Element => {
  const { socket } = useWebSocket();
  const { showToast } = useToast();

  return (
    <p>hello chat <button onClick={() => showToast('hey there')}>show toast</button></p>
  )
}

export default Page;
