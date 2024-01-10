import React, { useState } from 'react';
import MovieListPage from './components/movieListPage/movieListPage';
import SearchForm from './components/searchForm/searchForm';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import MovieDetailsWrapper from './components/movieDetailsWrapper/movieDetailsWrapper';
import { AddMovieForm } from './components/addMovieForm/addMovieForm';
import { EditMovieForm } from './components/editMovieForm/editMovieForm';
import './App.scss';

function App() {
  const [searchParams, setSearchParams] = useSearchParams({ query: '' });
  const [queryString, setqueryString] = useState(searchParams.get('query'));

  const handleSearch = (searchTerm) => {
    if (searchTerm) {
      searchParams.set('query', searchTerm);
    } else {
      searchParams.delete('query');
    }

    setSearchParams(searchParams);
    setqueryString(searchTerm);
  };
  return (
    <Routes>
      <Route path="/" element={<MovieListPage query={queryString} />} >
        <Route path="/" element={<SearchForm initialSearchTerm={searchParams.get('query')} onChange={handleSearch} />}>
          <Route path='/new' element={<AddMovieForm />} />
        </Route>
        <Route path=":movieId" element={<MovieDetailsWrapper />} />
        <Route path="/:movieId/edit" element={<EditMovieForm />} />
      </Route>
    </Routes>
  );
}

export default App;