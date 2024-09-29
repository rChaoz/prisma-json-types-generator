"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createType = createType;
const regex_1 = require("../helpers/regex");
/** Creates the new signature for the provided type. */
function createType(description, config) {
    const type = description?.match(regex_1.JSON_REGEX)?.[1];
    const isLiteral = !!description?.match(regex_1.LITERAL_REGEX);
    // Literal types, just return the type
    if (isLiteral) {
        return `(${type})`;
    }
    // Defaults to unknown always, config.allowAny is handled before this function
    if (!type) {
        return 'unknown';
    }
    // If we should use a type as global type map
    if (config.useType) {
        return `${config.namespace}.${config.useType}['${JSON.stringify(type)}']`;
    }
    // Just return the type
    return `${config.namespace}.${type}`;
}
//# sourceMappingURL=create-signature.js.map