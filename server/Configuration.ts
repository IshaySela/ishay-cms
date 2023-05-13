import { to_number } from "svelte/internal";


export interface Configuration {
    ConnectionString: string;
    UsedDb: string;
    Port: number;
}

export default function getConfigFromEnv(): Configuration {
    return {
        ConnectionString: process.env.CONNECTION_STRING!,
        UsedDb: process.env.USED_DB!,
        Port: to_number(process.env.PORT)
    }
}