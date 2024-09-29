import type { DMMF } from '@prisma/generator-helper';
/** A Prisma DMMF model/type with the regexes for each field. */
export interface PrismaEntity extends DMMF.Model {
    regexps: RegExp[];
    type: 'model' | 'type';
}
/**
 * Parses the DMMF document and returns a list of models that have at least one field with
 * typed json and the regexes for each field type.
 */
export declare function extractPrismaModels(dmmf: DMMF.Document): PrismaEntity[];
//# sourceMappingURL=dmmf.d.ts.map