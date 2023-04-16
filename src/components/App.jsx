import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
// import ImagesApiService from '../services/images-api';
class App extends Component {
  state = { searchQuery: '' };

  componentDidMount() {
    fetch(
      `https://pixabay.com/api/?q=cat&page=1&key=34213016-753010ce7a0400954b4163a43&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => res.json)
      .then(data => console.log(data));
  }

  handleSearchQuery = searchQuery => {
    this.setState({ searchQuery: searchQuery });
  };

  render() {
    return <Searchbar onSubmit={this.handleSearchQuery} />;
  }
}
export default App;
