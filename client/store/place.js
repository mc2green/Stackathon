import axios from 'axios'

//ACTION TYPES
export const GET_PLACES = 'GET_PLACES'
export const ADD_PLACE = 'ADD_PLACE'

//ACTION CREATORS
export const getPlaces = places => ({
  type: GET_PLACES,
  places
})
export const addPlace = place => ({
  type: ADD_PLACE,
  place
})
//THUNK CREATOR
export const getPlacesThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/map')
      dispatch(getPlaces(data))
    } catch (error) {
      console.log('THERE IS A PROBLEM WITH GETPLACESTHUNK')
    }
  }
}

export const addPlaceThunk = place => {
  return async dispatch => {
    try {
      console.log('THUNK STUFF', place)
      const {data} = await axios.post('/api/map', place)
      console.log('DATA', data)
      dispatch(addPlace(data))
    } catch (error) {
      console.log('THERE IS A PROBLEM WITH THE ADDPLACESTHUNK', error)
    }
  }
}

export default function placesReducer(places = [], action) {
  switch (action.type) {
    case GET_PLACES:
      return action.places
    case ADD_PLACE:
      return [...places, action.place]
    default:
      return places
  }
}
