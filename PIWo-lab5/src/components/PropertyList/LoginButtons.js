import React, { useState } from 'react';
import { logInWithGoogle, logInWithFacebook, useAuth, logout } from './UserService';

const LoginButtons = () => {
  const user = useAuth(); // Pobierz informacje o zalogowanym użytkowniku
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      await logInWithGoogle();
      // Logowanie powiodło się
    } catch (error) {
      // Obsługa błędu logowania
      console.error(error);
      alert('Wystąpił błąd podczas logowania przez Google.');
    }
  };

  const handleFacebookLogin = async () => {
    try {
      await logInWithFacebook();
      // Logowanie powiodło się
    } catch (error) {
      // Obsługa błędu logowania
      console.error(error);
      alert('Wystąpił błąd podczas logowania przez Facebook.');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      // Wylogowanie powiodło się
    } catch (error) {
      // Obsługa błędu wylogowania
      console.error(error);
      alert('Wystąpił błąd podczas wylogowywania.');
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevValue) => !prevValue);
  };

  return (
    <div className="login-buttons">
      {user ? (
        <div className="user-info">
          <button className="dropdown-button" onClick={toggleDropdown}>
            Zalogowano jako: {user.displayName}
          </button>
          {isDropdownOpen && (
            <div className="dropdown-content">
              <button onClick={handleLogout}>Wyloguj</button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <button onClick={handleGoogleLogin}>Zaloguj się przez Google</button>
          <button onClick={handleFacebookLogin}>Zaloguj się przez Facebook</button>
        </div>
      )}
    </div>
  );
};

export default LoginButtons;
