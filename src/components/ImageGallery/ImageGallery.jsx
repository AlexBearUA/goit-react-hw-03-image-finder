import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.scss';

export const ImageGallery = ({ images }) => {
  return (
    <ul className={css.ImageGallery}>
      {images.map(({ id, tags, webformatURL }) => (
        <ImageGalleryItem key={id} webFormatUrl={webformatURL} tags={tags} />
      ))}
    </ul>
  );
};
