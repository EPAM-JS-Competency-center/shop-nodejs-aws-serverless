const BUCKET = process.env.BUCKET;
import { errorResponse, successResponse } from "./utils/apiResponseBuilder";

export const importProductsFile = ({
    s3,
}) => async (event) => {
    try {
        const catalogName = event.queryStringParameters.name;
        const catalogPath = `uploaded/${catalogName}`;
    
        const params = {
            Bucket: BUCKET,
            Key: catalogPath,
            Expires: 60,
            ContentType: 'text/csv'
        };
    
        const url = await s3.getSignedUrlPromise('putObject', params)
    
        return successResponse(url);
    } catch (error) {
        errorResponse(error);
    }
}
