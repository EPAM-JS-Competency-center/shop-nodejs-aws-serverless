export interface ProductInterface {
    id: string,
    title: string,
    description: string,
    price: number,
    logo: string,
    count: number,
}

export interface ProductServiceInterface {
    getProductById: (id: string) => Promise<ProductInterface>,
    getAllProducts: () => Promise<ProductInterface[]>,
    create: (product: Pick<ProductInterface, 'title' | 'description' | 'price' | 'logo' | 'count'>) => Promise<ProductInterface>,
}
