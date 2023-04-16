import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
const axios = require('axios').default;
// import ImagesApiService from '../services/images-api';
class App extends Component {
  state = { searchQuery: '' };

  async componentDidMount() {
    const url = `https://pixabay.com/api/?q=cat&page=1&key=34213016-753010ce7a0400954b4163a43&image_type=photo&orientation=horizontal&per_page=12`;

    const data = await axios.get(url);
    console.log(data);
  }

  handleSearchQuery = searchQuery => {
    this.setState({ searchQuery: searchQuery });
  };

  render() {
    return <Searchbar onSubmit={this.handleSearchQuery} />;
  }
}
export default App;
