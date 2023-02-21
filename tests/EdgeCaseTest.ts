// noinspection SpellCheckingInspection

import {stringMatch, stringMatches} from "../index";

describe("edge case tests", () => {

    const str = "ABCDEFGHIDEFJKL";

    test("null filter", () => {
        expect(stringMatch(str, null)).toBe(null);
        expect(stringMatches(str, null)).toBe(null);
    });

    test("null string", () => {
        expect(stringMatch(null, "DEF")).toBe(null);
        expect(stringMatches(null, "DEF")).toBe(null);
    });

    test("unsupported filter (match)", () => {
        // noinspection TypeScriptValidateTypes
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const match = stringMatch(str, 53);

        expect(match.offset).toBe(null);
        match
            .remove()
            .replace( "test" )
            .before( "test" )
            .after( "test" );
        expect(`${match}`).toBe(str);
        expect(`${match.final()}`).toBe(str);
    });

    test("unsupported filter (matches)", () => {
        // noinspection TypeScriptValidateTypes
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const match = stringMatches(str, 53);

        expect(match.offset.length).toBe(0);
        match
            .remove()
            .replace( "test" )
            .before( "test" )
            .after( "test" );
        expect(`${match}`).toBe(str);
        expect(`${match.final()}`).toBe(str);
    });

});
