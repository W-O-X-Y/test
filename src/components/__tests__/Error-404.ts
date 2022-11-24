import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ErrorPage from '../../views/Error-404.vue'

describe('Error Page', () => {
    it('renders properly', () => {
        const wrapper = mount(ErrorPage)
        expect(wrapper.text()).toContain('404')
    })
})
