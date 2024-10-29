import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { searchMovieByName } from '../../api/movieAPI';

import SearchForm from '../../components/SearchForm/SearchForm';
import MovieList from '../../components/MovieList/MovieList';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get('query');

  useEffect(() => {
    if (!movieName) return;
    const asyncWrapper = async () => {
      try {
        setError(null);
        const requestData = await searchMovieByName(movieName);
        console.log(requestData.results);
        setMovies(requestData.results);
      } catch {
        setError('Something went wrong. Please try again later.');
      }
    };
    asyncWrapper();
  }, [movieName]);
  const onSubmit = query => {
    setSearchParams({ query });
  };

  return (
    <div>
      <SearchForm onSubmit={onSubmit} />
      {error && <p>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
