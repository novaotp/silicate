import { type BuildPatchObject, buildPatchStatements, buildPatchValues } from './dynamicQueryBuilder';

describe("Testing dynamic query builder functions.", () => {
    it("Builds statements string correctly.", () => {
        const entries: BuildPatchObject[] = [
            { column: "firstName", value: "test" },
            { column: "lastName", value: undefined },
            { column: "email", value: "test@silicate.com" },
            { column: "password", value: null }
        ];

        const expected = "firstName = $1, email = $2, password = $3";

        expect(buildPatchStatements(entries).statements).toBe(expected);
    });

    it("Builds values array correctly.", () => {
        const entries: BuildPatchObject[] = [
            { column: "firstName", value: "test" },
            { column: "lastName", value: undefined },
            { column: "email", value: "test@silicate.com" },
            { column: "password", value: null }
        ];

        const expected = ["test", "test@silicate.com", null];

        expect(buildPatchValues(entries)).toStrictEqual(expected);
    });
});
