import React, { useState } from 'react';
import GenreList from '../genreList/genreList';

function GenreSelect({genres,selectedGenre,onChange}) {
  const [newselectedGenre, setSelectedGenre] = useState(selectedGenre);
  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    onChange(genre);
  };

  return (
    <>
      <GenreList genres={genres} selectedGenre={newselectedGenre} onChange={handleGenreSelect} />
    </>
  );
}

export default GenreSelect;