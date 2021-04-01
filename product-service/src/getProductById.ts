import { ProductsService, ProductInterface } from "./services/productsService";
import { winstonLogger } from "./utils/winstonLogger";
import { errorResponse, successResponse, responseInterface } from "./utils/apiResponseBuilder";

export const getProductById: (event, _context) => Promise<responseInterface> = async (event, _context) => {
    try {
        winstonLogger.logRequest(`Incoming event: ${ JSON.stringify( event ) }`);

        const { productId = '' } = event.pathParameters;
        const productsService = new ProductsService();

        const product: ProductInterface | undefined = productsService.getProductById( productId );

        winstonLogger.logRequest(`"Received product with id: ${ productId }: ${ JSON.stringify( product ) }`);
        
        if( product )
            return successResponse( { product } );


        return successResponse( { message: "Product not found!!!" }, 404 );
    }
    catch ( err ) {
        return errorResponse( err );
    }
}
