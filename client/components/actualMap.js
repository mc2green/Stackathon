import React, {Component} from 'react'
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react'
import {getPlacesThunk, addPlaceThunk} from '../store/place'
import {connect} from 'react-redux'
import LocationSearchInput from './locationSearchInput'
import GOOGLE_API_KEY from '../../secrets'
import '../css/actualMap.css'

class ActualMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      latitude: 500,
      longitude: 500,
      currentLat: 500,
      currentLng: 500,
      handlerEnabled: false
    }
    this.displayMarkers = this.displayMarkers.bind(this)
    this.handler = this.handler.bind(this)
  }

  componentDidMount() {
    this.props.getPlaces()
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        currentLat: position.coords.latitude,
        currentLng: position.coords.longitude,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
    })
  }
  handler(name, lat, lng) {
    this.setState({
      name: name,
      latitude: lat,
      longitude: lng,
      handlerEnabled: true
    })
  }
  displayMarkers = () => {
    if (this.props.places) {
      const {places} = this.props
      return places.map(place => {
        return (
          <Marker
            key={place.id}
            position={{
              lat: place.latitude,
              lng: place.longitude
            }}
            icon={{
              url: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
            }}
          />
        )
      })
    } else {
      return null
    }
  }

  render() {
    return (
      <div id="map">
        <LocationSearchInput handler={this.handler} />
        <button type="button" onClick={() => this.props.addPlace(this.state)}>
          + Add Place
        </button>
        {this.props.places &&
        this.state.currentLat !== 500 &&
        this.state.longitude !== 500 ? (
          <div id="work">
            <Map
              google={this.props.google}
              showsUserLocation={true}
              initialCenter={{
                lat: this.state.currentLat,
                lng: this.state.currentLng
              }}
              defaultZoom={this.props.zoom}
              centerAroundCurrentLocation={true}
              center={{lat: this.state.latitude, lng: this.state.longitude}}
            >
              <Marker
                position={{lat: this.state.latitude, lng: this.state.longitude}}
                icon={{
                  url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                }}
              />
              {this.displayMarkers()}
            </Map>
          </div>
        ) : (
          <div>
            <h1 className="display-1">Your map is still loading...</h1>
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
  apiKey: process.env.GOOGLE_API_KEY
})(ActualMap)

export default connect(mapStateToProps, mapDispatchToProps)(WrappedContainer)
