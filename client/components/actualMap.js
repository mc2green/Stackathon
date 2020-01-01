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
      handlerEnabled: false,
      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: false
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
  onMarkerClick = (props, marker) => {
    console.log('FIRE!')
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true
    })
  }
  onInfoWindowClose = () => {
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    })
  }
  displayMarkers = () => {
    if (this.props.places) {
      const {places} = this.props
      console.log(places)
      return places.map(place => {
        return (
          <Marker
            key={place.id}
            name={place.name}
            position={{
              lat: place.latitude,
              lng: place.longitude
            }}
            icon={{
              url: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
            }}
            onClick={this.onMarkerClick}
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
        <button
          type="button"
          onClick={() =>
            this.props.addPlace({
              name: this.state.name,
              latitude: this.state.latitude,
              longitude: this.state.longitude
            })
          }
        >
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
              <InfoWindow
                marker={this.state.activeMarker}
                onClose={this.onInfoWindowClose}
                visible={this.state.showingInfoWindow}
              >
                <div>
                  <h4>{this.state.selectedPlace.name}</h4>
                </div>
              </InfoWindow>
            </Map>
          </div>
        ) : (
          <div>
            <h1 className="display-1 text-info">
              Your map is still loading...
            </h1>
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
