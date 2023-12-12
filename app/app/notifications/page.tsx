
"use client";

import { notificationsSupported, subscribe } from "./functions";

const Page = () => {
  if (!notificationsSupported()) {
    return <h3>Please install the PWA first!</h3>
  }

  return (
    <>
      <h3>WebPush PWA</h3>
      <button onClick={subscribe}>Ask permission and subscribe!</button>
    </>
  )
}
