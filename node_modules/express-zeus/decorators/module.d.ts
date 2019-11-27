interface ModuleParams {
    imports?: any[];
    controls: any[];
    services?: any[];
}
export declare const Module: ({ imports, controls, services }: ModuleParams) => ClassDecorator;
export {};
