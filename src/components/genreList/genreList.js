import React from 'react';
import './genreList.scss';

function GenreList({ genres, selectedGenre, onChange }) {
  return (
    <div>
      {genres.map((genre) => (
        <button
          key={genre}
          className={genre === selectedGenre ? 'selected-genre' : 'transparent-button'}
          onClick={() => onChange(genre)}
        >
          {genre.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
export default GenreList;