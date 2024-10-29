import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../api/movieAPI';

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;
    const asyncWrapper = async () => {
      try {
        setError(null);
        const requestData = await fetchMovieReviews(movieId);
        setReviews(requestData.results);
        console.log(requestData.results);
      } catch {
        setError('Something went wrong. Please try again later.');
      }
    };
    asyncWrapper();
  }, [movieId]);

  return (
    <div>
      {error && <p>{error}</p>}
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <p>
                <strong>Author:</strong> {review.author}
              </p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available</p>
      )}
    </div>
  );
};

export default MovieReviews;
