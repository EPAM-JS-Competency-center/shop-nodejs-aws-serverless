import { InMemoryProductService } from "./services/in-memory-product-service";
import { winstonLogger } from "./utils/winstonLogger";
import { errorResponse, successResponse, ResponseInterface } from "./utils/apiResponseBuilder";

export const getAllProducts: ( event, _context ) => Promise<ResponseInterface> = async (event, _context) => {
    try {
        winstonLogger.logRequest(`Incoming event: ${ JSON.stringify( event ) }`);

        const inMemoryProductService = new InMemoryProductService();

        const products = await inMemoryProductService.getAllProducts();

        winstonLogger.logRequest(`"Received products: ${ JSON.stringify( products ) }`);

        return successResponse( products );
    } 
    catch (err) {
        return errorResponse( err );
    }
}
