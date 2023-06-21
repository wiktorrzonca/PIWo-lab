import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './PropertyList.css';
import PropertyForm from './PropertyForm';
import Property from './Property';
import { ThemeContext } from './ThemeContext';
import flatImage from './flat.jpg';
import WatchList from './WatchList';

function PropertyList({ addProperty, watchlist, addToWatchlist, removeFromWatchlist }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    updateDarkMode();
    loadProperties();
  }, []);

  const updateDarkMode = () => {
    const currentHour = new Date().getHours();
    setIsDarkMode(currentHour >= 20 || currentHour < 7);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const loadProperties = () => {
    fetch('/data/properties.json')
      .then((response) => response.json())
      .then((data) => setProperties(data))
      .catch((error) => console.error('Błąd wczytywania danych:', error));
  };

  const saveProperties = (updatedProperties) => {
    setProperties(updatedProperties);
    localStorage.setItem('properties', JSON.stringify(updatedProperties));
  };

  const addPropertyToList = (newProperty) => {
    const updatedProperties = [...properties, newProperty];
    saveProperties(updatedProperties);
  };

  const removePropertyFromList = (propertyId) => {
    const updatedProperties = properties.filter((property) => property.id !== propertyId);
    saveProperties(updatedProperties);
  };

  const toggleWatchlist = (property) => {
    if (watchlist.includes(property)) {
      removeFromWatchlist(property.id);
    } else {
      addToWatchlist(property);
    }
  };

  return (
    <ThemeContext.Provider value={isDarkMode}>
      <div className={`property-list-container ${isDarkMode ? 'dark-mode' : ''}`}>
        <div className="toggle-button-container">
          <button onClick={toggleDarkMode} className="toggle-button">
            {isDarkMode ? 'Tryb jasny' : 'Tryb ciemny'}
          </button>
        </div>

        <Routes>
          <Route path="/add-property" element={<PropertyForm onSubmit={addPropertyToList} />} />
          <Route
            path="/"
            element={
              <>
                <button className="add-property-button">
                  <Link to="/add-property">Dodaj nową nieruchomość</Link>
                </button>
                <button className="watchlist-button">
                  <Link to="/watchlist">Obserwowane ogłoszenia</Link>
                </button>

                {properties.map((property) => (
                  <Property
                    key={property.id}
                    city={property.city}
                    address={property.address}
                    bedrooms={property.bedrooms}
                    price={property.price}
                    description={property.description}
                    imageSource={flatImage}
                    isWatched={watchlist.includes(property)}
                    toggleWatchlist={() => toggleWatchlist(property)}
                  />
                ))}
              </>
            }
          />
          <Route
            path="/watchlist"
            element={<WatchList watchlist={watchlist} removeFromWatchlist={removeFromWatchlist} />}
          />
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
}

export default PropertyList;
