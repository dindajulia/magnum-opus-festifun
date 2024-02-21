// SearchResults.jsx
import React from 'react';

function SearchResults({ events }) {
  // Fungsi untuk menampilkan pesan jika tidak ada hasil pencarian
  const renderNoResults = () => {
    // return <div>Tidak ada hasil yang ditemukan</div>;
  };

  // Fungsi untuk menampilkan hasil pencarian
  const renderSearchResults = () => {
    return (
      <div>
        {/* Pastikan events tidak undefined atau null sebelum melakukan pemetaan */}
        {events &&
          events.map((event) => (
            <div key={event.eventID}>
              <h3>{event.name}</h3>
              <p>{event.description}</p>
              {/* Tambahkan elemen lain sesuai kebutuhan */}
            </div>
          ))}
      </div>
    );
  };

  // Tampilkan hasil pencarian atau pesan "Tidak ada hasil yang ditemukan"
  return events && (events.length > 0 ? renderSearchResults() : renderNoResults());
}

export default SearchResults;
