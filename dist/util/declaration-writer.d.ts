import { PrismaJsonTypesGeneratorConfig } from './config';
/** A changes made in the original file to help adjust any future coordinates of texts */
export interface TextDiff {
    start: number;
    diff: number;
}
/**
 * A class to help with reading and writing the Prisma Client types file concurrently and
 * converting positions indexes according with previous changes.
 */
export declare class DeclarationWriter {
    readonly filepath: string;
    private readonly options;
    constructor(filepath: string, options: PrismaJsonTypesGeneratorConfig);
    /** The prisma's index.d.ts file content. */
    content: string;
    private changeset;
    template(): Promise<string>;
    /** Loads the original file of sourcePath into memory. */
    load(): Promise<void>;
    /** Save the original file of sourcePath with the content's contents */
    save(): Promise<void>;
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
    replace(start: number, end: number, text: string): void;
}
//# sourceMappingURL=declaration-writer.d.ts.map