import products from "../../products.json";

interface ProductInterface {
    id?: string,
    title: string,
    description: string,
    price: number,
    logo: string,
    count?: number
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
            console.log( `Method ProductsModel::getProductById. Error: ${ error }` );
        }
    }

    getAllProducts() {
        try {
            return products;
        } 
        catch (error) {
            console.log( `Method ProductsModel::getAllProducts. Error: ${ error }` );
        }
    }
}

export { ProductsService, ProductInterface };
