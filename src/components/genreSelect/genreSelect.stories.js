import React from 'react';
import  { Meta, StoryObj } from '@storybook/react';
import GenreSelect from './genreSelect';

export default {
  title: 'Genre Select',
  component: GenreSelect,
};
const genres = ['Action', 'Comedy', 'Drama', 'Science Fiction', 'Horror'];
const selectedGenre = 'Drama';
const handleGenreSelect = (selectedGenre) => {
  console.log("Selected Genre: " + selectedGenre);
}
export const Default = () => (
  <GenreSelect genres={genres} selectedGenre={selectedGenre} onChange={handleGenreSelect} />
);