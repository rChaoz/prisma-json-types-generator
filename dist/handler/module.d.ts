import ts from 'typescript';
import type { PrismaEntity } from '../helpers/dmmf';
import { PrismaJsonTypesGeneratorConfig } from '../util/config';
import { DeclarationWriter } from '../util/declaration-writer';
/** Handles the prisma namespace module. */
export declare function handlePrismaModule(child: ts.ModuleDeclaration, writer: DeclarationWriter, models: PrismaEntity[], config: PrismaJsonTypesGeneratorConfig): void;
//# sourceMappingURL=module.d.ts.map