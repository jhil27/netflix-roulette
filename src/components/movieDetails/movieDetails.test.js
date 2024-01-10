import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import MovieDetails from './movieDetails';

const mockMovie = {
  title: 'Test Movie',
  poster_path: 'test-poster.jpg',
  vote_average: 7.5,
  genres: ['Action', 'Adventure'],
  tagline: 'An exciting movie',
  release_date: '2022-01-01',
  runtime: 120,
  overview: 'This is a test movie overview.',
};

const mockOnCloseMovieDetails = jest.fn();

test('renders movie details with correct content', () => {
  render(<MovieDetails movie={mockMovie} onCloseMovieDetails={mockOnCloseMovieDetails} />);

  expect(screen.getByText('TEST MOVIE')).toBeInTheDocument();
  expect(screen.getByAltText('Movie Poster')).toBeInTheDocument();
  // expect(screen.getByText('An exciting movie')).toBeInTheDocument();
  expect(screen.getByText(/Action/i)).toBeInTheDocument();
  expect(screen.getByText('This is a test movie overview.')).toBeInTheDocument();
  expect(screen.getByText('2022')).toBeInTheDocument();
  expect(screen.getByText('2hr 0min')).toBeInTheDocument();
});

test('calls onCloseMovieDetails when close button is clicked', () => {
  render(<MovieDetails movie={mockMovie} onCloseMovieDetails={mockOnCloseMovieDetails} />);

  fireEvent.click(screen.getByText('×'));

  expect(mockOnCloseMovieDetails).toHaveBeenCalled();
});
