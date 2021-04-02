import { getAllProducts as getAllProductsService } from "./services/products";
import { winstonLogger } from "./utils/winstonLogger";
import { errorResponse, successResponse, ResponseInterface } from "./utils/apiResponseBuilder";

export const getAllProducts: ( event, _context ) => Promise<ResponseInterface> = async (event, _context) => {
    try {
        winstonLogger.logRequest(`Incoming event: ${ JSON.stringify( event ) }`);

        const products = getAllProductsService();

        winstonLogger.logRequest(`"Received products: ${ JSON.stringify( products ) }`);

        return successResponse( products );
    } 
    catch (err) {
        return errorResponse( err );
    }
}
