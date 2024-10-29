import css from './MovieCast.module.css';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits } from '../../api/movieAPI';

const MovieCast = () => {
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;
    const asyncWrapper = async () => {
      try {
        setError(null);
        const requestData = await fetchMovieCredits(movieId);
        setCast(requestData.cast);
      } catch {
        setError('Something went wrong. Please try again later.');
      }
    };
    asyncWrapper();
  }, [movieId]);

  return (
    <div>
      {error && <p>{error}</p>}
      {cast.length > 0 ? (
        <ul className={css.cast}>
          {cast.map(item => (
            <li key={item.cast_id} className={css.castItem}>
              <img
                src={
                  (item.profile_path = `https://image.tmdb.org/t/p/w200/${item.profile_path}`)
                }
                alt={item.name}
                width={150}
                height={225}
              />
              <h3 className={css.castItemTitle}>{item.name}</h3>
            </li>
          ))}
        </ul>
      ) : (
        <p>No cast information available</p>
      )}
    </div>
  );
};

export default MovieCast;
