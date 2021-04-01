import { getProductById as getProductByIdService, ProductInterface } from "./services/products";
import { winstonLogger } from "./utils/winstonLogger";
import { errorResponse, successResponse, responseInterface } from "./utils/apiResponseBuilder";

export const getProductById: (event, _context) => Promise<responseInterface> = async (event, _context) => {
    try {
        winstonLogger.logRequest(`Incoming event: ${ JSON.stringify( event ) }`);

        const { productId = '' } = event.pathParameters;

        const product: ProductInterface | undefined = getProductByIdService( productId );

        winstonLogger.logRequest(`"Received product with id: ${ productId }: ${ JSON.stringify( product ) }`);
        
        if( product )
            return successResponse( { product } );


        return successResponse( { message: "Product not found!!!" }, 404 );
    }
    catch ( err ) {
        return errorResponse( err );
    }
}
