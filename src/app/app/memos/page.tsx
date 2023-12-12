
// Next
import { Metadata } from "next";

// Internal
import { Meta, MemoList, AddButton } from "@/components/app/memos/export";

export const metadata: Metadata = {
  title: "Mes mémos - Silicate"
}

/**
 * Renders the memo page.
 * 
 * - A search box to search for a specific memo
 * - A list of the memos
 * - A button to add a new memo
 */
const Page = (): JSX.Element => {
  return (
    <div className="relative w-full h-full flex flex-col p-5 overflow-hidden">
      <Meta />
      <MemoList />
      <AddButton />
    </div>
  )
}

export default Page;
