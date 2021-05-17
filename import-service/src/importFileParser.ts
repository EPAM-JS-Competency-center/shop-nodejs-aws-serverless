import csv from 'csv-parser';
import stream from 'stream';
import util from 'util';

const BUCKET = process.env.BUCKET;

const finished = util.promisify(stream.finished);

export const importFileParser = ({
    s3,
    sqs,
    logger,
}) => async (event) => {
    event.Records.forEach(async (record) => {
        const results = [];        
        const s3Stream = s3.getObject({
            Bucket: BUCKET,
            Key: record.s3.object.key
        }).createReadStream();

        await finished(
            s3Stream.pipe(csv())
                .on('data', (data) => {
                    logger.log(data);

                    results.push(data);
                })
                .on('end', async () => {
                    logger.log(`Copy from ${BUCKET}/${record.s3.object.key}`);

                    await s3.copyObject({
                        Bucket: BUCKET,
                        CopySource: `${BUCKET}/${record.s3.object.key}`,
                        Key: record.s3.object.key.replace('uploaded', 'parsed')
                    }).promise();

                    logger.log(`Copied into ${BUCKET}/${record.s3.object.key.replace('uploaded', 'parsed')}`);
                })
        )

        results.map(item => {
            sqs.sendMessage({
              QueueUrl: process.env.SQS_URL,
              MessageBody: JSON.stringify(item),
            }, (error, data) => {
              if (error) {
                logger.log(`Error for send to SQS: ${error}`);
              } else {
                logger.log(`Message was sent to SQS: ${data}`);
              }
            })
          })
    });
}
