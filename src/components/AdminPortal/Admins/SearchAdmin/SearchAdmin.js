import React, { useEffect, useState } from 'react';
import AdminService from '../../../../services/AdminService';

// import './styles.css';

const SearchAdmin = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await AdminService.searchAdmin({keyword: searchQuery});
      console.log(response)
      setSearchResults(response);
      setError('');
    } catch (error) {
      console.error('Error searching admins:', error);
      setError('Error searching admins. Please try again.');
    }
  };

  return (
    <div className="search-admin">
      <h2>Search Admins</h2>
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <label>Search Query:</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {searchResults.length > 0 ? (
        <div className="search-results">
          <h3>Search Results:</h3>
          <ul>
            {searchResults.map((admin) => (
              <li key={admin.adminId}>
                <strong>Username:</strong> {admin.adminUsername} |{' '}
                <strong>Full Name:</strong> {admin.adminFullName} |{' '}
                <strong>Email:</strong> {admin.adminEmail}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default SearchAdmin;