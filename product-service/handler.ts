import * as handlers from './src';
import { Client } from 'pg';
import { PostgresProductService } from './src/services/postgres-memory-product-service';

console.log(process.env);

const databaseClient = new Client();
databaseClient.connect();
const productService = new PostgresProductService(databaseClient)

export const getProductById = handlers.getProductByIdHandler(productService);
export const getAllProducts = handlers.getAllProductsHandler(productService);
export const createProduct = handlers.createProductHandler(productService);
