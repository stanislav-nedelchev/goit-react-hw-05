import css from './MovieDetailsPage.module.css';

import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../../api/movieAPI';

const MovieDetailsPage = () => {
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  const { movieId } = useParams();
  const backlink = useRef(location.state ?? '/');

  useEffect(() => {
    if (!movieId) return;
    const asyncWrapper = async () => {
      try {
        setError(null);
        const requestData = await fetchMovieDetails(movieId);
        setMovie(requestData);
      } catch {
        setError('Something went wrong. Please try again later.');
      }
    };
    asyncWrapper();
  }, [movieId]);

  return (
    <div className={css.movieDetailsPageBox}>
      <div className={css.movieInfo}>
        <div>
          <div className={css.goBack}>
            <Link to={backlink.current}>Go Back</Link>
          </div>
          {error && <p>{error}</p>}
          {movie && (
            <img
              src={
                (movie.poster_path = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`)
              }
              width={250}
              alt={movie.title}
            />
          )}
        </div>
        <div>
          {movie && (
            <div>
              <h1 className={css.movieTitle}>{movie.title}</h1>
              {movie.overview && (
                <div>
                  <h2>Overview</h2>
                  <p>{movie.overview}</p>
                </div>
              )}
              <h2>Genres</h2>
              <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
            </div>
          )}
        </div>
      </div>
      <div className={css.movieAdditInfo}>
        <h2>Additional Information:</h2>
        <Link
          className={css.movieAdditInfoLink}
          to="reviews"
          state={backlink.current}
        >
          Reviews
        </Link>
        <Link
          className={css.movieAdditInfoLink}
          to="cast"
          state={backlink.current}
        >
          Cast
        </Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
