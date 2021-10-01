import React from 'react'
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import DetailCourseView from './components/DetailCourse/DetailCourseView'
import Footer from './components/Footer/Footer'
import Navigator from './components/Navigator/Navigator'
import SearchView from './components/Search/SearchView'
import TrackedCoursesView from './components/TrackedCourses/TrackedCoursesView'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navigator />
        <div>
          <SearchView />
        </div>
        <Switch>
          <Route path="/" exact component={TrackedCoursesView} />
          <Route path="/courses/:id" component={DetailCourseView} />
          <Route render={() => <h1>Page Not Found</h1>} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div >
  )
}

export default App
