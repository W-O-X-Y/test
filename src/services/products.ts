import type { Product } from '@/types/Product'
import { instance } from './index'

export const ProductsAPI = {
    getProduct: async (id: number) => {
        const { data } = await instance.get<Product>('/product', {
            params: { id },
        })
        return data
    },
}
