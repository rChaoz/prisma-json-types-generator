/**
 * Simple error to throw when something goes wrong. Simply wraps the message to help
 * identify whether the error is from this package or not.
 */
export declare class PrismaJsonTypesGeneratorError extends Error {
    constructor(message: string, data?: any);
    static handler(error: PrismaJsonTypesGeneratorError): void;
}
//# sourceMappingURL=error.d.ts.map