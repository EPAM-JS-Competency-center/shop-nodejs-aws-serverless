import { ProductsService, ProductInterface } from "./services/productsService";
import { errorResponse, successResponse, responseInterface } from "./utils/apiResponseBuilder";

export const getProductById: (event, _context) => Promise<responseInterface> = async (event, _context) => {
    try {
        const { productId = '' } = event.pathParameters;
        const productsService = new ProductsService();

        const product: ProductInterface | undefined = await productsService.getProductById( productId );
        
        if( product )
            return successResponse( { product } );


        return successResponse( { message: "Product not found!!!" }, 404 );
    }
    catch ( err ) {
        return errorResponse( err );
    }
}
