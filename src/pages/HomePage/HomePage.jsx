import css from './HomePage.module.css';

import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../../api/movieAPI';

import MovieList from '../../components/MovieList/MovieList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const asyncWrapper = async () => {
      try {
        setError(null);
        const requestData = await getTrendingMovies();
        setMovies(requestData.results);
      } catch {
        setError('Something went wrong. Please try again later.');
      }
    };
    asyncWrapper();
  }, []);

  return (
    <div>
      <h1 className={css.homePageTitle}>Trending Movies</h1>
      {error && <p>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default HomePage;
