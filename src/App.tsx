import React from 'react'
import './App.css'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Navigator from './components/Navigator/Navigator'
import SearchView from './components/Search/SearchView'
import TrackedCoursesView from './components/TrackedCourses/TrackedCoursesView'
import DetailCourseView from './components/DetailCourse/DetailCourseView'
import { Course, Status } from './types'

const course: Course = {
  subjectCode: "MUSIC",
  courseNum: 3431,
  title: "PMA 3680: Sound Design",
  sections: [
    {
      catalogNum: 6090,
      courseNum: 3431,
      instructors: ["Warren Cross"],
      isTracking: true,
      mode: "Online",
      numTracking: 2,
      section: "STU 501 / MW 9:05AM EST",
      status: Status.OPEN,
      subjectCode: "MUSIC",
      title: "Sound Design"
    },
    {
      catalogNum: 6090,
      courseNum: 3431,
      instructors: ["Warren Cross"],
      isTracking: false,
      mode: "Online",
      numTracking: 2,
      section: "STU 501 / TR 11:20AM EST",
      status: Status.OPEN,
      subjectCode: "MUSIC",
      title: "Sound Design"
    }
  ]
}

function App() {
  return (
    <Router>
        <div>
          <Navigator />
          <SearchView />
          <Switch>
            <Route exact path="/">
              <TrackedCoursesView />
            </Route>
            <Route path="/course">
              <DetailCourseView course={course} />
            </Route>
          </Switch>
          <Footer />
        </div >
    </Router>
  )
}

export default App
