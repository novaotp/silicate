
import { redirect } from "next/navigation";

interface SearchProps {
  initialValue: string
}

/**
 * Renders a search input box.
 * 
 * - Adds it as a param in the url.
 */
export const Search = async ({ initialValue }: SearchProps): Promise<JSX.Element> => {
  const handleSearch = async (formData: FormData) => {
    "use server";

    const searchValue = formData.get('search')?.toString() ?? "";

    if (searchValue === "") {
      redirect(`/app/memos`);
    }

    redirect(`/app/memos?search=${searchValue}`);
  }

  return (
    <form action={handleSearch} className="relative w-full h-auto flex flex-col justify-between">
      <input
        className="relative w-full h-[50px] rounded-lg border border-gray-400 px-4 text-[14px]"
        type="text"
        name="search"
        placeholder="Cherche un mémo..."
        defaultValue={initialValue}
      />
    </form>
  )
}
