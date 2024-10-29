import css from './SearchForm.module.css';

import toast, { Toaster } from 'react-hot-toast';

const SearchForm = ({ onSubmit }) => {
  const handleSubmit = event => {
    event.preventDefault();
    const query = event.currentTarget.movieName.value.trim();
    if (query === '') {
      toast.error('Please enter a search term', {
        position: 'top-right',
      });
      return;
    }
    onSubmit(query);
    event.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit} className={css.searchForm}>
      <input
        type="text"
        placeholder="Enter movie name"
        name="movieName"
        className={css.searchInput}
      />
      <button type="submit" className={css.searchFormButton}>
        Search
      </button>
      <div>
        <Toaster />
      </div>
    </form>
  );
};

export default SearchForm;
