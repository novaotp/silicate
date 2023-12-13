
// React + Next
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { Metadata } from "next";

// Internal
import { getMemos } from "@data-access/memo";
import { Loading } from "@components/shared";
import { Search, MemoList, AddButton } from "@components/app/memos/export";

export const metadata: Metadata = {
  title: "Mes mémos - Silicate"
}

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

/**
 * Renders the memo page.
 * 
 * - A search box to search for a specific memo
 * - A list of the memos
 * - A button to add a new memo
 */
const Page = async ({ searchParams }: PageProps): Promise<JSX.Element> => {
  const searchValue = (searchParams["search"] as string) ?? "";
  let memos = await getMemos();

  if (!memos) {
    redirect('/app');
  }

  memos = memos
            .filter(memo => searchValue === "" || memo.title.toLowerCase().includes(searchValue.toLowerCase()))
            .sort((memo1, memo2) => memo2.updated_at.getTime() - memo1.updated_at.getTime());

  return (
    <div className="relative w-full h-full flex flex-col p-5 overflow-hidden">
      <Suspense fallback={<Loading text="Chargement de tes mémos..." />}>
        <Search initialValue={searchValue} />
        <MemoList memos={memos} searchValue={searchValue} />
        <AddButton />
      </Suspense>
    </div>
  )
}

export default Page;
