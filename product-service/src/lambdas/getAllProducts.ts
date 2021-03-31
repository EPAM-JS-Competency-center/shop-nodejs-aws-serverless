import { ProductsService, ProductInterface } from "../../libs/services/products.service";
import { errorResponse, successResponse, responseInterface } from "../../libs/response-helpers";

export const getAllProducts: ( event, _context ) => Promise<responseInterface> = async (_event, _context) => {
    try {
        const productsService = new ProductsService();

        const products: ProductInterface[] = await productsService.getAllProducts();

        return successResponse( products );
    } 
    catch (err) {
        return errorResponse( err );
    }
}
