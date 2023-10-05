import React, {Component} from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';


class ImageGalleryItem extends Component {
  handleClick = () => {
    this.props.onClick(this.props.largeImageURL);
  };

  render() {
    const { src, alt } = this.props;

    return (
      <li className={css.ImageGalleryItem} onClick={this.handleClick}>
        <img src={src} alt={alt} className={css.ImageGalleryItemImage} />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
