import css from './NotFoundPage.module.css';

import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className={css.notFoundPage}>
      <h2>Oops! We can&apos;t find the page you&apos;re looking for</h2>
      <div className={css.homePageLink}>
        <Link to="/">Home Page</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
