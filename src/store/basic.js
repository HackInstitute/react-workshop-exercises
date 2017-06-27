import {createStore} from 'redux'

const Type = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
}

const reducer = (state, action) => {
  if (action.type === Type.INCREMENT) {
    return {count: state.count + 1}
  } else if(action.type === Type.DECREMENT) {
    return {count: state.count - 1}
  }
  return state
}

const initialState = {count: 0}

export default createStore(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())