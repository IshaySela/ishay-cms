"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getConfigFromEnv() {
    return {
        ConnectionString: process.env.CONNECTION_STRING,
        UsedDb: process.env.USED_DB
    };
}
exports.default = getConfigFromEnv;
//# sourceMappingURL=Configuration.js.map