import React from 'react'
import './App.css'

import Footer from './components/Footer/Footer'
import Navigator from './components/Navigator/Navigator'
import SearchView from './components/Search/SearchView'
import TrackedCoursesView from './components/TrackedCourses/TrackedCoursesView'

function App() {
  return (
    <div>
      <Navigator />
      <SearchView />
      <TrackedCoursesView />
      <Footer />
    </div >
  )
}

export default App
