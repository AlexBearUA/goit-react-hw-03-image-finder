import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
// import startImages from '../components/total.json';
import axios from 'axios';

// import ImagesApiService from '../services/images-api';
class App extends Component {
  state = {
    total: null,
    loading: false,
    searchQuery: '',
    images: null,
  };

  componentDidMount(prevProps, prevState) {
    // this.setState;
    console.log(this.state.searchQuery);

    // console.log(this.state, this.prevState);

    // if (this.prevState.searchQuery !== this.state.searchQuery) {
    //   this.setState({ loading: true });
    //   axios
    //     .get(
    //       `https://pixabay.com/api/?q=cats&page=1&key=34213016-753010ce7a0400954b4163a43&image_type=photo&orientation=horizontal&per_page=12`
    //     )
    //     .then(({ data: { total, hits: images } }) =>
    //       this.setState({ total, images })
    //     )
    //     .finally(() => this.setState({ loading: false }));
    // }
  }

  handleSearchSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {this.state.images && <ImageGallery images={this.state.images} />}
        {this.state.loading && <Loader />}
        <ToastContainer autoClose={1000} />
      </>
    );
  }
}
export default App;
