import { injectable } from 'inversify';
import 'reflect-metadata';
// @ts-ignore
import winston from 'winston';
import { LoggerInterface } from './logger.interface';

@injectable()
class WinstonLogger implements LoggerInterface {
    private readonly logger: any;
    private readonly format: any;

    constructor() {
        this.format = winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            winston.format.align(),
            winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
        );

        this.logger = winston.createLogger({
            transports: [
                new winston.transports.Console({
                    format: this.format
                })
            ]
        });
    }
    logServiceRequest( message: string ){
        this.logger.info( message );
    }

    logDBRequest( message: string ){
        this.logger.info( message );
    }

    logError( message: string ){
        this.logger.error( message );
    }
}


export { WinstonLogger };
