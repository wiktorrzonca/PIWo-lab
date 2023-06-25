import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PropertyForm.css';

function PropertyForm({ onSubmit }) {
  const navigate = useNavigate();
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [bedrooms, setBedrooms] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProperty = {
      id: Date.now(),
      city,
      address,
      bedrooms,
      price,
      description,
      email,
    };
    onSubmit(newProperty);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="property-form-container">
      <h1>Dodaj nową nieruchomość!</h1>

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

        <label>
          Adres e-mail:
          <input type="email" value={email} onChange={handleEmailChange} required />
        </label>

        <div>
          <button type="submit">Dodaj</button>
          <button type="button" onClick={handleCancel}>Anuluj</button>
        </div>
      </form>
    </div>
  );
}

export default PropertyForm;
