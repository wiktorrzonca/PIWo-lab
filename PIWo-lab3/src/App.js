import React, { useEffect, useState } from 'react';
import './App.css';
import PropertyList from './components/PropertyList/PropertyList';
import { ThemeContext } from './components/PropertyList/ThemeContext';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const currentHour = new Date().getHours();
    setIsDarkMode(currentHour < 7 || currentHour > 18); // Ustaw tryb ciemny, jeśli jest poza zakresem od 7:00 do 18:00
  }, []);

  return (
    <ThemeContext.Provider value={isDarkMode}>
      <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
        <PropertyList />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
