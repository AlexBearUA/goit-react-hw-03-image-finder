import css from './ImageGallery.module.scss';
export const EndOfCollection = () => {
  return (
    <p className={css.TheEnd}>
      We're sorry, but you've reached the end of search results.
    </p>
  );
};
