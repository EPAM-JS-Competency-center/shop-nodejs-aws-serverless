import { DBInterface } from "../../libs/db/DB.interface";
import { diContainer } from "../../libs/di/inversify.config";
import { LoggerInterface } from "../../libs/logger/logger.interface";
import { TYPES } from "../../libs/types";

interface ProductInterface {
    id?: string,
    title: string,
    description: string,
    price: number,
    logo: string,
    count?: number
}

interface ProductsModelInterface {
    getProductById( id: string ): Promise<null | ProductInterface>
    getAllProducts(): Promise<ProductInterface[]>
    createProduct( product: ProductInterface ): Promise<null | ProductInterface>
    removeProduct( id: string ): Promise<any>
}

class ProductsModel implements ProductsModelInterface{
    private readonly DB: DBInterface;
    private readonly logger: LoggerInterface;

    constructor( DB: DBInterface) {
        this.DB = DB;
        this.logger = diContainer.get<LoggerInterface>( TYPES.LOGGER );
    }

    async getProductById( id: string ) {
        try {
            const response = await this.DB.query(`
                SELECT products.id, products.title, products.description, products.price, products.logo, stocks.count 
                FROM products 
                INNER JOIN stocks ON 
                products.id = '${ id }'
                AND stocks.product_id = '${ id }';`
            );

            if( response?.rows?.length ) {
                const { rows: [ product ] } = response;

                return product;
            }
            
            return null;

        }
        catch( error ) {
            this.logger.logError( `Method ProductsModel::getProductById. Error: ${ error }` );
            throw new Error( error  );
        }
    }

    async getAllProducts() {
        try {
            const response = await this.DB.query(
                `SELECT products.id, products.title, products.description, products.price, products.logo, stocks.count 
                    FROM products 
                        INNER JOIN stocks ON 
                            products.id = stocks.product_id;`
            );

            if( response?.rows?.length ) {
                const { rows } = response;

                return rows;
            }
            
            return []; 
        } 
        catch (error) {
            this.logger.logError( `Method ProductsModel::getAllProducts. Error: ${ error }` );
            throw new Error( error  );
        }
    }

    async createProduct({ title, description, price, logo, count }) {
        try {
            const { rows: [ createdProductRecord ] } = await this.DB.query(
                `INSERT INTO products ( title, description, price, logo ) VALUES
                 ( '${ title }', '${ description }', ${ Number( price ) }, '${ logo }' ) 
                RETURNING *`
            );
            const { rows: [ createdStockRecord ] } = await this.DB.query(
                `INSERT INTO stocks ( product_id, count ) VALUES
                 ( '${ createdProductRecord.id }', ${ Number( count ) } ) 
                RETURNING *`
            ); 

            return {
                ...createdProductRecord,
                count: createdStockRecord.count
            }; 
        } 
        catch (error) {
            this.logger.logError( `Method ProductsModel::createProduct. Error: ${ error }` );
            throw new Error( error  );
        }
    }

    async removeProduct( id: string ) {
        try {
            await Promise.all([
                this.DB.query(`DELETE FROM products WHERE id = '${ id }';`),
                this.DB.query(`DELETE FROM stocks WHERE product_id = '${ id }';`)
            ]);
        }
        catch(error) {
            this.logger.logError( `Method ProductsModel::removeProduct. Error: ${ error }` );
            throw new Error( error  );
        }
    }
}

export { ProductsModel, ProductInterface };
