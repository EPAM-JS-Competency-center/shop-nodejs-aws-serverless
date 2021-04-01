import { ProductsService, ProductInterface } from "./services/productsService";
import { errorResponse, successResponse, responseInterface } from "./utils/apiResponseBuilder";

export const getAllProducts: ( event, _context ) => Promise<responseInterface> = async (event, _context) => {
    try {
        console.log("Incoming event: ...")
        const productsService = new ProductsService();

        const products: ProductInterface[] = await productsService.getAllProducts();

        console.log("Received products ...")
        return successResponse( products );
    } 
    catch (err) {
        return errorResponse( err );
    }
}
