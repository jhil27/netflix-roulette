import './movieDetails.scss';

const MovieDetails = ({ movie, onCloseMovieDetails }) => {
    const addImageFallback = (event) => {
        event.currentTarget.src = process.env.PUBLIC_URL + '/assets/img/placeholder.png';
    }
    return (
        <div className="movie-details-container">
            <div className="movie-card">
                <div className="movie-poster-details">
                    <img src={movie.poster_path} alt="Movie Poster" onError={addImageFallback} />
                </div>
                <div className="movie-info">
                    <div className='title-rating-container'>
                        <p className="movie-title-details">{movie.title.toUpperCase()}</p>
                        <div className="circle"><span className="number">{movie.vote_average}</span></div>
                    </div>
                    {renderGenres(movie.genres)}
                    {/* <p className="movie-tagline">{movie.tagline}</p> */}
                    <div className='movie-duration-details'>
                        <p className="movie-release-year">{movie.release_date.split("-")[0]}</p>
                        <p className="movie-duration">{Math.floor(movie.runtime / 60)}hr {(movie.runtime % 60)}min </p>
                    </div>
                    <div className="movie-details">
                        <p>{movie.overview}</p>
                    </div>
                </div>
            </div>
            <span className="close close-movie-details" onClick={onCloseMovieDetails}>&times;</span>
        </div>

    )
}

const renderGenres = (genres) => (
    <p>
        <strong></strong>
        {genres.map((genre, index) => (
            <span key={genre} className="genre">
                {genre}
                {index < genres.length - 1 ? "," : "."}
            </span>
        ))}
    </p>
);
export default MovieDetails;