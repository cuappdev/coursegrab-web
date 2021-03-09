import React from 'react';
import './App.css';

import Footer from './components/Footer/Footer';
import Navigator from './components/Navigator/Navigator';
import SearchBar from './components/Search/SearchBar';
import TrackedCoursesView from './components/TrackedCourses/TrackedCoursesView'

function App() {
  return (
    <div>
      <Navigator />
      <SearchBar />
      <TrackedCoursesView />
      <Footer />
    </div >
  );
}

export default App;
