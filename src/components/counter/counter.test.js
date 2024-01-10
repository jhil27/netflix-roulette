import '@testing-library/jest-dom'

import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Counter from './counter'

describe('Test Counter Component', () => {
    test('check if the counter is rendered with inital value', () => {
        render(<Counter initialCount={3}></Counter>);
        expect(screen.getByText(/3/i)).not.toBeNull();
    })
    test('check increment', () => {
        render(<Counter initialCount={3}></Counter>);
        //Increment
        fireEvent.click(screen.getByText('+'));
        expect(screen.getByText('4')).not.toBeNull();
    })

    test('check decrement', () => {
        render(<Counter initialCount={3}></Counter>);
        //Decrement
        fireEvent.click(screen.getByText('-'));
        expect(screen.getByText('2')).not.toBeNull();
    })
})
