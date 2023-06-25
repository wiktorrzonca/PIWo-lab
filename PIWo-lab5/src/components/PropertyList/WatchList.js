function Watchlist({ watchlist, removeFromWatchlist }) {
    return (
      <div>
        <div className="button-container">
          <button className="cancel-button">
            <Link to="/">Anuluj</Link>
          </button>
        </div>
        <h2>Obserwowane ogłoszenia</h2>
        {watchlist.map((property) => (
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
        ))}
      </div>
    );
  }