import ts from 'typescript';
import type { PrismaEntity } from '../helpers/dmmf';
import { PrismaJsonTypesGeneratorConfig } from '../util/config';
import type { DeclarationWriter } from '../util/declaration-writer';
/** Replacer responsible for the main <Model>Payload type. */
export declare function handleModelPayload(typeAlias: ts.TypeAliasDeclaration, writer: DeclarationWriter, model: PrismaEntity, config: PrismaJsonTypesGeneratorConfig): void;
//# sourceMappingURL=model-payload.d.ts.map