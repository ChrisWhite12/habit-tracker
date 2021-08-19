import React from 'react'
import { fireEvent, render } from '@testing-library/react-native'

describe('gridsquare test', () => {
    it('should render a the default component', () => {
        const component = render()
        expect(component).toHaveLength(1)
    })
})