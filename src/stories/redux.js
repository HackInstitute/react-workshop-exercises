import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {connect, Provider} from 'react-redux'


/**
 * Storybook setup
 */
import {storiesOf} from '@storybook/react'
const stories = storiesOf('Redux - Basics', module)


/**
 * Solo redux - only use plain JS/DOM & redux to update a counter
 */
stories.addWithJSX('Solo redux', _ => {
  const {getState, dispatch, subscribe} = createStore(
    (state, action) => state + 1, // Reducer
    1 // State
  )
  const render = _ => {
    document.querySelector('#counter').innerText = getState()
  }

  subscribe(render)

  return <div>
    <button id="btn" onClick={_ => dispatch({type: 'WHATEVER_TYPE'})}>+</button>
    <div id="counter"></div>
  </div>
})


/**
 * React-redux
 */
import store from '../store/basic'
stories.addDecorator(storyFn => <Provider store={store}>{storyFn()}</Provider>)

// App
class App extends React.Component {
  render() {
    return <div>
      <CounterDisplay />
      <ControlBar />
    </div>
  }
}

// Components
let CounterDisplay = ({count}) => {
  return <div>
    Count: {count}
  </div> 
}
CounterDisplay = connect(state => ({count: state.count}))(CounterDisplay)

let ControlBar = ({dispatch}) => {
  return <div>
    <button onClick={_ => dispatch({type: 'INCREMENT'})}>+</button>
    <button onClick={_ => dispatch({type: 'DECREMENT'})}>-</button>
  </div>
}
ControlBar = connect()(ControlBar)

stories.addWithJSX('React-redux demo', _ => <App />)
