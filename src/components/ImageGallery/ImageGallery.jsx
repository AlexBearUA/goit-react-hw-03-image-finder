import React, { Component } from 'react';
import { toast } from 'react-toastify';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import imagesAPI from '../../services/images-api';
import { Loader } from 'components/Loader/Loader';
import { LoadMoreBtn } from 'components/LoadMoreBtn/LoadMoreBtn';
// import { EndOfCollection } from './EndOfCollection';

import css from './ImageGallery.module.scss';

class ImageGallery extends Component {
  state = {
    images: [],
    totalHits: 0,
    isloading: false,
    loadMore: false,
    page: 1,
    endOfCollection: false,
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevProps.searchQuery;
    const nextSearchQuery = this.props.searchQuery;

    if (
      prevState.page !== this.state.page ||
      nextSearchQuery !== prevSearchQuery
    ) {
      this.setState({ isloading: true });
      this.setState({ loadMore: false });
      if (nextSearchQuery !== prevSearchQuery) {
        this.setState({ page: 1, images: [] });
      }
      imagesAPI
        .fetchImages(nextSearchQuery, this.state.page)
        .then(({ data: { totalHits, hits: images } }) => {
          if (images.length === 0) {
            return toast.error('There are no images on your searchquery');
          }

          this.setState(prevState => ({
            totalHits,
            images: [...prevState.images, ...images],
          }));

          this.setState({ loadMore: true });
        })
        .catch(error => console.log(error))
        .finally(() => this.setState({ isloading: false }));
    }
  }

  render() {
    const { images, isloading, loadMore } = this.state;
    return (
      <>
        <ul className={css.ImageGallery}>
          {images.map(({ id, tags, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              webFormatUrl={webformatURL}
              largeImageUrl={largeImageURL}
              tags={tags}
            />
          ))}
        </ul>

        {loadMore && <LoadMoreBtn onClick={this.loadMore} />}
        {isloading && <Loader />}
        {/* {endOfCollection && <EndOfCollection />} */}
      </>
    );
  }
}

export default ImageGallery;
