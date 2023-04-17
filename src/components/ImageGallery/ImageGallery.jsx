import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import imagesAPI from '../../services/images-api';
import { Loader } from 'components/Loader/Loader';
import { LoadMoreBtn } from 'components/LoadMoreBtn/LoadMoreBtn';

import css from './ImageGallery.module.scss';

class ImageGallery extends Component {
  state = {
    images: [],
    total: 0,
    isloading: false,
    page: 1,
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevProps.searchQuery;
    const nextSearchQuery = this.props.searchQuery;

    if (prevSearchQuery !== nextSearchQuery) {
      this.setState({ isloading: true, images: null });

      imagesAPI
        .fetchImages(nextSearchQuery, this.state.page)
        .then(({ data: { total, hits: images } }) => {
          if (images.length === 0) {
            return toast.error('There are no images on your searchquery');
          }
          this.setState({ total, images });
        })
        .catch(error => console.log(error))
        .finally(() => this.setState({ isloading: false }));
    }
  }

  loadImages = () => {};

  render() {
    const { images, isloading } = this.state;
    return (
      <>
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
        <LoadMoreBtn onClick={this.loadMore} />
        {isloading && <Loader />}
      </>
    );
  }
}

export default ImageGallery;
