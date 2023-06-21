import React from 'react';
import './Property.css';
import flatImage from './flat.jpg';

const Property = ({ city, address, bedrooms, price, description }) => {
  return (
    <div className="property-container">
      <div className="image-container">
        {}
        <img src={flatImage} alt="Property" className="property-image" />
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
      </div>
    </div>
  );
};

export default Property;
