"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractPrismaModels = extractPrismaModels;
const regex_1 = require("./regex");
/**
 * Parses the DMMF document and returns a list of models that have at least one field with
 * typed json and the regexes for each field type.
 */
function extractPrismaModels(dmmf) {
    const models = dmmf.datamodel.models
        // Define the regexes for each model
        .map((model) => ({
        ...model,
        type: 'model',
        regexps: (0, regex_1.createRegexForType)(model.name)
    }));
    const types = dmmf.datamodel.types
        // Define the regexes for each model
        .map((model) => ({
        ...model,
        type: 'type',
        regexps: (0, regex_1.createRegexForType)(model.name)
    }));
    return models.concat(types);
}
//# sourceMappingURL=dmmf.js.map