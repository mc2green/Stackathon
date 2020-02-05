import React, {Component} from 'react'
import {Container} from 'react-bootstrap'

import '../css/travel.css'

export default class Travel extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="travelBackground">
        <Container id="travelContainer">
          <h1 id="firstHeading" className="display-3 text-warning">
            This page is currently under construction
          </h1>
          <h1 className="display-5 text-info">But it will include:</h1>
          <ul>
            <li>
              Bootstrap Cards to input articles from different websites like
              Buzzfeed & NYTimes.
            </li>
          </ul>
        </Container>
      </div>
    )
  }
}
