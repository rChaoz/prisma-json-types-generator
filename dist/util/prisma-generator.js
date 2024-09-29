"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPrismaClientGenerator = findPrismaClientGenerator;
const error_1 = require("./error");
/**
 * Finds the `prisma-client-generator` configuration from a list of generators or throws
 * an error.
 */
function findPrismaClientGenerator(generators) {
    const options = generators.find((g) => g.provider.value === 'prisma-client-js');
    if (!options) {
        throw new error_1.PrismaJsonTypesGeneratorError('Could not find client generator options, are you using `prisma-client-js` before `prisma-json-types-generator`?');
    }
    if (!options.output?.value) {
        throw new error_1.PrismaJsonTypesGeneratorError('`prisma-client-js` output not found', options);
    }
    return options;
}
//# sourceMappingURL=prisma-generator.js.map