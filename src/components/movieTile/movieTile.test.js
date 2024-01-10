import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import MovieTile from './movieTile';

const mockMovie = {
  poster_path: 'path/to/image.jpg',
  title: 'Test Movie',
  release_date: '2023-01-01',
  genres: ['Action', 'Drama'],
};

describe('MovieTile Component', () => {
  test('renders movie details correctly', () => {
    render(<MovieTile movie={mockMovie} onClick={() => { }} />);

    expect(screen.getByAltText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('Action, Drama')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
  });

  test('calls onClick prop when clicked', () => {
    const onClickMock = jest.fn();
    render(<MovieTile movie={mockMovie} onClick={onClickMock} />);

    fireEvent.click(screen.getByText('Test Movie'));
    expect(onClickMock).toHaveBeenCalledWith(mockMovie);
  });

  test('opens edit modal when "Edit" is clicked', () => {
    render(<MovieTile movie={mockMovie} onClick={() => { }} />);

    fireEvent.click(screen.getByText('⋮'));
    fireEvent.click(screen.getByText('Edit'));

    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  test('opens delete modal when "Delete" is clicked', () => {
    render(<MovieTile movie={mockMovie} onClick={() => { }} />);

    fireEvent.click(screen.getByText('⋮'));
    fireEvent.click(screen.getByText('Delete'));

    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });
});
