import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { redirect } from "next/navigation";

interface SearchProps {
    initialValue: string;
}

/**
 * Renders a search input box.
 *
 * - Adds it as a param in the url.
 */
export const Search = async ({
    initialValue,
}: SearchProps): Promise<JSX.Element> => {
    const handleSearch = async (formData: FormData) => {
        "use server";

        const searchValue = formData.get("search")?.toString() ?? "";

        if (searchValue === "") {
            redirect("/app/memos");
        }

        redirect(`/app/memos?search=${searchValue}`);
    };

    return (
        <form
            action={handleSearch}
            className='relative flex h-auto w-full flex-col justify-between'
        >
            <div className='relative flex h-[50px] w-full justify-between rounded-lg border border-gray-400'>
                <input
                    className='relative h-full w-[calc(100%-50px)] rounded-l-lg px-4 text-[14px]'
                    type='text'
                    name='search'
                    placeholder='Cherche un mémo...'
                    defaultValue={initialValue}
                />
                <button
                    type='submit'
                    className="after:top-2/5 relative flex aspect-square h-full items-center
                     justify-center after:absolute after:left-0 after:h-3/5
                     after:w-[1px] after:bg-gray-400 after:content-['']"
                >
                    <SearchRoundedIcon />
                </button>
            </div>
        </form>
    );
};
