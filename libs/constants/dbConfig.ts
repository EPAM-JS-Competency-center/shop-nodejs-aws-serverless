interface DBConfigInterface {
    DB_HOST: string,
    DB_PORT: number | string,
    DB_NAME: string,
    DB_USERNAME: string,
    DB_PASSWORD: string
}

enum DBStages {
    DEV = "dev",
    PROD = "prod"
}

let DB_CONFIG: DBConfigInterface | null = null;

if( process.env.ENV_STAGE === DBStages.PROD ) {
    DB_CONFIG = {
        DB_HOST: 'ziggy.db.elephantsql.com',
        DB_PORT: '5432',
        DB_NAME: 'kpgomswn',
        DB_USERNAME: 'kpgomswn',
        DB_PASSWORD: 'zAIYwp5HZrgV0X4Zlk0vftLZAIUUMAkx'
    };
}

if( !process.env.ENV_STAGE || process.env.ENV_STAGE === DBStages.DEV ) {
    DB_CONFIG = {
        DB_HOST: 'ziggy.db.elephantsql.com',
        DB_PORT: '5432',
        DB_NAME: 'yqcpikbt',
        DB_USERNAME: 'yqcpikbt',
        DB_PASSWORD: 'LcIjch4PLbGFsHJnLlc-NSJwYxWxXAJ2'
    };
}

export { DB_CONFIG };
