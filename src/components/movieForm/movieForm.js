import React from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { GENRES } from '../../constants';
import './movieForm.scss';

function convertPayload(payload) {
  const convertedPayload = {};
  Object.keys(payload).forEach(key => {
    const value = payload[key];

    switch (key) {
      case 'tagline':
        convertedPayload[key] = typeof value === 'string' ? value : "null";
        break;
      case 'vote_average':
      case 'vote_count':
        convertedPayload[key] =  value ? value : 0;
        break;
      case 'budget':
        convertedPayload[key] =  value ? value : 0;
        break;
      case 'revenue':
        convertedPayload[key] =  value ? value : 0;
        break;
      case 'releaseDate':
        convertedPayload.release_date=value;
          delete convertedPayload.releaseDate;
          break;
      case 'movieUrl':
        convertedPayload.poster_path=value;
          delete convertedPayload.movieUrl;
          break;
      case 'rating':
        convertedPayload.vote_average=+value;
          delete convertedPayload.rating;
        break;
      case 'runtime':
        convertedPayload.runtime=+value;
        break;
      default:
        convertedPayload[key] = value;
    }
  });
  return convertedPayload;
}

export const MovieForm = ({ movie, onSubmit }) => {

  // Default values when no movie object is provided
  const defaultValues = {
    title: '',
    release_date: '',
    poster_path: '',
    vote_average: '',
    genres: ['Action'],
    runtime: null,
    overview: '',
  };

  // Use the provided movie object or default values
  const {
    title,
    release_date: releaseDate,
    poster_path: movieUrl,
    vote_average: rating,
    genres,
    runtime,
    overview,
  } = movie || defaultValues;

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      title,
      releaseDate,
      movieUrl,
      rating,
      genres: genres.map((genre) => ({ value: genre, label: genre })),
      runtime,
      overview,
    },
  });

  const registerMovieUrl = () => {
    return register('movieUrl', {
      pattern: {
        value: /^(http|https):\/\/[^ "]+$/,
        message: 'Not a valid URL'
      },
      required: 'Image URL is required'
    });
  };

  const registerRuntime = () => {
    return register('runtime', {
      required: 'Runtime is required',
      min: { value: 1, message: 'Allowed value is 1-1000' },
      max: { value: 1000, message: 'Allowed value is 1-1000' }
    });
  };

  const registerRating = () => {
    return register('rating', {
      required: { value: true, message: 'Rating is required' },
      max: { value: 10, message: 'Allowed value is 0-10' },
      min: { value: 0, message: 'Allowed value is 0-10' }
    });
  };

  const handleFormSubmit = (data) => {
    // Map selected genres back to an array of strings
    const selectedGenres = data.genres ? data.genres.map((option) => option.value) : [];
    onSubmit(convertPayload({ ...data, genres: selectedGenres }));
  };

  // Use watch to get the selected genre value
  const selectedGenre = watch('genres');


  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="form-grid">
          <div className="form-field">
            <label className="form-label" htmlFor="title">
              TITLE
            </label>
            <input
              className="form-input form-placeholder"
              type="text"
              id="title"
              {...register('title', { required: 'Title is required' })}
              placeholder="Enter the movie title"
            />
            <span className='form-error-message'>{errors?.title?.message}</span>
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="releaseDate">
              RELEASE DATE
            </label>
            <input
              className="form-input"
              type="date"
              id="releaseDate"
              {...register('releaseDate')}
            />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="movieUrl">
              MOVIE URL
            </label>
            <input
              className="form-input form-placeholder"
              type="text"
              id="movieUrl"
              {...registerMovieUrl()}
              placeholder="Enter the movie URL"
            />
            <span className='form-error-message'>{errors?.movieUrl?.message}</span>
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="rating">
              RATING
            </label>
            <input
              className="form-input form-placeholder no-arrow"
              type="number"
              id="rating"
              step={.1}
              {...registerRating()}
              placeholder="Enter the movie rating"
            />
            <span className='form-error-message'>{errors?.rating?.message}</span>
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="genre">
              GENRE
            </label>
            <Select
              classNamePrefix='form-select'
              {...register('genres', { required: true })} // Use register properly
              options={GENRES}
              isMulti
              value={selectedGenre} // Set the value prop to avoid the mentioned error
              onChange={(selectedOptions) => setValue('genres', selectedOptions)} // Update the genre value on change
            />
            {
              (!selectedGenre || selectedGenre.length) <1 && 
              <span className='form-error-message'>Select at lease one genre to proceed</span>
            }
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="runtime">
              RUNTIME
            </label>
            <input
              className="form-input form-placeholder no-arrow"
              type="number"
              id="runtime"
              step={1}
              {...registerRuntime()}
              placeholder="Enter the movie runtime"
            />
          </div>
        </div>
        <div className="form-field overview">
          <label className="form-label" htmlFor="overview">
            OVERVIEW
          </label>
          <textarea
            className="form-textarea form-placeholder"
            rows="4"
            id="overview"
            {...register('overview', { required: 'Overview is required' })}
            placeholder="Enter the movie overview"
          ></textarea>
          <span className='form-error-message'>{errors?.overview?.message}</span>
        </div>
        <div className="form-action">
          <button className="form-reset-button" type="reset">
            RESET
          </button>
          <button className="form-button" type="submit">
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};
