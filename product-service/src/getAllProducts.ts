import { getAllProducts as getAllProductsService, ProductInterface } from "./services/products";
import { winstonLogger } from "./utils/winstonLogger";
import { errorResponse, successResponse, responseInterface } from "./utils/apiResponseBuilder";

export const getAllProducts: ( event, _context ) => Promise<responseInterface> = async (event, _context) => {
    try {
        winstonLogger.logRequest(`Incoming event: ${ JSON.stringify( event ) }`);

        const products: ProductInterface[] = getAllProductsService();

        winstonLogger.logRequest(`"Received products: ${ JSON.stringify( products ) }`);

        return successResponse( products );
    } 
    catch (err) {
        return errorResponse( err );
    }
}
