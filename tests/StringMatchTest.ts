// noinspection SpellCheckingInspection

import {stringMatch} from "../index";

describe("stringMatch", () => {

    const str = "ABCDEFGHIDEFJKL";

    test("basic search", () => {
        const match = stringMatch(str, "DEF");
        expect(match.offset.start).toBe(3);
        expect(match.offset.end).toBe(6);
        expect(match.offset.filter).toBe("DEF");
        expect(`${match}`).toBe(str);
        expect(`${match.final()}`).toBe(str);
    });

    test("RegExp search", () => {
        const match = stringMatch(str, /DEF/g);
        expect(match.offset.start).toBe(3);
        expect(match.offset.end).toBe(6);
        expect(`${match}`).toBe(str);
        expect(`${match.final()}`).toBe(str);
    });

    test("RegExp-like search", () => {
        const match = stringMatch(str, {source: "DEF", flags: "g"});
        expect(match.offset.start).toBe(3);
        expect(match.offset.end).toBe(6);
        expect(`${match}`).toBe(str);
        expect(`${match.final()}`).toBe(str);
    });

    test("remove", () => {
        const match = stringMatch(str, "DEF");
        match.remove();
        expect(`${match}`).toBe("ABCGHIDEFJKL");
        expect(`${match.final()}`).toBe("ABCGHIDEFJKL");
        expect(match.offset.start).toBe(3);
        expect(match.offset.end).toBe(3);
    });

    test("replace", () => {
        const match = stringMatch(str, "DEF");
        match.replace("WXYZ");
        expect(`${match}`).toBe("ABCWXYZGHIDEFJKL");
        expect(`${match.final()}`).toBe("ABCWXYZGHIDEFJKL");
        expect(match.offset.start).toBe(3);
        expect(match.offset.end).toBe(7);
    });

    test("before", () => {
        const match = stringMatch(str, "DEF");
        match.before("XYZ");
        expect(`${match}`).toBe("ABCXYZDEFGHIDEFJKL");
        expect(`${match.final()}`).toBe("ABCXYZDEFGHIDEFJKL");
        expect(match.offset.start).toBe(6);
        expect(match.offset.end).toBe(9);
    });

    test("after", () => {
        const match = stringMatch(str, "DEF");
        match.after("XYZ");
        expect(`${match}`).toBe("ABCDEFXYZGHIDEFJKL");
        expect(`${match.final()}`).toBe("ABCDEFXYZGHIDEFJKL");
        expect(match.offset.start).toBe(3);
        expect(match.offset.end).toBe(6);
    });

    test("remove + replace", () => {
        const match = stringMatch(str, "DEF");
        match.remove().replace("WXYZ");
        expect(`${match}`).toBe("ABCWXYZGHIDEFJKL");
        expect(`${match.final()}`).toBe("ABCWXYZGHIDEFJKL");
        expect(match.offset.start).toBe(3);
        expect(match.offset.end).toBe(7);
    });

    test("no match", () => {
        const match = stringMatch(str, "DEF");
        expect(match.offset.start).toBe(3);
        expect(match.offset.end).toBe(6);
        expect(match.offset.filter).toBe("DEF");
        expect(`${match}`).toBe(str);
        expect(`${match.final()}`).toBe(str);
    });

});
