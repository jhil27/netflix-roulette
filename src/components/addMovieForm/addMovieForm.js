import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Dialog from "../dialog/dialog";
import { MovieForm } from "../movieForm/movieForm";
import { API_MOVIES_PATH } from "../../constants";


export const AddMovieForm = () => {
  const [isOpen, setOpen] = useState(true);
  const navigate = useNavigate();

  const addMovie = async (postData) => {
    try {
      const response = await axios.post(API_MOVIES_PATH, postData);
      console.log('Response:', response.data);
      setOpen(false);
      navigate(`/${response.data.id}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  }
  return (<>
    <Dialog title='ADD MOVIE' isOpen={isOpen} onClose={handleClose}>
      <MovieForm onSubmit={addMovie}></MovieForm>
    </Dialog>
  </>)
};