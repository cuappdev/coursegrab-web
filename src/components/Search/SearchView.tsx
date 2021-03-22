import React from 'react'

import './SearchView.css'

class SearchView extends React.Component {
  state = {
    searchText: '',
    courses: [
      'INFO 1300 : Introduction to Web Design',
      'INFO 4250 : Surveillance and Privacy',
      'INFO 3450 : Human-Computer Interaction',
      'INFO 3450 : Human-Computer Interaction',
      'INFO 3450 : Human-Computer Interaction'
    ]
  }

  searchIcon = (width: number, height: number) => {
    return (
      <svg className="search-icon" width={width} height={height} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="6.5" cy="6.5" r="5.5" stroke="#9AA0A6" stroke-width="2" />
        <rect x="9.74316" y="11.1411" width="2" height="8.75923" rx="1" transform="rotate(-44.5128 9.74316 11.1411)" fill="#9AA0A6" />
      </svg>
    )
  }

  render() {
    const courses = this.state.courses.map(course => {
      return (
        <div className="search-result">
          {this.searchIcon(16, 16)}
          <p className="result-text">{course}</p>
        </div>
      )
    })
    return (
      <div className="search-container">
        <div className="search-bar" style={{ borderRadius: this.state.searchText === '' ? '15px' : '15px 15px 0px 0px' }}>
          {this.searchIcon(18, 18)}
          <input className="search-input"
            value={this.state.searchText}
            onChange={(event) => this.setState({ searchText: event.target.value })} />
        </div>
        {
          this.state.searchText === ''
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
