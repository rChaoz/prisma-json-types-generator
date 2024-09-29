"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onGenerate = onGenerate;
const tslib_1 = require("tslib");
const typescript_1 = tslib_1.__importDefault(require("typescript"));
const module_1 = require("./handler/module");
const dmmf_1 = require("./helpers/dmmf");
const config_1 = require("./util/config");
const declaration_writer_1 = require("./util/declaration-writer");
const prisma_generator_1 = require("./util/prisma-generator");
const source_path_1 = require("./util/source-path");
/** Runs the generator with the given options. */
async function onGenerate(options) {
    try {
        const prismaClient = (0, prisma_generator_1.findPrismaClientGenerator)(options.otherGenerators);
        const config = (0, config_1.parseConfig)(options.generator.config);
        const clientOutput = (0, source_path_1.buildTypesFilePath)(prismaClient.output.value, config.clientOutput, options.schemaPath);
        const writer = new declaration_writer_1.DeclarationWriter(clientOutput, config);
        // Reads the prisma declaration file content.
        await writer.load();
        const tsSource = typescript_1.default.createSourceFile(writer.filepath, writer.content, typescript_1.default.ScriptTarget.ESNext, true, typescript_1.default.ScriptKind.TS);
        const prismaModels = (0, dmmf_1.extractPrismaModels)(options.dmmf);
        // Handles the prisma namespace.
        tsSource.forEachChild((child) => {
            try {
                if (child.kind === typescript_1.default.SyntaxKind.ModuleDeclaration) {
                    (0, module_1.handlePrismaModule)(child, writer, prismaModels, config);
                }
            }
            catch (error) {
                console.error(error);
            }
        });
        await writer.save();
    }
    catch (error) {
        console.error(error);
    }
}
//# sourceMappingURL=on-generate.js.map