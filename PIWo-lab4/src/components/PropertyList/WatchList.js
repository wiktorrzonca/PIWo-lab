import React from 'react';
import { Link } from 'react-router-dom';
import Property from './Property';
import flatImage from './flat.jpg';


function WatchList({ watchlist, removeFromWatchlist }) {
  return (
    <div className="watchlist-container">
      <div className="button-container">
        <button className="back-button">
          <Link to="/">Powrót</Link>
        </button>
      </div>
      <h2>Obserwowane ogłoszenia</h2>
      {watchlist.length > 0 ? (
        watchlist.map((property) => (
          <Property
            key={property.id}
            city={property.city}
            address={property.address}
            bedrooms={property.bedrooms}
            price={property.price}
            description={property.description}
            imageSource={flatImage}
            isWatched={true}
            toggleWatchlist={() => removeFromWatchlist(property.id)}
          />
        ))
      ) : (
        <p>Nie masz żadnych obserwowanych ogłoszeń.</p>
      )}
    </div>
  );
}

export default WatchList;
