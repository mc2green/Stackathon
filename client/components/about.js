import React, {Component} from 'react'
import {Container} from 'react-bootstrap'
import '../css/about.css'

export default class About extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="background">
        <Container id="container">
          <h1 id="firstHeading" className="display-3 text-warning">
            This page is currently under construction
          </h1>
          <h1 className="display-5 text-info">But it will include:</h1>
          <ul>
            <li>A description of the app.</li>
            <li>A step by step slideshow on how to use the app.</li>
          </ul>
        </Container>
      </div>
    )
  }
}
