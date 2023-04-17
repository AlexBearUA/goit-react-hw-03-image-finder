import css from './LoadMoreBtn.module.scss';
export const LoadMoreBtn = ({ onClick }) => {
  return (
    <button onClick={onClick} type="button" className={css.LoadMoreBtn}>
      Load more
    </button>
  );
};
