export default LEVEL_CONFIG;
declare const LEVEL_CONFIG: Map<string, {
    inspectConfig: {
        colors: boolean;
        showHidden: boolean;
        depth: number;
        customInspect: boolean;
        showProxy: boolean;
        maxArrayLength: number;
        maxStringLength: number;
        breakLength: number;
        compact: boolean;
        sorted: boolean;
        getters: boolean;
        numericSeparator: boolean;
    };
    colorFunc: import("chalk").ChalkInstance;
} | {
    inspectConfig: {
        colors: boolean;
        showHidden: boolean;
        depth: number;
        customInspect: boolean;
        showProxy: boolean;
        maxArrayLength: number;
        maxStringLength: number;
        breakLength: number;
        compact: boolean;
        sorted: boolean;
        getters: boolean;
        numericSeparator: boolean;
    };
    colorFunc?: undefined;
}>;
