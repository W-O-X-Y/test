export type Product = {
    id: number
    title: string
    price: number
    description: string
    images?: { src: string; alt?: string }[]
}
