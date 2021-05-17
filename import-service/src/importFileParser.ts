import csv from 'csv-parser';
const BUCKET = process.env.BUCKET;

export const importFileParser = ({
    s3,
    logger,
}) => async (event) => {
    event.Records.forEach(record => {        
        const s3Stream = s3.getObject({
            Bucket: BUCKET,
            Key: record.s3.object.key
        }).createReadStream();

        s3Stream.pipe(csv())
            .on('data', (data) => {
                logger.log(data);
            })
            .on('end', async () => {
                logger.log(`Copy from ${BUCKET}/${record.s3.object.key}`);

                await s3.copyObject({
                    Bucket: BUCKET,
                    CopySource: `${BUCKET}/${record.s3.object.key}`,
                    Key: record.s3.object.key.replace('uploaded', 'parsed')
                }).promise();

                logger.log(`Copied into ${BUCKET}/${record.s3.object.key.replace('uploaded', 'parsed')}`);
            });
    });
}
