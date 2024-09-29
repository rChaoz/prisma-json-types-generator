import ts from 'typescript';
import type { PrismaEntity } from '../helpers/dmmf';
import { PrismaJsonTypesGeneratorConfig } from '../util/config';
import type { DeclarationWriter } from '../util/declaration-writer';
/** Tries to replace every property of an object */
export declare function replaceObject(object: ts.TypeLiteralNode, writer: DeclarationWriter, model: PrismaEntity, config: PrismaJsonTypesGeneratorConfig): void;
//# sourceMappingURL=replace-object.d.ts.map