import React, { Component } from 'react';
import Modal from '../Modal/Modal';
import css from './ImageGalleryItem.module.scss';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  render() {
    const { showModal } = this.state;
    const { id, webFormatUrl, largeImageUrl, tags } = this.props;
    return (
      <li className={css.ImageGalleryItem} key={id}>
        <img
          onClick={this.toggleModal}
          className={css.ImageGalleryPicture}
          src={webFormatUrl}
          alt={tags}
        />

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img
              className={css.ImageGalleryBigPicture}
              src={largeImageUrl}
              alt={tags}
            />
          </Modal>
        )}
      </li>
    );
  }
}

export default ImageGalleryItem;
