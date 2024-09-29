import { GeneratorConfig } from '@prisma/generator-helper';
/**
 * Finds the `prisma-client-generator` configuration from a list of generators or throws
 * an error.
 */
export declare function findPrismaClientGenerator(generators: GeneratorConfig[]): GeneratorConfig & {
    output: {
        value: string;
    };
};
//# sourceMappingURL=prisma-generator.d.ts.map