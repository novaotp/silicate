import { byteConverter, toTitleCase } from "./utils";

it("transforms a string to title case correctly", () => {
    const text = "this IS a TeSt";
    const expected = "This Is A Test";

    expect(toTitleCase(text)).toEqual(expected);
});

it("converts a number of bytes to a number between 0 and 999 with the appropriate unit", () => {
    const bytes = 193940594;
    const expected = "184.96 MB";

    expect(byteConverter(bytes, 2)).toEqual(expected);
});
