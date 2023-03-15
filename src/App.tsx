import React from 'react'
import './App.css'
import { BrowserRouter, Route, Switch, RouteComponentProps } from 'react-router-dom'

import Footer from './components/Footer/Footer'
import Navigator from './components/Navigator/Navigator'
import SearchView from './components/Search/SearchView'
import DetailCourseView from './components/DetailCourse/DetailCourseView'
import { DetailCourseViewProps } from './components/DetailCourse/DetailCourseView'
import TrackedCoursesView from './components/TrackedCourses/TrackedCoursesView'

const TrackedCoursesViewWrapper: React.FC<RouteComponentProps> = (props) => {
  return <TrackedCoursesView {...props} />;
};

const DetailCourseViewWrapper: React.FC<DetailCourseViewProps> = (props) => {
  return <DetailCourseView {...props} />;
};

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navigator />
        <div>
          <SearchView />
        </div>
        <Switch>
          <Route path="/" exact component={TrackedCoursesViewWrapper} />
          <Route path="/courses/:id" component={DetailCourseViewWrapper} />
          <Route render={() => <h1>Page Not Found</h1>} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div >
  )
}

export default App
