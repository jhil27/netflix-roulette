import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Dialog from './dialog';

describe('Dialog Component', () => {
    test('renders null when isOpen is false', () => {
        const { container } = render(<Dialog isOpen={false} />);
        expect(container.firstChild).not.toBeInTheDocument();
    });

    test('renders the dialog when isOpen is true', () => {
        render(<Dialog isOpen={true} />);
        expect(screen.getByTestId('modal')).toBeInTheDocument();
    });

    test('calls onClose prop when close button is clicked', () => {
        const onCloseMock = jest.fn();
        render(<Dialog isOpen={true} onClose={onCloseMock} />);
        fireEvent.click(screen.getByTestId('close-button'));
        expect(onCloseMock).toHaveBeenCalled();
    });

    test('renders title and children inside the modal', () => {
        const title = 'Test Dialog';
        const content = <p>Test content</p>;
        render(<Dialog isOpen={true} title={title}>{content}</Dialog>);

        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText('Test content')).toBeInTheDocument();
    });
});
