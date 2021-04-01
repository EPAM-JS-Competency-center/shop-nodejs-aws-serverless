import products from "./products.json";

export interface ProductInterface {
    id: string,
    title: string,
    description: string,
    price: number,
    logo: string,
    count: number
}

export const getProductById = ( id: string ): ProductInterface => products.find( product => product.id === id );
export const getAllProducts = (): ProductInterface[] => products;
