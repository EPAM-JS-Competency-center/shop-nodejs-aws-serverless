export interface ProductInterface {
    id: string,
    title: string,
    description: string,
    price: number,
    logo: string,
    count: number,
}

export interface ProductInterface {
    title: string,
    description: string,
    price: number,
    logo: string,
    count: number,
}

export interface ProductServiceInterface {
    getProductById: (id: string) => Promise<ProductInterface>,
    getAllProducts: () => Promise<ProductInterface[]>,
    create: (product: Omit<ProductInterface, 'id'>) => Promise<ProductInterface>,
}
