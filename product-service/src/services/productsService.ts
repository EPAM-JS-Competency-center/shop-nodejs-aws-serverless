import products from "./products.json";
import { winstonLogger } from "../utils/winstonLogger";

interface ProductInterface {
    id: string,
    title: string,
    description: string,
    price: number,
    logo: string,
    count: number
}

interface ProductsServiceInterface {
    getProductById( id: string ): undefined | ProductInterface
    getAllProducts(): ProductInterface[]
}

class ProductsService implements ProductsServiceInterface {
    getProductById( id: string ) {
        try {
            return products.find( product => product.id === id );
        }
        catch( error ) {
            winstonLogger.logError( `Method ProductsModel::getProductById. Incorrect id: ${ id }` );
            winstonLogger.logError( `Error message: ${ error }` );
        }
    }

    getAllProducts() {
        try {
            return products;
        } 
        catch (error) {
            winstonLogger.logError( `Method ProductsModel::getAllProducts.` );
            winstonLogger.logError( `Error message: ${ error }` );
        }
    }
}

export { ProductsService, ProductInterface };
