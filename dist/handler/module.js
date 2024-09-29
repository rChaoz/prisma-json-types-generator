"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePrismaModule = handlePrismaModule;
const tslib_1 = require("tslib");
const typescript_1 = tslib_1.__importDefault(require("typescript"));
const constants_1 = require("../util/constants");
const error_1 = require("../util/error");
const statement_1 = require("./statement");
/** Handles the prisma namespace module. */
function handlePrismaModule(child, writer, models, config) {
    const name = child
        .getChildren()
        .find((n) => n.kind === typescript_1.default.SyntaxKind.Identifier);
    // Not a prisma namespace
    if (!name || name.text !== constants_1.PRISMA_NAMESPACE_NAME) {
        return;
    }
    const content = child
        .getChildren()
        .find((n) => n.kind === typescript_1.default.SyntaxKind.ModuleBlock);
    if (!content || !content.statements.length) {
        throw new error_1.PrismaJsonTypesGeneratorError('Prisma namespace content could not be found');
    }
    // Loops through all statements in the prisma namespace
    for (const statement of content.statements) {
        try {
            (0, statement_1.handleStatement)(statement, writer, models, config);
        }
        catch (error) {
            // This allows some types to be generated even if others may fail
            // which is good for incremental development/testing
            if (error instanceof error_1.PrismaJsonTypesGeneratorError) {
                return error_1.PrismaJsonTypesGeneratorError.handler(error);
            }
            // Stops this generator is error thrown is not manually added by our code.
            throw error;
        }
    }
}
//# sourceMappingURL=module.js.map