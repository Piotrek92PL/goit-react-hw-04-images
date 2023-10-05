import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader'; 
import Modal from './Modal/Modal';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    currentPage: 1,
    showModal: false,
    largeImageURL: '',
    isLoading: false,
  };

  apiKey = '37032446-d46c25bd861c052edab2cc39f';

  handleFormSubmit = query => {
    this.setState(
      { searchQuery: query, images: [], currentPage: 1 },
      this.fetchImages
    );
  };

  
  fetchImages = () => {
    const { searchQuery, currentPage } = this.state;
    const baseUrl = 'https://pixabay.com/api/';
    const perPage = 12;

    const queryParams = `?key=${this.apiKey}&q=${searchQuery}&page=${currentPage}&per_page=${perPage}`;

    this.setState({ isLoading: true });

    fetch(baseUrl + queryParams)
      .then(response => response.json())
      .then(data => {
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(error => console.error('Error fetching data:', error))
      .finally(() => this.setState({ isLoading: false }));
  };


  openModal = largeImageURL => {
    this.setState({ showModal: true, largeImageURL });
  };
  
  
  closeModal = () => {
    this.setState({ showModal: false, largeImageURL: '' });
  };

  // Obsługa przewijania strony - płynne ładowanie kolejnych obrazów
  /*handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      this.fetchImages();
    }
  }; */

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    const { images, isLoading, showModal, largeImageURL } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              src={image.webformatURL}
              alt={image.tags}
              largeImageURL={image.largeImageURL}
              onClick={this.openModal}
            />
          ))}
        </ImageGallery>
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && (
          <Button onClick={this.fetchImages} />
        )}
        {showModal && (
          <Modal src={largeImageURL} alt="" onClose={this.closeModal} />
        )}
      </div>
    );
  }
}
