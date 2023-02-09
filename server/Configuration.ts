

export interface Configuration {
    ConnectionString: string;
    UsedDb: string;
}

export default function getConfigFromEnv(): Configuration {
    return {
        ConnectionString: process.env.CONNECTION_STRING!,
        UsedDb: process.env.USED_DB!
    }
}