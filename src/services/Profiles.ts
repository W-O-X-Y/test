import type { Profile } from '@/types/Profile'
import { instance } from './index'

export const ProfilesAPI = {
    getProfile: async (id: number) => {
        const { data } = await instance.get<Profile>('/profile', {
            params: { id },
        })
        return data
    },
}
