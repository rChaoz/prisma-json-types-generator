"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleStatement = handleStatement;
const tslib_1 = require("tslib");
const typescript_1 = tslib_1.__importDefault(require("typescript"));
const model_payload_1 = require("./model-payload");
const replace_object_1 = require("./replace-object");
/**
 * Handles a Prisma namespace statement, can be a model type, a model payload or a model
 * where/create/update input/output
 */
function handleStatement(statement, writer, models, config) {
    if (statement.kind !== typescript_1.default.SyntaxKind.TypeAliasDeclaration) {
        return;
    }
    const type = statement;
    // Filters any statement that isn't a export type declaration
    if (type.type.kind !== typescript_1.default.SyntaxKind.TypeLiteral) {
        return;
    }
    const name = type.name.getText();
    // Goes through each model and checks if the type name matches any of the regexps
    for (const model of models) {
        // If this is the main model payload type
        if (name === `$${model.name}Payload`) {
            return (0, model_payload_1.handleModelPayload)(type, writer, model, config);
        }
        // If this statement matches some create/update/where input/output type
        for (const regexp of model.regexps) {
            if (regexp.test(name)) {
                return (0, replace_object_1.replaceObject)(type.type, writer, model, config);
            }
        }
        // No model found for this statement, just ignore this type.
    }
}
//# sourceMappingURL=statement.js.map