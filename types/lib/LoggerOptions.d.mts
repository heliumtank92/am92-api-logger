export default LoggerOptions;
declare namespace LoggerOptions {
    export namespace defaultMeta {
        export { SERVICE as service };
    }
    export namespace levels {
        const fatal: number;
        const error: number;
        const success: number;
        const httpError: number;
        const httpSuccess: number;
        const httpInfo: number;
        const warn: number;
        const info: number;
        const debug: number;
        const trace: number;
    }
    export const level: string;
    export const exitOnError: boolean;
    export { transports };
    export const format: winston.Logform.Format;
}
declare const SERVICE: string;
declare const transports: winston.transports.ConsoleTransportInstance[];
import winston from "winston";
