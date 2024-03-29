import React from 'react'
import { Link } from 'react-router-dom';

import './SearchView.css'

import { Course } from '../../types';
import { searchCourses } from '../../utils/requests';

type SearchViewState = {
  searchText: string
  courses: Course[]
  isResultsListCollapsed: boolean
}

class SearchView extends React.Component {
  state: SearchViewState = {
    searchText: '',
    courses: [],
    isResultsListCollapsed: false
  }

  searchIcon = (width: number, height: number) => {
    return (
      <svg className="search-icon" width={width} height={height} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="6.5" cy="6.5" r="5.5" stroke="#9AA0A6" strokeWidth="2" />
        <rect x="9.74316" y="11.1411" width="2" height="8.75923" rx="1" transform="rotate(-44.5128 9.74316 11.1411)" fill="#9AA0A6" />
      </svg>
    )
  }

  getCourses = async (query: string) => {
    if (this.state.searchText.length > 2) {
      try {
        const searchResult = await searchCourses(query)
        if (this.state.searchText === searchResult.query) {
          this.setState({ courses: searchResult.courses.slice(0, 10) })
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  render() {
    const courses = this.state.courses.map(course => {
      return (
        <div className="search-result">
          {this.searchIcon(16, 16)}
          <Link
            to={{ pathname: `/courses/${course.id}`, state: course }}
            onClick={() => this.setState({ isResultsListCollapsed: true })}
          >
            <p className="result-text">{`${course.subjectCode} ${course.courseNum}: ${course.title}`}</p>
          </Link>
        </div>
      )
    })
    return (
      <div className="search-container">
        <div
          className="search-bar"
          style={{
            borderRadius: (this.state.searchText === '' || this.state.isResultsListCollapsed)
              ? '20px'
              : '15px 15px 0px 0px'
          }}
        >
          {this.searchIcon(18, 18)}
          <input
            className="search-input"
            value={this.state.searchText}
            onChange={(event) => {
              this.setState({ searchText: event.target.value, isResultsListCollapsed: false })
              this.getCourses(event.target.value)
            }}
            onClick={() => {
              if (courses.length > 0) {
                this.setState({ isResultsListCollapsed: false })
              }
            }}
          />
        </div>
        {
          (this.state.searchText === '' || this.state.isResultsListCollapsed)
            ? null
            : (
              <div className="search-results-dropdown">
                {courses}
              </div>
            )
        }
      </div>
    )
  }
}

export default SearchView
