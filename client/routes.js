import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import {ActualMap, Login, Signup, Home} from './components'

/**
 * COMPONENT
 */
class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ActualMap} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/home" component={Home} />
      </Switch>
    )
  }
}

export default Routes
