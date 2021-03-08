import React from 'react';

import './SearchBar.css';

class SearchBar extends React.Component {
  render() {
    return (
      <div className='search-container'>
        <svg className="search-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="6.5" cy="6.5" r="5.5" stroke="#9AA0A6" stroke-width="2" />
          <rect x="9.74316" y="11.1411" width="2" height="8.75923" rx="1" transform="rotate(-44.5128 9.74316 11.1411)" fill="#9AA0A6" />
        </svg>
        <input className="search-input"></input>
      </div>
    );
  };
}

export default SearchBar;