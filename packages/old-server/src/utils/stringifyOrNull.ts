export const stringifyOrNull = (value: unknown): string | null => {
    return value !== null ? JSON.stringify(value) : null;
}
