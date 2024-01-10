
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MovieDetails from '../movieDetails/movieDetails';
import { API_MOVIES_PATH } from '../../constants';

const MovieDetailsWrapper = () => {
  const { movieId } = useParams();
  const [movieState, setMovieState] = useState({ movie: null, loading: true, error: null });
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(API_MOVIES_PATH + '/' + movieId)
      .then((response) => {
        setMovieState({ ...movieState, movie: response.data, loading: false });
      })
      .catch((err) => {
        setMovieState({ ...movieState, error: err, loading: false });
      });
  }, [movieId]);
  const onCloseMovieDetails = () => {
    navigate(-1);
  }
  if (movieState.error) {
    return <div>Error: {movieState.error?.message}</div>
  }
  return !movieState.loading
    && !movieState.error
    && <MovieDetails movie={movieState.movie} onCloseMovieDetails={onCloseMovieDetails}></MovieDetails>;
}

export default MovieDetailsWrapper;
