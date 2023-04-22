import css from './ImageGallery.module.scss';

export const ImageGallery = ({ children }) => {
  return <ul className={css.ImageGallery}>{children}</ul>;
};
