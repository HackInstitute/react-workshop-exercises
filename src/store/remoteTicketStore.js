import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const baseUri = 'https://react-workshop-e6209.firebaseio.com'

// Actions
const Type = {
  ADD: 'ADD',
  FETCH: 'FETCH',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
}

// Action creators
export const ticketActionCreators = {
  addTicket: title => dispatch => {
    fetch(`${baseUri}/root/tickets.json`, {method: 'POST', body: JSON.stringify({title})})
      .then(res => res.json())
      .then(({name}) => {
        dispatch({type: Type.ADD, payload: {id: name, title}})
      })
  },
  deleteTicket: id => dispatch => {
    fetch(`${baseUri}/root/tickets/${id}.json`, {method: 'DELETE'})
      .then(_ => {
        dispatch({type: Type.DELETE, payload: {id}})
      })
  },
  fetchTickets: title => dispatch => {
    fetch(`${baseUri}/root/tickets.json`)
      .then(res => res.json())
      .then(tickets => {
        dispatch({type: Type.FETCH, payload: {tickets}})
      })
  }
}

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD:
      var {id, title} = action.payload
      var tickets = {...state.tickets, [id]: {title}}
      return {...state, tickets}
    case Type.DELETE:
      var {id} = action.payload
      var tickets = {...state.tickets}
      delete tickets[id]
      return {...state, tickets}
    case Type.FETCH:
      var {tickets} = action.payload
      return {...state, tickets}
    default:
      return state
  }
}

// Initial state
const initialState = {tickets: {}}

// Create & export the store
export default createStore(
  reducer,
  initialState, 
  applyMiddleware(thunk)
  // applyMiddleware(thunk, window.__REDUX_DEVTOOLS_EXTENSION__())
)
