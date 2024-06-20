import { goto } from "$app/navigation";
import { page } from "$app/stores";
import { get } from "svelte/store";

type ChangeSearchParamsOptions = {
    invalidateAll?: boolean,
    removeOtherParams?: boolean
}

/**
 * Changes a search param and navigates to the new url.
 * @param key The key of the search param to add/remove.
 * @param value The new value of the search param. Set `null` or `''` to remove it.
 * @param invalidateAll Whether the data should be re-fetched or not.
 */
export const changeSearchParams = (key: string, value: string | number | null, options?: ChangeSearchParamsOptions): void => {
    const pathname = get(page).url.pathname;

    if (typeof value === "number") {
        value = value.toString();
    }

    const invalidateAll = options?.invalidateAll ?? false;
    const removeOtherParams = options?.removeOtherParams ?? false;

    const searchParams = new URLSearchParams(get(page).url.searchParams);

    if (removeOtherParams) {
        if (value === "" || value === null) {
            goto(pathname);
            return;
        }

        goto(`${pathname}?${key}=${value}`, { invalidateAll });
        return;
    }

    if (value === '' || value === null) {
        searchParams.delete(key);
    } else {
        searchParams.set(key, value);
    }

    goto(`${pathname}?${searchParams}`, { invalidateAll });
}
