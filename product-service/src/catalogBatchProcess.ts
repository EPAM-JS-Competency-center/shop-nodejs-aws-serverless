import { SNS } from 'aws-sdk';
import { ProductServiceInterface } from './services/products';
import { winstonLogger } from './utils/winstonLogger';

const sns = new SNS();

export const catalogBatchProcess =
  (productService: ProductServiceInterface) => async (event, _context) => {
    winstonLogger.logRequest(`Incoming event: ${JSON.stringify(event)}`);
    try {
      for (const record of event.Records) {
        winstonLogger.logRequest(`Start processing record: ${record.body}`);

        const product = await productService.create(event.body);

        winstonLogger.logRequest(`Created product: ${JSON.stringify(product)}`);

        if (product.id) {
          sns.publish({
            Subject: 'New product created',
            Message: JSON.stringify(product),
            MessageAttributes: {
              title: {
                DataType: 'String',
                StringValue: product.title
              }
            },
            TopicArn: process.env.SNS_ARN
          }, (error, data) => {
            if (error) {
              winstonLogger.logError(`Failed to send SNS notification: ${error}`);
            } else {
              winstonLogger.logRequest(`SNS notification was sent for ${data.title}`);
            }
          })
        }
      }

      return {
        statusCode: 202,
      };
    } catch (err) {
      winstonLogger.logError(`Failed to process batch request: ${err}`);
    }
  };
