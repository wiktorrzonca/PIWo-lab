import React, { useEffect, useState, useReducer } from 'react';
import './App.css';
import PropertyList from './components/PropertyList/PropertyList';
import { ThemeContext } from './components/PropertyList/ThemeContext';

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_WATCHLIST':
      return { ...state, watchlist: [...state.watchlist, action.property] };
    case 'REMOVE_FROM_WATCHLIST':
      return {
        ...state,
        watchlist: state.watchlist.filter((property) => property.id !== action.propertyId),
      };
    default:
      return state;
  }
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [properties, setProperties] = useState([]);
  const [state, dispatch] = useReducer(reducer, { watchlist: [] });

  useEffect(() => {
    const currentHour = new Date().getHours();
    setIsDarkMode(currentHour < 7 || currentHour > 18);
    loadProperties();
  }, []);

  const loadProperties = () => {
    const storedProperties = JSON.parse(localStorage.getItem('properties')) || [];
    setProperties(storedProperties);
  };

  const saveProperties = (updatedProperties) => {
    setProperties(updatedProperties);
    localStorage.setItem('properties', JSON.stringify(updatedProperties));
  };

  const addProperty = (newProperty) => {
    const updatedProperties = [...properties, newProperty];
    saveProperties(updatedProperties);
  };

  const addToWatchlist = (property) => {
    dispatch({ type: 'ADD_TO_WATCHLIST', property });
  };

  const removeFromWatchlist = (propertyId) => {
    dispatch({ type: 'REMOVE_FROM_WATCHLIST', propertyId });
  };

  return (
    <ThemeContext.Provider value={isDarkMode}>
      <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
        <PropertyList
          addProperty={addProperty}
          watchlist={state.watchlist}
          addToWatchlist={addToWatchlist}
          removeFromWatchlist={removeFromWatchlist}
        />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
