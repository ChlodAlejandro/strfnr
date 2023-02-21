/**
 * An object that can be reconstructed into a RegExp.
 */
interface RegExpLike {
    source?: string,
    flags?: string
}

/**
 * What to search for.
 */
type SearchCondition = string | RegExp | RegExpLike;
type Offset = { start: number, end: number, filter: SearchCondition };

class StringMatchResult<T extends Offset | Offset[]> {

    // noinspection TypeScriptFieldCanBeMadeReadonly
    private string: string;
    private readonly _offset: T;

    public get offset(): T {
        return this._offset;
    }

    constructor( string: string, offset: T ) {
        this.string = string;
        this._offset = offset;
    }

    /**
     * Get all text as a string.
     */
    toString(): string {
        return this.string;
    }

    /**
     * Get the final result of the string following all operations.
     * This is the same as `.toString()`.
     */
    final(): string {
        return this.string;
    }

    /**
     * Append text to the start of the string (before the offset start).
     * @param text
     */
    before(text: string): StringMatchResult<T> {
        // Short circuit if no matches found.
        if (this._offset == null || (this._offset as any).length === 0) return this;

        let deltaOffset = 0;
        (Array.isArray(this._offset) ? this._offset : [this._offset])
            .forEach((function (offset: Offset) {
                const insertStart = offset.start + deltaOffset;
                offset.start += deltaOffset + text.length;
                offset.end += deltaOffset + text.length;
                this.string =
                    this.string.slice(0, insertStart)
                    + text
                    + this.string.slice(insertStart);
                deltaOffset += text.length;
            }).bind(this));
        return this;
    }

    /**
     * Append text to the end of the string (after the offset end).
     * @param text
     */
    after(text: string): StringMatchResult<T> {
        // Short circuit if no matches found.
        if (this._offset == null || (this._offset as any).length === 0) return this;

        let deltaOffset = 0;
        (Array.isArray(this._offset) ? this._offset : [this._offset])
            .forEach((function (offset: Offset) {
                offset.start += deltaOffset;
                offset.end += deltaOffset;
                this.string =
                    this.string.slice(0, offset.end)
                    + text
                    + this.string.slice(offset.end);
                deltaOffset += text.length;
            }).bind(this));
        return this;
    }

    replace(text: string): StringMatchResult<T> {
        // Short circuit if no matches found.
        if (this._offset == null || (this._offset as any).length === 0) return this;

        let deltaOffset = 0;
        (Array.isArray(this._offset) ? this._offset : [this._offset])
            .forEach((function (offset: Offset) {
                const {start, end} = offset;
                const oldLen = end - start;
                const deltaLen = (text.length - oldLen);
                offset.start += deltaOffset;
                offset.end += deltaOffset + (text.length - oldLen);
                this.string =
                    this.string.slice(0, offset.start)
                    + text
                    + this.string.slice(offset.end - text.length + oldLen);
                deltaOffset += deltaLen;
            }).bind(this));
        return this;
    }

    /**
     * Removes all matched text from the string.
     */
    remove(): StringMatchResult<T> {
        // Short circuit if no matches found.
        if (this._offset == null || (this._offset as any).length === 0) return this;

        let deltaOffset = 0;
        (Array.isArray(this._offset) ? this._offset : [this._offset])
            .forEach((function (offset: Offset) {
                const len = offset.end - offset.start;
                offset.start += deltaOffset;
                offset.end += deltaOffset - len;
                this.string =
                    this.string.slice(0, offset.start)
                    + this.string.slice(offset.end + len);
                deltaOffset -= len;
            }).bind(this));
        return this;
    }

}

export type {StringMatchResult};

/**
 * Additional options for string offset searches.
 */
interface StringMatchOptions {
    /**
     * Whether to search using the first filter only (with other filters being fallbacks)
     * or whether to search using all filters.
     *
     * When using `StringMatch` (single offset returned), this will always be set
     * to "first". When using `StringMatch` and set to "first", this will only
     * return offset matches for the first (hitting) filter provided. Subsequent
     * filters will not be included as results. This essentially acts as a fallback;
     * the next filter in the list is used if there was none found with the previous.
     */
    filterMode?: "all" | "first";
}

/**
 * Perform a string offset search.
 *
 * This attempts to look for a spot in `string` which matches `filter`. It then returns
 * a utility class that can be used to mutate the string.
 *
 * This function only locates the first occurrence. For searching all instances of the
 * filter, see `stringOffsetsSearch`.
 *
 * @param string The string to search into
 * @param filters What to search for.
 * @return {StringMatchResult} A utility class that can be used to mutate the string.
 *  `null` if the string was invalid (null, undefined, or not a string).
 *
 * @author Chlod Alejandro <chlod@chlod.net>
 * @license BSD-3-Clause
 */
export function stringMatch(
    string: string,
    filters: SearchCondition | SearchCondition[]
): StringMatchResult<Offset> {
    if (filters == null || typeof string !== "string") {
        return null;
    }

    if (!Array.isArray(filters)) {
        filters = [filters];
    }

    for (const filter of filters) {
        if (
            typeof filter !== "string"
            && typeof filter !== "object"
        ) {
            // Skip invalid filters.
            continue;
        }
        if (typeof filter === "string") {
            const i = string.indexOf(filter);
            if (i !== -1) {
                return new StringMatchResult<Offset>(
                    string, {start: i, end: i + filter.length, filter}
                );
            }
        } else {
            // Recreate the RegExp object to clear state.
            const regExp = new RegExp(filter.source, filter.flags);
            const exec = regExp.exec(string);
            if (exec != null) {
                return new StringMatchResult<Offset>(
                    string, {start: exec.index, end: exec.index + exec[0].length, filter}
                );
            }
        }
    }

    return new StringMatchResult<Offset>(string, null);
}

/**
 * Perform a string offset search.
 *
 * This attempts to look for a spot in `string` which matches `filter`. It then returns
 * a utility class that can be used to mutate the string.
 *
 * This function searches all occurrences. For searching only one match of the
 * filter, see `stringOffsetsSearch`.
 *
 * @param string The string to search into
 * @param filters What to search for.
 * @param options Additional options for string offset searches.
 * @return {StringMatchResult} A utility class that can be used to mutate the string.
 *  `null` if the string was invalid (null, undefined, or not a string).
 *
 * @author Chlod Alejandro <chlod@chlod.net>
 * @license BSD-3-Clause
 */
export function stringMatches(
    string: string,
    filters: SearchCondition | SearchCondition[],
    options: StringMatchOptions = {}
): StringMatchResult<Offset[]> {
    if (filters == null || typeof string !== "string") {
        return null;
    }

    if (!Array.isArray(filters)) {
        filters = [filters];
    }

    const results: Offset[] = [];

    for (const filter of filters) {
        if (
            typeof filter !== "string"
            && typeof filter !== "object"
        ) {
            // Skip invalid filters.
            continue;
        }
        if (typeof filter === "string") {
            let i = 0;
            let lastIndex = 0;
            while ((i = string.indexOf(filter, lastIndex)) != -1) {
                results.push({start: i, end: i + filter.length, filter});
                lastIndex = i + 1;
            }
        } else {
            // Recreate the RegExp object to clear state.
            const regExp = new RegExp(filter.source, filter.flags);
            let exec;
            while ((exec = regExp.exec(string)) != null) {
                results.push({start: exec.index, end: exec.index + exec[0].length, filter});
            }
        }

        if (options.filterMode === "first" && results.length > 0) {
            return new StringMatchResult<Offset[]>(string, results);
        }
    }

    return new StringMatchResult<Offset[]>(string, results);
}
