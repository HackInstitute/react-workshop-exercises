import {createStore} from 'redux'

let uid = 1

// Actions
const Type = {
  ADD: 'ADD',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
}

// Action creators
export const ticketActionCreators = {
  addTicket: title => ({type: Type.ADD, payload: {title}}),
  deleteTicket: id => ({type: Type.DELETE, payload: {id}})
}

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD:
      var {title} = action.payload
      var tickets = {...state.tickets, [uid++]: {title}}
      return {...state, tickets}
    case Type.DELETE:
      var {id} = action.payload
      var tickets = {...state.tickets}
      delete tickets[id]
      return {...state, tickets}
    default:
      return state
  }
}

// Initial state
const initialState = {tickets: {[uid++]: {title: 'fix the internet'}}}

// Create & export the store
export default createStore(
  reducer,
  initialState, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
