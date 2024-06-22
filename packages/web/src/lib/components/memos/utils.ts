import { goto } from "$app/navigation"
import { page } from "$app/stores"
import type { Memo } from "$libs/models/Memo"
import { get, type Writable } from "svelte/store"

// Disabled the warning because the import is needed to reference it
// in the deprecated line but eslint doesn't pick up that information.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { changeSearchParams as _changeSearchParams } from "$utils/change-search-params"

export type MemoPageContext = {
    memos: Writable<Memo[]>,
    categories: Writable<string[]>
}

type ChangeSearchParamsOptions = {
    refetchData?: boolean,
    removeOther?: boolean
}

/**
 * Changes a search param and navigates to the new url. Removes it if it's `''` or `null`.
 * @param key The key of the search param
 * @param value The new value of the search param. Set `null` or `''` to remove it.
 * @param invalidateAll Whether the data should be re-fetched or not.
 * @deprecated Use the generic {@link _changeSearchParams | changeSearchParams}
 */
export const changeSearchParams = (key: string, value: string | number | null, options?: ChangeSearchParamsOptions): void => {
    if (typeof value === "number") {
        value = value.toString();
    }

    const refetchData = options?.refetchData ?? false;
    const removeOther = options?.removeOther ?? false;

    const searchParams = new URLSearchParams(get(page).url.searchParams);

    if (removeOther) {
        if (value === "" || value === null) {
            goto('/app/memos');
            return;
        }

        goto(`/app/memos?${key}=${encodeURI(value)}`, { invalidateAll: refetchData });
        return;
    }

    if (value === '' || value === null) {
        searchParams.delete(key);
    } else {
        searchParams.set(key, encodeURI(value));
    }

    goto(`/app/memos?${searchParams}`, { invalidateAll: refetchData });
}
