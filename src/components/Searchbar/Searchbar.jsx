import React, { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import css from './Searchbar.module.scss';

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleSearchQueryChange = e => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      return toast.error('Fill in the search field');
    }

    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button className={css.SearchFormButton} type="submit">
            <ImSearch className={css.SearchFormButtonIcon} />
          </button>

          <input
            className={css.SearchFormIinput}
            type="text"
            name="searchQuery"
            value={this.state.searchQuery}
            onChange={this.handleSearchQueryChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
