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
        DB_HOST: 'DB_HOST',
        DB_PORT: 'DB_PORT',
        DB_NAME: 'DB_NAME',
        DB_USERNAME: 'DB_USERNAME',
        DB_PASSWORD: 'DB_PASSWORD'
    };
}

if( !process.env.ENV_STAGE || process.env.ENV_STAGE === DBStages.DEV ) {
    DB_CONFIG = {
        DB_HOST: 'DB_HOST',
        DB_PORT: 'DB_PORT',
        DB_NAME: 'DB_NAME',
        DB_USERNAME: 'DB_USERNAME',
        DB_PASSWORD: 'DB_PASSWORD'
    };
}

export { DB_CONFIG };
