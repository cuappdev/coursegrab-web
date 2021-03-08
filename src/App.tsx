import React from 'react';
import logo from './logo.svg';
import './App.css';

import Footer from './components/Footer/Footer';
import Navigator from './components/Navigator/Navigator';
import SearchBar from './components/Search/SearchBar';

function App() {
  return (
    <div>
      <Navigator />
      <SearchBar />
      <h2>Currently Tracked Courses</h2>
      <hr />
      <p>You’re not tracking any courses! Add courses using the search bar above, and they’ll appear in this table.</p>
      <Footer />
    </div >
  );
}

export default App;
