// noinspection SpellCheckingInspection

import {stringMatches} from "../index";

/*
 * This tests out filter fallback if no matches are found.
 */
describe("stringMatches fallback tests", () => {

    const str = "ABCDEFGHIDEFGHIJKL";

    test("search for DEF", () => {
        const match = stringMatches(str, [
            "DEF"
        ]);
        expect(match.offset.length).toBe(2);
        expect(match.offset[0].start).toBe(3);
        expect(match.offset[0].end).toBe(6);
        expect(match.offset[1].start).toBe(9);
        expect(match.offset[1].end).toBe(12);
        expect(match.offset[0].filter).toBe("DEF");
        expect(match.offset[1].filter).toBe("DEF");
    });

    test("search for GHI", () => {
        const match = stringMatches(str, [
            "GHI"
        ]);
        expect(match.offset.length).toBe(2);
        expect(match.offset[0].start).toBe(6);
        expect(match.offset[0].end).toBe(9);
        expect(match.offset[1].start).toBe(12);
        expect(match.offset[1].end).toBe(15);
        expect(match.offset[0].filter).toBe("GHI");
        expect(match.offset[1].filter).toBe("GHI");
    });

    test("search for DEF and GHI", () => {
        const match = stringMatches(str, [
            "DEF", "GHI"
        ]);
        expect(match.offset.length).toBe(4);
        expect(match.offset[0].start).toBe(3);
        expect(match.offset[0].end).toBe(6);
        expect(match.offset[1].start).toBe(9);
        expect(match.offset[1].end).toBe(12);
        expect(match.offset[2].start).toBe(6);
        expect(match.offset[2].end).toBe(9);
        expect(match.offset[3].start).toBe(12);
        expect(match.offset[3].end).toBe(15);
        expect(match.offset[0].filter).toBe("DEF");
        expect(match.offset[1].filter).toBe("DEF");
        expect(match.offset[2].filter).toBe("GHI");
        expect(match.offset[3].filter).toBe("GHI");
    });

    test("search for DEF, fallback to GHI", () => {
        const match = stringMatches(str, [
            "DEF", "GHI"
        ], {
            filterMode: "first"
        });
        expect(match.offset.length).toBe(2);
        expect(match.offset[0].start).toBe(3);
        expect(match.offset[0].end).toBe(6);
        expect(match.offset[1].start).toBe(9);
        expect(match.offset[1].end).toBe(12);
        expect(match.offset[0].filter).toBe("DEF");
        expect(match.offset[1].filter).toBe("DEF");
    });

    test("search for XYZ, fallback to DEF", () => {
        const match = stringMatches(str, [
            "XYZ", "DEF"
        ], {
            filterMode: "first"
        });
        expect(match.offset.length).toBe(2);
        expect(match.offset[0].start).toBe(3);
        expect(match.offset[0].end).toBe(6);
        expect(match.offset[1].start).toBe(9);
        expect(match.offset[1].end).toBe(12);
        expect(match.offset[0].filter).toBe("DEF");
        expect(match.offset[1].filter).toBe("DEF");
    });

    test("search for XYZ, fallback to GHI", () => {
        const match = stringMatches(str, [
            "XYZ", "GHI"
        ], {
            filterMode: "first"
        });
        expect(match.offset.length).toBe(2);
        expect(match.offset[0].start).toBe(6);
        expect(match.offset[0].end).toBe(9);
        expect(match.offset[1].start).toBe(12);
        expect(match.offset[1].end).toBe(15);
        expect(match.offset[0].filter).toBe("GHI");
        expect(match.offset[1].filter).toBe("GHI");
    });

    test("search for XYZ, fallback to DEF, fallback to GHI", () => {
        const match = stringMatches(str, [
            "XYZ", "DEF", "GHI"
        ], {
            filterMode: "first"
        });
        expect(match.offset.length).toBe(2);
        expect(match.offset[0].start).toBe(3);
        expect(match.offset[0].end).toBe(6);
        expect(match.offset[1].start).toBe(9);
        expect(match.offset[1].end).toBe(12);
        expect(match.offset[0].filter).toBe("DEF");
        expect(match.offset[1].filter).toBe("DEF");
    });

    test("search for DEF, fallback to XYZ, fallback to GHI", () => {
        const match = stringMatches(str, [
            "DEF", "XYZ", "GHI"
        ], {
            filterMode: "first"
        });
        expect(match.offset.length).toBe(2);
        expect(match.offset[0].start).toBe(3);
        expect(match.offset[0].end).toBe(6);
        expect(match.offset[1].start).toBe(9);
        expect(match.offset[1].end).toBe(12);
        expect(match.offset[0].filter).toBe("DEF");
        expect(match.offset[1].filter).toBe("DEF");
    });

    test("search for XYZ, fallback to GHI, fallback to DEF", () => {
        const match = stringMatches(str, [
            "XYZ", "GHI", "DEF"
        ], {
            filterMode: "first"
        });
        expect(match.offset.length).toBe(2);
        expect(match.offset[0].start).toBe(6);
        expect(match.offset[0].end).toBe(9);
        expect(match.offset[1].start).toBe(12);
        expect(match.offset[1].end).toBe(15);
        expect(match.offset[0].filter).toBe("GHI");
        expect(match.offset[1].filter).toBe("GHI");
    });

    test("fallback to GHI, search for XYZ, fallback to DEF", () => {
        const match = stringMatches(str, [
            "GHI", "XYZ", "DEF"
        ], {
            filterMode: "first"
        });
        expect(match.offset.length).toBe(2);
        expect(match.offset[0].start).toBe(6);
        expect(match.offset[0].end).toBe(9);
        expect(match.offset[1].start).toBe(12);
        expect(match.offset[1].end).toBe(15);
        expect(match.offset[0].filter).toBe("GHI");
        expect(match.offset[1].filter).toBe("GHI");
    });

});
