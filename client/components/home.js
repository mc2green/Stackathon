import React from 'react'
import {connect} from 'react-redux'
import {Button} from 'react-bootstrap'

// import '../css/home.css'

const Home = ({isLoggedIn, firstName, history}) => {
  return (
    <div id="home">
      {/* {isLoggedIn ? <div>Let's set Sail {firstName}</div> : null} */}
      <Button variant="outline-info" onClick={() => history.push('/login')}>
        Login
      </Button>
      <Button variant="outline-info" onClick={() => history.push('/signup')}>
        Sign Up
      </Button>
    </div>
  )
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    firstName: state.user.firstName
  }
}

export default connect(mapState)(Home)
