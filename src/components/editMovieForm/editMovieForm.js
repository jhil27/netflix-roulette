import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Dialog from "../dialog/dialog";
import { MovieForm } from "../movieForm/movieForm";
import { API_MOVIES_PATH } from "../../constants";


export const EditMovieForm = () => {
  const { movieId } = useParams();
  const [movieState, setMovieState] = useState({ movie: null, loading: true, error: null, isOpen: false });
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(API_MOVIES_PATH + '/' + movieId)
      .then((response) => {
        setMovieState({ ...movieState, movie: response.data, loading: false, isOpen: true });
      })
      .catch((err) => {
        setMovieState({ ...movieState, error: err, loading: false });
      });
  }, [movieId]);

  const updateMovie = async (movieData) => {
    try {
      const response = await axios.put(API_MOVIES_PATH, { ...movieData, id: movieState.movie?.id });
      handleClose();
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleClose = () => {
    navigate(-1);
  }
  return (<>
    <Dialog title='ADD MOVIE' isOpen={movieState.isOpen} onClose={handleClose}>
      <MovieForm movie={movieState.movie} onSubmit={updateMovie}></MovieForm>
    </Dialog>
  </>)
};