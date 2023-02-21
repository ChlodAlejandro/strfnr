// noinspection SpellCheckingInspection,DuplicatedCode

import {stringMatches} from "../index";

describe("RegExp stringMatches", () => {

    const str = "your dad smells like a woman";

    test("basic search (RegExp object)", () => {
        const match = stringMatches(str, /\w+/g);
        expect(match.offset.length).toBe(6);

        expect(match.offset[0].start).toBe(0);
        expect(match.offset[0].end).toBe(4);
        expect(match.offset[1].start).toBe(5);
        expect(match.offset[1].end).toBe(8);
        expect(match.offset[2].start).toBe(9);
        expect(match.offset[2].end).toBe(15);
        expect(match.offset[3].start).toBe(16);
        expect(match.offset[3].end).toBe(20);
        expect(match.offset[4].start).toBe(21);
        expect(match.offset[4].end).toBe(22);
        expect(match.offset[5].start).toBe(23);
        expect(match.offset[5].end).toBe(28);

        expect(`${match}`).toBe(str);
    });

    test("basic search (RegExp-like object)", () => {
        const match = stringMatches(str, {source: "\\w+", flags: "g"});
        expect(match.offset.length).toBe(6);

        expect(match.offset[0].start).toBe(0);
        expect(match.offset[0].end).toBe(4);
        expect(match.offset[1].start).toBe(5);
        expect(match.offset[1].end).toBe(8);
        expect(match.offset[2].start).toBe(9);
        expect(match.offset[2].end).toBe(15);
        expect(match.offset[3].start).toBe(16);
        expect(match.offset[3].end).toBe(20);
        expect(match.offset[4].start).toBe(21);
        expect(match.offset[4].end).toBe(22);
        expect(match.offset[5].start).toBe(23);
        expect(match.offset[5].end).toBe(28);

        expect(`${match}`).toBe(str);
    });

    test("remove", () => {
        const match = stringMatches(str, {source: "\\w+", flags: "g"});
        match.remove();
        expect(`${match}`).toBe("     ");

        expect(match.offset[0].start).toBe(0);
        expect(match.offset[0].end).toBe(0);
        expect(match.offset[1].start).toBe(1);
        expect(match.offset[1].end).toBe(1);
        expect(match.offset[2].start).toBe(2);
        expect(match.offset[2].end).toBe(2);
        expect(match.offset[3].start).toBe(3);
        expect(match.offset[3].end).toBe(3);
        expect(match.offset[4].start).toBe(4);
        expect(match.offset[4].end).toBe(4);
        expect(match.offset[5].start).toBe(5);
        expect(match.offset[5].end).toBe(5);
    });

    test("replace", () => {
        const match = stringMatches(str, {source: "\\w+", flags: "g"});
        match.replace("lol");
        expect(`${match}`).toBe("lol lol lol lol lol lol");

        expect(match.offset[0].start).toBe(0);
        expect(match.offset[0].end).toBe(3);
        expect(match.offset[1].start).toBe(4);
        expect(match.offset[1].end).toBe(7);
        expect(match.offset[2].start).toBe(8);
        expect(match.offset[2].end).toBe(11);
        expect(match.offset[3].start).toBe(12);
        expect(match.offset[3].end).toBe(15);
        expect(match.offset[4].start).toBe(16);
        expect(match.offset[4].end).toBe(19);
        expect(match.offset[5].start).toBe(20);
        expect(match.offset[5].end).toBe(23);
    });

    test("before", () => {
        const match = stringMatches(str, {source: "\\w+", flags: "g"});
        match.before("pa-");
        expect(`${match}`).toBe("pa-your pa-dad pa-smells pa-like pa-a pa-woman");

        expect(match.toString().slice(match.offset[0].start, match.offset[0].end))
            .toBe("your");
        expect(match.toString().slice(match.offset[1].start, match.offset[1].end))
            .toBe("dad");
        expect(match.toString().slice(match.offset[2].start, match.offset[2].end))
            .toBe("smells");
        expect(match.toString().slice(match.offset[3].start, match.offset[3].end))
            .toBe("like");
        expect(match.toString().slice(match.offset[4].start, match.offset[4].end))
            .toBe("a");
        expect(match.toString().slice(match.offset[5].start, match.offset[5].end))
            .toBe("woman");
    });

    test("after", () => {
        const match = stringMatches(str, {source: "\\w+", flags: "g"});
        match.after("-pa");

        expect(`${match}`).toBe("your-pa dad-pa smells-pa like-pa a-pa woman-pa");

        expect(match.toString().slice(match.offset[0].start, match.offset[0].end))
            .toBe("your");
        expect(match.toString().slice(match.offset[1].start, match.offset[1].end))
            .toBe("dad");
        expect(match.toString().slice(match.offset[2].start, match.offset[2].end))
            .toBe("smells");
        expect(match.toString().slice(match.offset[3].start, match.offset[3].end))
            .toBe("like");
        expect(match.toString().slice(match.offset[4].start, match.offset[4].end))
            .toBe("a");
        expect(match.toString().slice(match.offset[5].start, match.offset[5].end))
            .toBe("woman");
    });

    test("remove + replace", () => {
        const match = stringMatches(str, {source: "\\w+", flags: "g"});
        match.remove().replace("test");
        expect(`${match}`).toBe("test test test test test test");

        expect(match.offset[0].start).toBe(0);
        expect(match.offset[0].end).toBe(4);
        expect(match.offset[1].start).toBe(5);
        expect(match.offset[1].end).toBe(9);
        expect(match.offset[2].start).toBe(10);
        expect(match.offset[2].end).toBe(14);
        expect(match.offset[3].start).toBe(15);
        expect(match.offset[3].end).toBe(19);
        expect(match.offset[4].start).toBe(20);
        expect(match.offset[4].end).toBe(24);
        expect(match.offset[5].start).toBe(25);
        expect(match.offset[5].end).toBe(29);
    });

});
