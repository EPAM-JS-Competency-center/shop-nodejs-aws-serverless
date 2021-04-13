import { InMemoryProductService } from "./services/in-memory-product-service";
import { winstonLogger } from "./utils/winstonLogger";
import { errorResponse, successResponse, ResponseInterface } from "./utils/apiResponseBuilder";

export const getProductById: (event, _context) => Promise<ResponseInterface> = async (event, _context) => {
    try {
        winstonLogger.logRequest(`Incoming event: ${ JSON.stringify( event ) }`);

        const { productId = '' } = event.pathParameters;

        const inMemoryProductService = new InMemoryProductService();

        const product = inMemoryProductService.getProductById( productId );

        winstonLogger.logRequest(`"Received product with id: ${ productId }: ${ JSON.stringify( product ) }`);
        
        if( product )
            return successResponse( { product } );


        return successResponse( { message: "Product not found!!!" }, 404 );
    }
    catch ( err ) {
        return errorResponse( err );
    }
}
