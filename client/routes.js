import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import {ActualMap} from './components'

/**
 * COMPONENT
 */
class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={ActualMap} />
      </Switch>
    )
  }
}

export default Routes
