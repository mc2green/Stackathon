import React, {Component} from 'react'
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react'
import {getPlacesThunk, addPlaceThunk} from '../store/place'
import {connect} from 'react-redux'
import LocationSearchInput from './locationSearchInput'
// import './actualMap.css'

class ActualMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      latitude: 41.5868,
      longitude: -93.625
    }
    console.log('CONSTRUCTOR')
    this.displayMarkers = this.displayMarkers.bind(this)
    this.handler = this.handler.bind(this)
  }

  componentDidMount() {
    this.props.getPlaces()
  }
  handler(name, lat, lng) {
    this.setState({name: name, latitude: lat, longitude: lng})
    console.log('MAP STATE', this.state)
  }
  displayMarkers = () => {
    if (this.props.places) {
      console.log('DISPLAYING MARKERS')
      const {places} = this.props
      console.log('PLACES', this.props.places)
      return places.map(place => {
        return (
          <Marker
            key={place.id}
            position={{
              lat: place.latitude,
              lng: place.longitude
            }}
          />
        )
      })
    } else {
      return null
    }
  }

  render() {
    const mapStyle = {
      width: '80%',
      height: '80%',
      margin: 'auto'
    }
    return (
      <div id="map">
        <LocationSearchInput handler={this.handler} />
        <button type="button" onClick={() => this.props.addPlace(this.state)}>
          + Add Place
        </button>

        {this.props.places ? (
          <div id="work">
            <Map
              google={this.props.google}
              style={mapStyle}
              defaultZoom={this.props.zoom}
              center={{lat: this.state.latitude, lng: this.state.longitude}}
            >
              {this.displayMarkers()}
              <Marker
                position={{lat: this.state.latitude, lng: this.state.longitude}}
              />
            </Map>
          </div>
        ) : (
          <div>
            <h1>GOT NOTHING</h1>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  places: state.places
})
const mapDispatchToProps = dispatch => ({
  getPlaces: () => dispatch(getPlacesThunk()),
  addPlace: place => dispatch(addPlaceThunk(place))
})
const WrappedContainer = GoogleApiWrapper({
  apiKey: 'AIzaSyBhWzAETpXr8rtg_wdZIxWo_NoThy7jN9E'
})(ActualMap)

export default connect(mapStateToProps, mapDispatchToProps)(WrappedContainer)
