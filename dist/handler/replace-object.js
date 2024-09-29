"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceObject = replaceObject;
const tslib_1 = require("tslib");
const typescript_1 = tslib_1.__importDefault(require("typescript"));
const find_signature_1 = require("../helpers/find-signature");
const regex_1 = require("../helpers/regex");
const create_signature_1 = require("../util/create-signature");
const error_1 = require("../util/error");
/** Tries to replace every property of an object */
function replaceObject(object, writer, model, config) {
    for (const field of model.fields) {
        const match = field.documentation?.match(regex_1.JSON_REGEX);
        // Not annotated with JSON comment, or we should let it be any
        if (!match && config.allowAny) {
            continue;
        }
        for (const member of object.members) {
            const memberName = member.name?.getText();
            if (
            // Not sure when a object member cannot be a PropertySignature,
            // here to avoid errors
            member.kind !== typescript_1.default.SyntaxKind.PropertySignature ||
                // The field name does not match the member name
                field.name !== memberName) {
                continue;
            }
            // the original `field: Type`
            const signature = member.type;
            if (!signature) {
                throw new error_1.PrismaJsonTypesGeneratorError(`Could not find signature type`, {
                    type: field.name
                });
            }
            const newType = (0, create_signature_1.createType)(field.documentation, config);
            // If the created type was defaulted to unknown because no other type annotation was provided
            const defaultedToUnknown = newType === 'unknown';
            const newSignature = (0, find_signature_1.findNewSignature)(signature.getText(), 
            // Updates the typename according to the config
            newType, model.name, field.name, 
            // We must ignore not found errors when no typename was found but we still
            // are replacing because of allowAny = false
            !defaultedToUnknown, !defaultedToUnknown);
            // This type should be ignored by the generator
            if (!newSignature) {
                continue;
            }
            // Replaces the signature with the new one
            writer.replace(signature.pos, signature.end, newSignature);
        }
    }
}
//# sourceMappingURL=replace-object.js.map