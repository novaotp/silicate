/** Builds a url with query params. */
export const buildUrl = (url: string, query: Record<string, string>) => {
    const queryEntries = Object.entries(query);

    if (queryEntries.length === 0) {
        return url;
    }

    const params = queryEntries.map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join("&");

    return `${url}?${params}`;
}
