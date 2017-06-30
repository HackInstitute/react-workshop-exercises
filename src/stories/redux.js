import React, {Component} from 'react'
import {createStore, bindActionCreators} from 'redux'
import {connect, Provider} from 'react-redux'

/**
 * Storybook setup
 */
import {storiesOf} from '@storybook/react'
const stories = storiesOf('Redux', module)

/**
 * Solo redux - only use plain JS/DOM & redux to update a counter
 */
stories.addWithJSX('Solo redux', _ => {
  const {getState, dispatch, subscribe} = createStore(
    (state, action) => state + 1, // Reducer
    0,
    window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  const render = _ => {
    document.querySelector('#counter').innerText = getState()
  }

  subscribe(render)

  return <div>
    <button id='btn' onClick={_ => dispatch({type: 'ANY_TYPE_REALLY'})}>+</button>
    <div id='counter' />
  </div>
})

/**
 * React-redux
 */
import store, {actionCreators} from '../store/staticTicketStore'
// stories.addDecorator(storyFn => <Provider store={store}>{storyFn()}</Provider>)

stories.addWithJSX('React redux - Ticket list', _ => {
  // App
  let App = ({addTicket, deleteTicket, tickets}) => {
    return <div>
      <TicketEntry onAddTicket={addTicket} />
      <hr />
      <TicketList tickets={tickets} onDeleteTicket={deleteTicket} />
    </div>
  }
  App = connect(
    state => ({tickets: state.tickets}),
    dispatch => bindActionCreators(actionCreators, dispatch)
  )(App)

  // Components
  let TicketList = ({tickets, onDeleteTicket}) => <table>
    <tbody>
      {Object.keys(tickets).map(id => (
        <tr key={id}>
          <td>#{id}</td>
          <td>{tickets[id].title}</td>
          <td><button onClick={_ => onDeleteTicket(id)}>Delete</button></td>
        </tr>
      ))}
    </tbody>
  </table>

  class TicketEntry extends Component {
    constructor (props) {
      super(props)
      this.state = {title: ''}
      this.handleChange = this.handleChange.bind(this)
      this.handleKeyPress = this.handleKeyPress.bind(this)
    }

    handleChange (e) {
      this.setState({ title: e.target.value })
    }

    handleKeyPress (e) {
      if (e.key !== 'Enter') return
      const {onAddTicket} = this.props
      const {title} = this.state
      onAddTicket(title)
      this.setState({ title: '' })
    }

    render () {
      const {title} = this.state
      return <p>
        <label>New ticket: </label>
        <input type='text'
          value={title}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress} />
      </p>
    }
  }

  return <Provider store={store}><App /></Provider>
}, {skip: 1})

/**
 * React-redux - async & remote
 */
import {TicketEntry, TicketList} from '../components'
import remoteStore, {actionCreators as remoteActionCreators} from '../store/remoteTicketStore'

stories.addWithJSX('React redux - Async/Remote Ticket list', _ => {
  let App = ({addTicket, deleteTicket, fetchTickets, tickets}) => {
    return <div>
      <TicketEntry onAddTicket={addTicket} />
      <p>
        <button onClick={fetchTickets}>Reload tickets</button>
      </p>
      <hr />
      <TicketList tickets={tickets} onDeleteTicket={deleteTicket} />
    </div>
  }
  App = connect(
    state => ({tickets: state.tickets}),
    dispatch => bindActionCreators(remoteActionCreators, dispatch)
  )(App)

  // Kick off
  remoteStore.dispatch(remoteActionCreators.fetchTickets())
  
  return <Provider store={remoteStore}><App /></Provider>
}, {skip: 1})
