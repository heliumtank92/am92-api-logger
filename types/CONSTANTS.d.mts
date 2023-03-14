export default CONSTANTS;
export const API_LOGGER_TRACKING_ID: "api-logger-tracking-id";
declare namespace CONSTANTS {
    export { ENCRYPT_ALGO };
    export { BLACKLIST_KEYS };
    export { MASTER_KEY_HEX };
    export { MASTER_IV_HEX };
    export const MASTER_KEY_BUFFER: Buffer;
    export { MASTER_IV_BUFFER };
}
declare const ENCRYPT_ALGO: "aes-256-cbc";
declare const BLACKLIST_KEYS: any;
declare const MASTER_KEY_HEX: any;
declare const MASTER_IV_HEX: "00000000000000000000000000000000";
declare const MASTER_IV_BUFFER: Buffer;
