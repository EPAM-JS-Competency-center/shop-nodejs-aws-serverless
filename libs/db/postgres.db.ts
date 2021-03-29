import {Client} from 'pg';
import {injectable} from 'inversify';
import 'reflect-metadata';
import {DBInterface} from "./DB.interface";
import {diContainer} from "../di/inversify.config";
import {LoggerInterface} from "../logger/logger.interface";
import {TYPES} from "../types";
import { DB_CONFIG } from "../constants/dbConfig";

@injectable()
class PostgresDB implements DBInterface {
    private readonly client: Client;
    private readonly logger: LoggerInterface;

    constructor() {
        const { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } = DB_CONFIG;
        const dbOptions = {
            host: DB_HOST,
            port: DB_PORT,
            database: DB_NAME,
            user: DB_USERNAME,
            password: DB_PASSWORD,
            ssl: {
                rejectUnauthorized: false
            },
            connectionTimeoutMillis: 5000
        };

        this.logger = diContainer.get<LoggerInterface>( TYPES.LOGGER );
        this.client = new Client(dbOptions);
    }

    async connect() {
        try {
            this.logger.logDBRequest("Start connecting to DB");
            await this.client.connect();
            this.logger.logDBRequest("Connection to DB successfully finished");
        }
        catch ( err ){
            this.logger.logError( err.message || "DB connection error" + JSON.stringify( err ) )
        }
    }

    async disconnect() {
        try {
            this.logger.logDBRequest("Start disconnecting from DB");
            await this.client.end();
            this.logger.logDBRequest("Disconnection from DB successfully finished");
        }
        catch  (err ) {
            this.logger.logError( err.message || "DB disconnection error" + JSON.stringify( err ) )
        }
    }

    async query( queryStr: string ) {
        try {
            this.logger.logDBRequest("DB query: " + queryStr );
            return await this.client.query(queryStr);
        }
        catch ( err) {
            this.logger.logError( err.message || "DB query error" + JSON.stringify( err ) )
        }
    }
}

export { PostgresDB };
