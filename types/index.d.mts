export default ApiLogger;
declare namespace ApiLogger {
    const fatal: any;
    const error: any;
    const success: any;
    const httpError: any;
    const httpSuccess: any;
    const httpInfo: any;
    const warn: any;
    const info: any;
    const debug: any;
    const trace: any;
    const log: any;
}
import namespace from "./lib/namespace.mjs";
import { API_LOGGER_TRACKING_ID } from "./CONSTANTS.mjs";
export { namespace, API_LOGGER_TRACKING_ID };
