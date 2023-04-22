import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import imagesAPI from '../services/images-api';
import Searchbar from './Searchbar/Searchbar';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import { Loader } from './Loader/Loader';
import { LoadMoreBtn } from './LoadMoreBtn/LoadMoreBtn';
import { ImageGallery } from './ImageGallery/ImageGallery';

class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    isloading: false,
    loadMore: false,
    page: 1,
    // endOfCollection: false,
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({
        isloading: true,
        loadMore: false,
      });

      imagesAPI
        .fetchImages(searchQuery, page)
        .then(({ data: { totalHits, hits: images } }) => {
          if (images.length === 0) {
            return toast.error('There are no images on your searchquery');
          }

          images.length >= totalHits
            ? this.setState({
                loadMore: false,
              })
            : this.setState({
                loadMore: true,
              });

          this.setState(prevState => ({
            totalHits,
            images: [...prevState.images, ...this.normalaziedImages(images)],
          }));
        })
        .catch(error => console.log(error))
        .finally(() => this.setState({ isloading: false }));
    }
  }

  handleSearchSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1, images: [] });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  normalaziedImages(images) {
    return images.map(({ id, tags, webformatURL, largeImageURL }) => ({
      id,
      tags,
      webformatURL,
      largeImageURL,
    }));
  }

  render() {
    const { images, isloading, loadMore } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery>
          {images.map(({ id, tags, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              webFormatUrl={webformatURL}
              largeImageUrl={largeImageURL}
              tags={tags}
            />
          ))}
        </ImageGallery>
        {/* {scrollOnLoading()} */}
        {loadMore && <LoadMoreBtn onClick={this.loadMore} />}
        {isloading && <Loader />}
        {/* {endOfCollection && <EndOfCollection />} */}
        <ToastContainer autoClose={1000} />
      </>
    );
  }
}
export default App;
