import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { get } from 'svelte/store';

type ChangeSearchParamsOptions = {
    invalidateAll?: boolean;
    removeOtherParams?: boolean;
};

/**
 * Changes a search param and navigates to the new url.
 * @param key The key of the search param to add/remove.
 * @param value The new value of the search param. Set `null` or `''` to remove it.
 * @param invalidateAll Whether the data should be re-fetched or not.
 */
export const changeSearchParams = (key: string, value: string | number | null, options?: ChangeSearchParamsOptions): void => {
    const pathname = get(page).url.pathname;

    if (typeof value === 'number') {
        value = value.toString();
    }

    const invalidateAll = options?.invalidateAll ?? false;
    const removeOtherParams = options?.removeOtherParams ?? false;

    const searchParams = new URLSearchParams(get(page).url.searchParams);

    if (removeOtherParams) {
        if (value === '' || value === null) {
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
};

/**
 * Changes multiple search params and navigates to the new url.
 * @param params The key-value pairs of the search params to add/remove.
 * @param options Options for invalidating data and removing other params.
 */
export const changeMultipleSearchParams = (params: Record<string, string | number | null>, options?: ChangeSearchParamsOptions): void => {
    const pathname = get(page).url.pathname;

    const invalidateAll = options?.invalidateAll ?? false;
    const removeOtherParams = options?.removeOtherParams ?? false;

    let searchParams = new URLSearchParams(get(page).url.searchParams);

    if (removeOtherParams) {
        searchParams = new URLSearchParams();
    }

    for (const key in params) {
        let value = params[key];

        if (typeof value === 'number') {
            value = value.toString();
        }

        if (value === '' || !value) {
            searchParams.delete(key);
        } else {
            searchParams.set(key, value);
        }
    }

    goto(`${pathname}?${searchParams}`, { invalidateAll });
};
