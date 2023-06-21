import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './PropertyList.css';
import PropertyForm from './PropertyForm';
import Property from './Property';
import { ThemeContext } from './ThemeContext';

function PropertyList() {
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

  const loadProperties = () => {
    const exampleProperties = [
      {
        id: 1,
        city: 'Białystok',
        address: 'Wiejska 68',
        bedrooms: 5,
        price: 1200,
        description: 'Pokoje do wynajecia blisko Politechniki Białostockiej',
      },
      {
        id: 2,
        city: 'Wroclaw',
        address: 'Curie-Sklodowskiej 47',
        bedrooms: 3,
        price: 20000,
        description: 'Przestronne mieszkanie w kamienicy',
      },
      {
        id: 3,
        city: 'Warszawa',
        address: 'Łucka 21',
        bedrooms: 3,
        price: 1337,
        description: 'Mieszkanie na 10 piętrze na osiedlu Wola',
      },
    ];

    setProperties(exampleProperties);
  };

  const addProperty = (newProperty) => {
    setProperties([...properties, newProperty]);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode, updateDarkMode }}>
      <div className={`property-list-container ${isDarkMode ? 'dark-mode' : ''}`}>
        <div className="toggle-button-container">
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="toggle-button">
            {isDarkMode ? 'Tryb jasny' : 'Tryb ciemny'}
          </button>
        </div>

        <Routes>
          <Route
            path="/add-property"
            element={<PropertyForm onSubmit={addProperty} isDarkMode={isDarkMode} />}
          />
          <Route
            path="/"
            element={
              <>
                <button className="add-property-button">
                  <Link to="/add-property">Dodaj nową nieruchomość</Link>
                </button>

                {properties.map((property) => (
                  <Property
                    key={property.id}
                    city={property.city}
                    address={property.address}
                    bedrooms={property.bedrooms}
                    price={property.price}
                    description={property.description}
                  />
                ))}
              </>
            }
          />
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
}

export default PropertyList;
