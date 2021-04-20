import { ProductServiceInterface, ProductInterface } from './products';
import products from './products-data.json';
import { v4 as uuidv4 } from 'uuid';

class InMemoryProductService implements ProductServiceInterface {
    getProductById(id: string) {
        return Promise.resolve(products.find( product => product.id === id ));
    }

    getAllProducts() {
        return Promise.resolve(products);
    }

    create(product: Pick<ProductInterface, 'title' | 'description' | 'price' | 'logo' | 'count'>) {
        products.push({
            id: uuidv4(),
            ...product,
        });
        return Promise.resolve(products[products.length - 1]);
    }
}

export { InMemoryProductService };