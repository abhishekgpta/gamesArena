import React from "react";

function GamesSearch({ query, handleChange }) {
  return (
    <div className="games__search">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search by Title, Platform and Genere.."
      />
    </div>
  );
}

export default GamesSearch;
