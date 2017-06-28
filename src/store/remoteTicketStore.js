import {createStore} from 'redux'

// Actions
const Type = {
  ADD: 'ADD',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
}

// Action creators
export const ticketActionCreators = {
  addTicket: title => ({type: Type.ADD, payload: title}),
  deleteTicket: id => ({type: Type.DELETE, payload: id})
}

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD:
      return {tickets: [...state.tickets, {id: uid++, title: action.payload}]}
    case Type.DELETE:
      return {tickets: state.tickets.filter(ticket => ticket.id !== action.payload)}
    default:
      return state
  }
}

// Initial state
const initialState = {tickets: [{id: uid++, title: 'fix the internet'}]}

// Create & export the store
export default createStore(
  reducer,
  initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
