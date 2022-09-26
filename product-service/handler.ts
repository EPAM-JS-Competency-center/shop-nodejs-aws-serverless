import * as handlers from './src';
import { InMemoryProductService } from './src/services/in-memory-product-service';

const productService = new InMemoryProductService();

export const getProductById = handlers.getProductByIdHandler(productService);
export const getAllProducts = handlers.getAllProductsHandler(productService);
export const createProduct = handlers.createProductHandler(productService);
