import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios'
import { useSearchParams, Outlet, useNavigate, useLocation } from 'react-router-dom';
import GenreSelect from '../../components/genreSelect/genreSelect';
import MovieTile from '../../components/movieTile/movieTile';
import SortControl from '../../components/sortControl/sortControl';
import './movieListPage.scss';

function MovieListPage({ query }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [movieList, setMovieList] = useState([]);
    const [movieCount, setMovieCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams({
        sortBy: 'release_date',
        genre: 'All'
    });
    const getMoviesUrl = 'http://localhost:4000/movies';
    const genres = ['All', 'Action', 'Comedy', 'Drama', 'Science Fiction', 'Horror'];

    const handleGenreSelect = (selectedGenre) => {
        searchParams.set('genre', selectedGenre);
        setSearchParams(searchParams);
    }
    const handleSortChange = (value) => {
        searchParams.set('sortBy', value);
        setSearchParams(searchParams);
    };

    const onMovieClick = (movieId) => {
        navigate('/' + movieId);
        scrollToTop();
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const getMovies = useCallback(() => {
        const cancelTokenSource = axios.CancelToken.source();
        let genre = searchParams.get('genre');
        genre = genre === 'All' ? '' : genre;
        axios.get(getMoviesUrl, {
            params: {
                sortBy: searchParams.get('sortBy'),
                sortOrder: 'asc',
                searchBy: 'title',
                search: query,
                filter: genre
            },
            cancelToken: cancelTokenSource.token
        })
            .then((response) => {
                setMovieList(response.data.data);
                setMovieCount(response.data.totalAmount);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
        return () => {
            cancelTokenSource.cancel('Request canceled');
        }
    }, [searchParams, query]);

    useEffect(() => {
        getMovies();
    }, [getMovies]);

    useEffect(() => {
        console.log(location);
        if(!location.pathname.match(/\b(?:new|edit|\d+)$/))
            getMovies();
    }, [getMovies, location]);


    if (error) {
        return <div>Error: {error?.message}</div>
    }

    return (
        <div className='app-container'>
            <Outlet />
            <div className="movie-genre-sort-by-container">
                <div className='genreSelectContainer'>
                    <GenreSelect genres={genres} selectedGenre={searchParams.get('genre')} onChange={handleGenreSelect} />
                </div>
                <div></div>
                <div className='sortByContainer'>
                    <SortControl currentSelection={searchParams.get('sortBy')} handleSelectChange={handleSortChange} />
                </div>
            </div>

            {/* <Counter initialCount={INITAL_COUNT} /> */}
            <span className="bold-br"></span>
            {!loading ?
                (<div>
                    <p className='movie-count'><b>{movieCount}</b> movies found</p>
                    <div className='movie-tile-container'>
                        {movieList.map((movie) => {
                            return <MovieTile key={movie.id} movie={movie} onClick={() => onMovieClick(movie.id)} />;
                        })}
                    </div>
                </div>) :
                (<div>Loading...</div>)
            }
        </div>
    );
}

export default MovieListPage;