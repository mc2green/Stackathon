import React, {Component} from 'react'
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react'
import {Button, Container} from 'react-bootstrap'
import {getPlacesThunk, addPlaceThunk, deletePlaceThunk} from '../store/place'
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
      showingInfoWindow: false,
      bounds: {},
      zoom: 9
    }
    this.displayMarkers = this.displayMarkers.bind(this)
    this.handler = this.handler.bind(this)
    this.onInfoWindowClose = this.onInfoWindowClose.bind(this)
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
    // let boundsAutocomplete = new this.props.google.maps.LatLngBounds();
    // boundsAutocomplete.extend({lat: lat, lng: lng})
    this.setState({
      name: name,
      latitude: lat,
      longitude: lng,
      handlerEnabled: true,
      zoom: 10
      // bounds: boundsAutocomplete
    })
  }
  onMarkerClick = (props, marker) => {
    // let boundsAutocomplete2 = new this.props.google.maps.LatLngBounds();
    // boundsAutocomplete2.extend({lat: props.position.lat, lng: props.position.lng})
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true,
      latitude: props.position.lat,
      longitude: props.position.lng,
      // bounds: boundsAutocomplete2,
      zoom: 11
    })
  }
  onInfoWindowClose = () => {
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    })
  }
  onDeleteMarker = placeName => {
    this.props.deletePlace(placeName)
    this.onInfoWindowClose()
  }
  displayMarkers = () => {
    if (this.props.places) {
      const {places} = this.props
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
    console.log(this.state.selectedPlace)
    const style = {
      display: 'flex',
      height: '80%',
      width: '97%',
      justifyContent: 'center',
      textAlign: 'center',
      alignItems: 'center',
      margin: 'auto',
      top: '-7em',
      overflow: 'hidden'
    }
    return (
      <div id="work">
        <Container id="topMenu">
          <LocationSearchInput handler={this.handler} />
          <Button
            className="buttons"
            variant="outline-info"
            size="lg"
            onClick={() =>
              this.props.addPlace({
                name: this.state.name,
                latitude: this.state.latitude,
                longitude: this.state.longitude
              })
            }
          >
            Add Place
          </Button>
          <Button
            className="buttons"
            variant="outline-info"
            size="lg"
            onClick={() =>
              // this.props.deletePlace(this.state.selectedPlace.name)
              this.onDeleteMarker(this.state.selectedPlace.name)
            }
          >
            Remove
          </Button>
        </Container>

        {this.props.places &&
        this.state.currentLat !== 500 &&
        this.state.longitude !== 500 ? (
          <div>
            <Map
              google={this.props.google}
              style={style}
              showsUserLocation={true}
              initialCenter={{
                lat: this.state.currentLat,
                lng: this.state.currentLng
              }}
              defaultZoom={this.state.zoom}
              center={{lat: this.state.latitude, lng: this.state.longitude}}
              bounds={this.state.bounds}
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
          <div id="loadingPage">
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
  addPlace: place => dispatch(addPlaceThunk(place)),
  deletePlace: place => dispatch(deletePlaceThunk(place))
})
const WrappedContainer = GoogleApiWrapper({
  apiKey: process.env.GOOGLE_API_KEY
})(ActualMap)

export default connect(mapStateToProps, mapDispatchToProps)(WrappedContainer)
