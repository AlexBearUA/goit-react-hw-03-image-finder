import css from './ImageGalleryItem.module.scss';
export const ImageGalleryItem = ({ id, webFormatUrl, tags }) => {
  return (
    <li className={css.ImageGalleryItem} key={id}>
      <img className={css.ImageGalleryPicture} src={webFormatUrl} alt={tags} />
    </li>
  );
};
