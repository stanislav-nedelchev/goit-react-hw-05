import css from './MovieList.module.css';

import { Link, useLocation } from 'react-router-dom';

const MovieList = ({ movies }) => {
  const location = useLocation();
  
  return (
    <ul className={css.movieList}>
      {movies.map(movie => {
        return (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={location}>
              <div className={css.movieListItem}>
                <h2 className={css.movieListItemTitle}>{movie.title}</h2>
                {movie && (
                  <img
                    src={
                      (movie.poster_path = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`)
                    }
                    alt={movie.title}
                    className={css.movieListItemImg}
                  />
                )}
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieList;
