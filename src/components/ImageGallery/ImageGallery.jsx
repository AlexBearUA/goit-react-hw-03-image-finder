import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import css from './ImageGallery.module.scss';

class ImageGallery extends Component {
  state = {
    images: [],
    total: 0,
    loading: false,
    responseIsEmpty: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevProps.searchQuery;
    const nextSearchQuery = this.props.searchQuery;
    if (prevSearchQuery !== nextSearchQuery) {
      this.setState({ loading: true, images: null });
      axios
        .get(
          `https://pixabay.com/api/?q=${nextSearchQuery}&page=1&key=34213016-753010ce7a0400954b4163a43&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(({ data: { total, hits: images } }) => {
          this.setState({ total, images });
          if (images.length === 0) {
            this.setState({ responseIsEmpty: true });
          }
        })
        .catch(error => console.log(error))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    const { images, loading, responseIsEmpty } = this.state;
    return (
      <>
        {responseIsEmpty && alert('There are no images on your searchquery')}
        {images && (
          <ul className={css.ImageGallery}>
            {images.map(({ id, tags, webformatURL }) => (
              <ImageGalleryItem
                key={id}
                webFormatUrl={webformatURL}
                tags={tags}
              />
            ))}
          </ul>
        )}
        {loading && <Loader />}
      </>
    );
  }
}

export default ImageGallery;
