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
import { scrollOnLoading } from '../services/scroll';
class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    isloading: false,
    loadMore: false,
    endOfCollection: false,
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, page, images } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({
        isloading: true,
        loadMore: false,
      });

      imagesAPI
        .fetchImages(searchQuery, page)
        .then(({ data: { totalHits, hits: fetchedImages } }) => {
          if (totalHits === 0) {
            return toast.error('There are no images on your searchquery');
          }

          this.setState(prevState => ({
            totalHits,
            images: [
              ...prevState.images,
              ...this.normalaziedImages(fetchedImages),
            ],
          }));

          images.length + 12 < totalHits && this.setState({ loadMore: true });

          if (
            fetchedImages.length === totalHits ||
            (images.length + 12 >= totalHits && images.length !== 0)
          ) {
            this.setState({ endOfCollection: true });
          }
        })
        .catch(error => console.log(error))
        .finally(() => this.setState({ isloading: false }));
    }

    this.state.page > 1 && scrollOnLoading();
  }

  handleSearchSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1, images: [], endOfCollection: false });
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
    const { images, isloading, loadMore, endOfCollection } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery>
          {images &&
            images.map(({ id, tags, webformatURL, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                webFormatUrl={webformatURL}
                largeImageUrl={largeImageURL}
                tags={tags}
              />
            ))}
        </ImageGallery>
        {loadMore && <LoadMoreBtn onClick={this.loadMore} />}
        {isloading && <Loader />}
        {endOfCollection && (
          <p className="TheEnd">You've reached the end of search results.</p>
        )}
        <ToastContainer autoClose={1000} />
      </>
    );
  }
}
export default App;
