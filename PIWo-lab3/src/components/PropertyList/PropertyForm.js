import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';
import './PropertyForm.css';

function PropertyForm({ onSubmit }) {
  const navigate = useNavigate();
  const { isDarkMode } = useContext(ThemeContext);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const currentHour = new Date().getHours();
    setIsDarkTheme(currentHour >= 20 || currentHour < 7);
  }, []);

  useEffect(() => {
    const body = document.querySelector('body');
    if (isDarkTheme || isDarkMode) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  }, [isDarkTheme, isDarkMode]);

  const handleSubmit = (newProperty) => {
    onSubmit(newProperty);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className={`property-form-container ${isDarkTheme ? 'dark-mode' : ''}`}>
      <h1>Dodaj nową nieruchomość!</h1>

      <PropertyFormFields onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
}

function PropertyFormFields({ onSubmit, onCancel }) {
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [bedrooms, setBedrooms] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleBedroomsChange = (e) => {
    setBedrooms(parseInt(e.target.value, 10));
  };

  const handlePriceChange = (e) => {
    setPrice(parseInt(e.target.value, 10));
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProperty = {
      city,
      address,
      bedrooms,
      price,
      description,
    };
    onSubmit(newProperty);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Miasto:
        <input type="text" value={city} onChange={handleCityChange} required />
      </label>

      <label>
        Adres:
        <input type="text" value={address} onChange={handleAddressChange} required />
      </label>

      <label>
        Liczba sypialni:
        <input type="number" value={bedrooms} onChange={handleBedroomsChange} required />
      </label>

      <label>
        Cena:
        <input type="number" value={price} onChange={handlePriceChange} required />
      </label>

      <label>
        Opis:
        <textarea value={description} onChange={handleDescriptionChange} required />
      </label>

      <div>
        <button type="submit">Dodaj</button>
        <button type="button" onClick={onCancel}>Anuluj</button>
      </div>
    </form>
  );
}

export default PropertyForm;
