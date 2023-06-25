import React from 'react';
import './Property.css';

const Property = ({ city, address, bedrooms, price, description, imageSource, isWatched, toggleWatchlist }) => {
  const handleToggleWatchlist = () => {
    toggleWatchlist();
  };

  return (
    <div className="property-container">
      <div className="image-container">
        <img src={imageSource} alt="Property" className="property-image" />
      </div>
      <div className="property-details">
        <p>Miasto: {city}</p>
        <p>Adres: {address}</p>
        <p>Ilość sypialni: {bedrooms}</p>
        <p>Cena: {price}</p>
        <div className="description-container">
          <div className="description-title">Opis:</div>
          <div className="description-content">{description}</div>
        </div>
        <div className="button-container">
          <button onClick={handleToggleWatchlist} className={`watchlist-button ${isWatched ? 'remove' : 'add'}`}>
            {isWatched ? 'Usuń z obserwowanych' : 'Dodaj do obserwowanych'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Property;
