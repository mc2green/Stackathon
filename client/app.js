import React from 'react'

import {NavbarComponent} from './components'
import Routes from './routes'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  return (
    <div>
      <NavbarComponent />
      <Routes />
    </div>
  )
}

export default App
