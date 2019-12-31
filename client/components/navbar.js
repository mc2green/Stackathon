import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'
import {Navbar, Nav, Container} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMapMarkedAlt} from '@fortawesome/free-solid-svg-icons'

// import '../css/navbar.css'

const NavbarComponent = ({handleClick, isLoggedIn}) => (
  <div id="navbar">
    {console.log('ISLOGGEDIN', isLoggedIn)}
    {isLoggedIn ? (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <FontAwesomeIcon icon={faMapMarkedAlt} /> BeenThere!
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">About</Nav.Link>
            <Nav.Link href="/map">My Map</Nav.Link>
            <Nav.Link href="/travel">Travel</Nav.Link>
            <Nav.Link href="/" onClick={handleClick}>
              Logout
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    ) : (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <FontAwesomeIcon icon={faMapMarkedAlt} /> BeenThere!
          </Navbar.Brand>
        </Container>
      </Navbar>
    )}
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(NavbarComponent)

/**
 * PROP TYPES
 */
NavbarComponent.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
