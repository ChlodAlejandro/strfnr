// noinspection SpellCheckingInspection

import {stringMatches} from "../index";

describe("stringMatches", () => {

    const str = "ABCDEFGHIDEFJKL";

    test("basic search", () => {
        const match = stringMatches(str, "DEF");
        expect(match.offset.length).toBe(2);
        expect(match.offset[0].start).toBe(3);
        expect(match.offset[0].end).toBe(6);
        expect(match.offset[1].start).toBe(9);
        expect(match.offset[1].end).toBe(12);
        expect(match.offset[0].filter).toBe("DEF");
        expect(match.offset[1].filter).toBe("DEF");
        expect(`${match}`).toBe(str);
        expect(`${match.final()}`).toBe(str);
    });

    test("remove", () => {
        const match = stringMatches(str, "DEF");
        match.remove();
        expect(`${match}`).toBe("ABCGHIJKL");
        expect(`${match.final()}`).toBe("ABCGHIJKL");
        expect(match.offset[0].start).toBe(3);
        expect(match.offset[0].end).toBe(3);
        expect(match.offset[1].start).toBe(6);
        expect(match.offset[1].end).toBe(6);
    });

    test("replace", () => {
        const match = stringMatches(str, "DEF");
        match.replace("WXYZ");
        expect(`${match}`).toBe("ABCWXYZGHIWXYZJKL");
        expect(`${match.final()}`).toBe("ABCWXYZGHIWXYZJKL");
        expect(match.offset[0].start).toBe(3);
        expect(match.offset[0].end).toBe(7);
        expect(match.offset[1].start).toBe(10);
        expect(match.offset[1].end).toBe(14);
    });

    test("before", () => {
        const match = stringMatches(str, "DEF");
        match.before("XYZ");
        expect(`${match}`).toBe("ABCXYZDEFGHIXYZDEFJKL");
        expect(`${match.final()}`).toBe("ABCXYZDEFGHIXYZDEFJKL");
        expect(match.offset[0].start).toBe(6);
        expect(match.offset[0].end).toBe(9);
        expect(match.offset[1].start).toBe(15);
        expect(match.offset[1].end).toBe(18);
    });

    test("after", () => {
        const match = stringMatches(str, "DEF");
        match.after("XYZ");
        expect(`${match}`).toBe("ABCDEFXYZGHIDEFXYZJKL");
        expect(`${match.final()}`).toBe("ABCDEFXYZGHIDEFXYZJKL");
        expect(match.offset[0].start).toBe(3);
        expect(match.offset[0].end).toBe(6);
        expect(match.offset[1].start).toBe(12);
        expect(match.offset[1].end).toBe(15);
    });

    test("remove + replace", () => {
        const match = stringMatches(str, "DEF");
        match.remove().replace("WXYZ");
        expect(`${match}`).toBe("ABCWXYZGHIWXYZJKL");
        expect(`${match.final()}`).toBe("ABCWXYZGHIWXYZJKL");
        expect(match.offset[0].start).toBe(3);
        expect(match.offset[0].end).toBe(7);
        expect(match.offset[1].start).toBe(10);
        expect(match.offset[1].end).toBe(14);
    });

});
