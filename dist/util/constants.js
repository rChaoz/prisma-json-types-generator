"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NAMESPACE_PATH = exports.PRISMA_NAMESPACE_NAME = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
/** Name of the namespace in the type declaration */
exports.PRISMA_NAMESPACE_NAME = 'Prisma';
/** The path to the namespace.d.ts file, used as a template for the prisma's index.d.ts */
exports.NAMESPACE_PATH = path_1.default.resolve(__dirname, '../../assets/namespace.d.ts');
//# sourceMappingURL=constants.js.map