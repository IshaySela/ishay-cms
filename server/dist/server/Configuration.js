"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("svelte/internal");
function getConfigFromEnv() {
    return {
        ConnectionString: process.env.CONNECTION_STRING,
        UsedDb: process.env.USED_DB,
        Port: (0, internal_1.to_number)(process.env.PORT)
    };
}
exports.default = getConfigFromEnv;
//# sourceMappingURL=Configuration.js.map