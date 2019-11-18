import React, {Component} from 'react'
import ActualMap from './actualMap'
// import './myMap.css'

/**
 * COMPONENT
 */

class MyMap extends Component {
  constructor(props) {
    super(props)
    console.log('myMap')
  }

  render() {
    return (
      <div id="bigDiv">
        <ActualMap google={this.props.google} />
      </div>
    )
  }
}
export default MyMap
