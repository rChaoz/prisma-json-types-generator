"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeclarationWriter = void 0;
const tslib_1 = require("tslib");
const promises_1 = tslib_1.__importDefault(require("fs/promises"));
const constants_1 = require("./constants");
const error_1 = require("./error");
/**
 * A class to help with reading and writing the Prisma Client types file concurrently and
 * converting positions indexes according with previous changes.
 */
class DeclarationWriter {
    constructor(filepath, options) {
        this.filepath = filepath;
        this.options = options;
        /** The prisma's index.d.ts file content. */
        this.content = '';
        this.changeset = [];
    }
    async template() {
        let namespace = await promises_1.default.readFile(constants_1.NAMESPACE_PATH, 'utf-8');
        // Removes trailing spaces
        namespace = namespace.trim();
        // Replaces the namespace with the provided namespace
        namespace = namespace.replace(/\$\$NAMESPACE\$\$/g, this.options.namespace);
        // Includes previous file content
        return namespace + '\n' + this.content;
    }
    /** Loads the original file of sourcePath into memory. */
    async load() {
        if (!(await promises_1.default.stat(this.filepath))) {
            throw new error_1.PrismaJsonTypesGeneratorError('Tried to load a file that does not exist', { filepath: this.filepath });
        }
        if (this.changeset.length) {
            throw new error_1.PrismaJsonTypesGeneratorError('Tried to load a file that has already been changed', { filepath: this.filepath, changeset: this.changeset });
        }
        this.content = await promises_1.default.readFile(this.filepath, 'utf-8');
    }
    /** Save the original file of sourcePath with the content's contents */
    async save() {
        // Resets current changeset and file content
        this.content = await this.template();
        this.changeset = [];
        // Writes it into the disk
        await promises_1.default.writeFile(this.filepath, this.content);
    }
    /**
     * Replaces the coordinates with the provided text, adjusting the coords to previous
     * changes.
     *
     * @example
     *
     * ```txt
     *  a 1   1 a
     *  s 2   2 s
     *  d 3   3 s <- (start: 1, end: 3, text: `s`) changed `s` to `ss` (start: 1, wide: 2)
     *    4   4 d
     *    5   5
     *  a 6   6
     *  s 7   7 a
     *  d 8   8 s
     *    9   9 d
     * ```
     */
    replace(start, end, text) {
        // Adds a trailing space
        if (text[0] !== ' ') {
            text = ' ' + text;
        }
        // Maps the coordinates to the previous changes to adjust the position for the new text
        for (const change of this.changeset) {
            if (start > change.start) {
                start += change.diff;
                end += change.diff;
            }
        }
        // Replaces the file content at the correct position
        this.content = this.content.slice(0, start) + text + this.content.slice(end);
        // Adds the change to the list
        this.changeset.push({
            start,
            // The difference between the old text and the new text
            diff: start - end + text.length
        });
    }
}
exports.DeclarationWriter = DeclarationWriter;
//# sourceMappingURL=declaration-writer.js.map