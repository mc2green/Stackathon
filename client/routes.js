import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import {MyMap} from './components'

/**
 * COMPONENT
 */
class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={MyMap} />
      </Switch>
    )
  }
}

export default Routes
