"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findNewSignature = findNewSignature;
const error_1 = require("../util/error");
const regex_1 = require("./regex");
/** Handles and replaces the signature of a typed field. */
function findNewSignature(signature, typeToChange, model, field, throwOnNotFound = true, shouldReplaceStrings = true) {
    // Updates should leave optional fields
    if ((0, regex_1.isUpdateOneType)(model)) {
        typeToChange = `UpdateInput<${typeToChange}>`;
    }
    switch (signature) {
        //
        // Normal
        //
        case 'JsonValue':
        case 'Prisma.JsonValue':
        case 'InputJsonValue':
        case 'InputJsonValue | InputJsonValue':
        case 'JsonNullValueInput | InputJsonValue':
            return typeToChange;
        // Super complex type that strictly typing will lose functionality
        case `JsonWithAggregatesFilter<"${model}">`:
        case `JsonFilter<"${model}">`:
            return undefined;
        //
        // String
        //
        case 'string':
            if (!shouldReplaceStrings) {
                return undefined;
            }
            return typeToChange;
        case 'string[]':
            if (!shouldReplaceStrings) {
                return undefined;
            }
            return `(${typeToChange})[]`;
        case 'string | null':
            if (!shouldReplaceStrings) {
                return undefined;
            }
            return typeToChange;
        case `StringFilter<"${model}"> | string`:
            if (!shouldReplaceStrings) {
                return undefined;
            }
            return `TypedStringFilter<${typeToChange}> | ${typeToChange}`;
        case `StringNullableFilter<"${model}"> | string | null`:
            if (!shouldReplaceStrings) {
                return undefined;
            }
            return `TypedStringNullableFilter<${typeToChange}> | ${typeToChange} | null`;
        case `StringNullableListFilter<"${model}">`:
            if (!shouldReplaceStrings) {
                return undefined;
            }
            return `TypedStringNullableListFilter<${typeToChange}>`;
        case `StringWithAggregatesFilter<"${model}"> | string`:
            if (!shouldReplaceStrings) {
                return undefined;
            }
            return `TypedStringWithAggregatesFilter<${typeToChange}> | ${typeToChange}`;
        case `StringNullableWithAggregatesFilter<"${model}"> | string | null`:
            if (!shouldReplaceStrings) {
                return undefined;
            }
            return `TypedStringNullableWithAggregatesFilter<${typeToChange}> | ${typeToChange}`;
        case `StringFieldUpdateOperationsInput | string`:
            if (!shouldReplaceStrings) {
                return undefined;
            }
            return `TypedStringFieldUpdateOperationsInput<${typeToChange}> | ${typeToChange}`;
        case `NullableStringFieldUpdateOperationsInput | string | null`:
            if (!shouldReplaceStrings) {
                return undefined;
            }
            return `TypedNullableStringFieldUpdateOperationsInput<${typeToChange}> | ${typeToChange} | null`;
        case `${model}Create${field}Input | string[]`:
            if (!shouldReplaceStrings) {
                return undefined;
            }
            return `CreateStringArrayInput<${typeToChange}> | ${typeToChange}[]`;
        case `${model}Update${field}Input | string[]`:
            if (!shouldReplaceStrings) {
                return undefined;
            }
            return `CreateStringArrayInput<${typeToChange}> | ${typeToChange}[]`;
        //
        // Nullable
        //
        case 'JsonValue | null':
        case 'Prisma.JsonValue | null':
        case 'InputJsonValue | null':
        case 'InputJsonValue | InputJsonValue | null':
            return `${typeToChange} | null`;
        case 'JsonNullValueInput | InputJsonValue':
        case 'NullableJsonNullValueInput | InputJsonValue':
            // differentiates null in column or a json null value
            return `${typeToChange} | NullableJsonNullValueInput`;
        // Super complex type that strictly typing will lose functionality
        case `JsonNullableWithAggregatesFilter<"${model}">`:
        case `JsonNullableFilter<"${model}">`:
            return undefined;
        //
        // Array
        //
        case 'Prisma.JsonValue[]':
        case 'JsonValue[]':
        case 'InputJsonValue[]':
        case `${model}CreatelistInput | InputJsonValue[]`:
            return `${typeToChange}[]`;
        case `JsonNullableListFilter<"${model}">`:
            return `NullableListFilter<${typeToChange}>`;
        case `${model}Update${field}Input | InputJsonValue[]`:
            return `UpdateManyInput<${typeToChange}>`;
        case `${model}Create${field}Input | InputJsonValue[]`:
            return `CreateManyInput<${typeToChange}>`;
        //
        // Unknown types, its safe to throw an error here because each field does not conflict with other fields generation.
        //
        default:
            if (throwOnNotFound) {
                throw new error_1.PrismaJsonTypesGeneratorError('Found unsupported required field type', {
                    signature,
                    typeToChange,
                    type: model,
                    fieldName: field,
                    throwOnNotFound
                });
            }
            return undefined;
    }
}
//# sourceMappingURL=find-signature.js.map