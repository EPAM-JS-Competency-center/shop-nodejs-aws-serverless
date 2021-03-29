import { Container } from "inversify";
import "reflect-metadata";
import { DBInterface } from "../db/DB.interface";
import { TYPES } from "../types";
import { PostgresDB } from "../db/postgres.db";
import { LoggerInterface } from "../logger/logger.interface";
import { WinstonLogger } from "../logger/winston.logger";

const diContainer = new Container();
// @ts-ignore
diContainer.bind<DBInterface>(TYPES.DB).to(PostgresDB);
diContainer.bind<LoggerInterface>(TYPES.LOGGER).to(WinstonLogger);

export { diContainer };
