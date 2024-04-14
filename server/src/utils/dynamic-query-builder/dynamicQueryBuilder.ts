export interface BuildPatchObject {
    /** The targeted column in the database. */
    column: string,
    /** The value for the row. */
    value: unknown
}

/**
 * Builds patch statements programmatically, only leaving out `undefined` values.
 * @param entries A key-value object array to build from.
 * @returns The statement as a string and the next unused id.
 * @example
 * const entries: BuildPatchObject[] = [
 *      { column: "firstName", value: "test" },
 *      { column: "lastName", value: undefined },
 *      { column: "email", value: "test@silicate.com" },
 *      { column: "password", value: null }
 * ];
 *
 * buildPatchStatements(entries);
 * // returns "firstName = $1, email = $2, password = $3";
 */
export const buildPatchStatements = (entries: BuildPatchObject[]) => {
    const statements: string[] = [];
    let id = 1;

    entries.forEach(({ column, value }) => {
        if (value !== undefined) {
            statements.push(`${column} = $${id++}`);
        }
    });

    return {
        statements: statements.join(", "),
        id: id
    };
}

/**
 * Builds patch values programmatically, only leaving out `undefined` values.
 * @param entries A key-value object array to build from.
 * @returns The values as an array.
 * @example
 * const entries: BuildPatchObject[] = [
 *      { column: "firstName", value: "test" },
 *      { column: "lastName", value: undefined },
 *      { column: "email", value: "test@silicate.com" },
 *      { column: "password", value: null }
 * ];
 *
 * buildPatchValues(entries);
 * // returns ["test", "test@silicate.com", null];
 */
export const buildPatchValues = (entries: BuildPatchObject[]) => {
    const values: unknown[] = [];

    entries.forEach(({ value }) => {
        if (value !== undefined) {
            values.push(value);
        }
    });

    return values;
}
