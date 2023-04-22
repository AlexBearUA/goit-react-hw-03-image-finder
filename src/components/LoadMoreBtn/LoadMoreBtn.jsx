import PropTypes from 'prop-types';
import css from './LoadMoreBtn.module.scss';
export const LoadMoreBtn = ({ onClick }) => {
  return (
    <button onClick={onClick} type="button" className={css.LoadMoreBtn}>
      Load more
    </button>
  );
};

LoadMoreBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};
