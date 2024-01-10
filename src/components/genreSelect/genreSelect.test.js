import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import GenreSelect from './genreSelect';

const mockGenres = ['ACTION', 'DRAMA', 'COMEDY'];
const mockSelectedGenre = 'DRAMA';
const mockOnChange = jest.fn();

describe('GenreSelect Component', () => {
    it('renders GenreList with provided genres and selected genre', () => {
        render(<GenreSelect genres={mockGenres} selectedGenre={mockSelectedGenre} onChange={mockOnChange} />);

        mockGenres.forEach((genre) => {
            expect(screen.getByText(genre)).toBeInTheDocument();
        });

        expect(screen.getByText(mockSelectedGenre)).toHaveClass('selected-genre');
    });

    it('calls onChange prop when a genre is selected', () => {
        render(<GenreSelect genres={mockGenres} selectedGenre={mockSelectedGenre} onChange={mockOnChange} />);

        fireEvent.click(screen.getByText('COMEDY'));

        expect(mockOnChange).toHaveBeenCalledWith('COMEDY');
    });

    it('updates selected genre state when a genre is selected', () => {
        render(<GenreSelect genres={mockGenres} selectedGenre={mockSelectedGenre} onChange={mockOnChange} />);

        fireEvent.click(screen.getByText('ACTION'));

        expect(screen.getByText('ACTION')).toHaveClass('selected-genre');
        expect(mockOnChange).toHaveBeenCalledWith('ACTION');
    });
});
