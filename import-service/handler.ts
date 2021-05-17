import AWS from 'aws-sdk';
import * as handlers from './src';
import { winstonLogger as logger } from './src/utils/winstonLogger';

const s3 = new AWS.S3({ region: 'us-east-1' });

export const getProductById = handlers.importFileParser({
    s3,
    logger,
});

export const getAllProducts = handlers.importProductsFile({
    s3,
});
