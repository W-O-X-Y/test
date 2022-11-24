import type { Product } from '@/types/Product'
import type { Profile } from '@/types/Profile'
import { rest } from 'msw'
import productsJSON from './products.json'
import profilesJSON from './profiles.json'

export default [
    rest.get('/product', (req, res, ctx) => {
        const id = req.url.searchParams.get('id')
        const product: Product | undefined = productsJSON.products.find(
            (p) => p.id == Number(id)
        )
        return res(
            ctx.delay(50),
            ctx.json(product ?? { message: 'NO matching product' })
        )
    }),

    rest.get('/profile', (req, res, ctx) => {
        const id = req.url.searchParams.get('id')
        const profile: Profile | undefined = profilesJSON.profiles.find(
            (p) => p.id == Number(id)
        )
        return res(
            ctx.delay(50),
            ctx.json(profile ?? { message: 'NO matching profile' })
        )
    }),
]
