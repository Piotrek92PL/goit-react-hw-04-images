import React, { useState, useCallback } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = '37032446-d46c25bd861c052edab2cc39f';

  const handleFormSubmit = query => {
    setSearchQuery(query);
    setImages([]);
    setCurrentPage(1);
    fetchImages();
  };

  const fetchImages = useCallback(() => {
    if (!searchQuery) return;

    const baseUrl = 'https://pixabay.com/api/';
    const perPage = 12;

    const queryParams = `?key=${apiKey}&q=${searchQuery}&page=${currentPage}&per_page=${perPage}`;

    setIsLoading(true);

    fetch(baseUrl + queryParams)
      .then(response => response.json())
      .then(data => {
        const uniqueImages = data.hits.filter(
          (image, index, self) =>
            index === self.findIndex(img => img.id === image.id)
        );
        setImages(prevImages => [...prevImages, ...uniqueImages]);
        setCurrentPage(prevPage => prevPage + 1);
      })
      .catch(error => console.error('Error fetching data:', error))
      .finally(() => setIsLoading(false));
  }, [searchQuery, currentPage, apiKey]);

  const openModal = url => {
    setShowModal(true);
    setLargeImageURL(url);
  };

  const closeModal = () => {
    setShowModal(false);
    setLargeImageURL('');
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            src={image.webformatURL}
            alt={image.tags}
            largeImageURL={image.largeImageURL}
            onClick={() => openModal(image.largeImageURL)}
          />
        ))}
      </ImageGallery>
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && <Button onClick={fetchImages} />}
      {showModal && <Modal src={largeImageURL} alt="" onClose={closeModal} />}
    </div>
  );
};
