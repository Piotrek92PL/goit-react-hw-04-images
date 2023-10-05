import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({ src, alt, onClick }) {
  const handleClick = () => {
    onClick(src);
  };

  return (
    <li className={css.ImageGalleryItem} onClick={handleClick}>
      <img src={src} alt={alt} className={css.ImageGalleryItemImage} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
